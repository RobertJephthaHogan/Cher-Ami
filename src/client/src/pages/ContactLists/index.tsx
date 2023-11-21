import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { Button, Input, Modal, Popconfirm, Space, Table, Tag  } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactListActions from '../../redux/actions/contactList'
import ContactListForm from '../../components/ContactListForm';
import { contactListService } from '../../services/contactList.service';
import { openNotification } from '../../helpers/notifications';


  
export default function ContactLists() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [newCLModalOpen, setNewCLModalOpen] = useState<boolean>(false)
    const [updateCLModalOpen, setUpdateCLModalOpen] = useState<boolean>(false)
    const [tableData, setTableData] = useState<any>([])


    useEffect(() => {
        setComponentData()
    }, [])

    useMemo(() => {

        const formattedTableData = userContactLists?.map((row: any) => {
            return (
                {
                    name: row?.name,
                    id: row?.id,
                    file: row?.file?.length
                }
            )
        }) || []

        setTableData(formattedTableData)

    }, [userContactLists])

    function setComponentData() {
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }

    function onDelete(record: any) {

        console.log('record', record)
        contactListService.deleteContactList(record?.id)
            .then((resp: any) => {
                console.log('resp', resp)
                openNotification(
                    resp?.data?.response_type,
                    `Contact List ${resp?.data?.data?._id} Deleted Successfully`
                )
                setTimeout(function() {
                    store.dispatch(contactListActions.setContactLists(currentUser?._id))
                }, 500);
            })
            .catch((er: any) => {
                console.log(er)
            })
    }
    
    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Number of Contacts',
            dataIndex: 'file',
            key: 'file',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                <Popconfirm
                    placement="bottom"
                    title={'Are you sure you want to delete this contact list?'}
                    description={'This action is not reversible'}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onDelete(record)}
                    // onCancel={cancel}
                >
                    <a>Delete</a>
                </Popconfirm>
                <a>Add Contacts</a>
                </Space>
            ),
        },
    ];


    return (
        <div className='contact-lists-component'>

            <div className='cl-topbar'>
                <div className='cl-topbar-left'>
                    <span className='cl-title-text'>
                        Contact Lists
                    </span>
                </div>
                <div className='cl-topbar-right'>
                    <Button 
                        className='cncl-btn'
                        onClick={() => setNewCLModalOpen(true)}
                    >
                        Create New Contact List
                    </Button>
                    <Button 
                        type='primary'
                        onClick={() => setUpdateCLModalOpen(true)}
                    >
                        Add Contact To Existing List
                    </Button>
                </div>
            </div>

            <div className='button-bar'>
                <Button>
                    Download to CSV
                </Button>
                <Button>
                    Send Email 
                </Button>
                <Button>
                    Send Text 
                </Button>
                <Button>
                    Send Phone Call 
                </Button>
            </div>

            <div className='search-bar-container'>
                <Input
                    placeholder='Search Contact Lists...'
                />
            </div>

            <div className='table-container'>
                <Table 
                    columns={columns} 
                    dataSource={tableData} 
                />
            </div>
            
            <Modal
                title='Create New Contact List'
                open={newCLModalOpen}
                onCancel={() => setNewCLModalOpen(false)}
                footer={null}
            >
                <ContactListForm
                    closeParent={() => setNewCLModalOpen(false)}
                />
            </Modal>

            <Modal
                title='Update Contact List'
                open={updateCLModalOpen}
                onCancel={() => setUpdateCLModalOpen(false)}
            >
                Update Contact List Modal
            </Modal>
            
        </div>
    )
}