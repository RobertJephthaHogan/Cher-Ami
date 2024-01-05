import React, { useEffect, useMemo, useState } from 'react'
import './styles.css'
import { Button, Input, Modal, Popconfirm, Space, Table, Tag  } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import ContactForm from '../../components/ContactForm'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactActions from '../../redux/actions/contact'
import ContactListUploader from '../../components/ContastListUploader'
import contactListActions from '../../redux/actions/contactList'
import { contactService } from '../../services/contact.service';
import { openNotification } from '../../helpers/notifications';




export default function Contacts() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContacts = useSelector((state: any) => state.contacts?.queryResult ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [batchAddModalOpen, setBatchAddModalOpen] = useState<boolean>(false)
    const [singleAddModalOpen, setSingleAddModalOpen] = useState<boolean>(false)
    const [tableData, setTableData] = useState<any>([])


    useEffect(() => {
        setComponentData()
    }, [])

    useEffect(() => {

        const formattedTableData = userContacts?.map((contact: any, i: any) => {
            return (
                {
                    key: i,
                    ...contact
                }
            )
        }) || []

        setTableData(formattedTableData)

    }, [userContacts])

    function setComponentData() {
        store.dispatch(contactActions.setContacts(currentUser?._id))
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }

    function onDelete(record: any) {
        contactService.deleteContact(record?.id)
            .then((resp: any) => {
                console.log('resp', resp)
                openNotification(
                    resp?.data?.response_type,
                    `Contact ${resp?.data?.data?._id} Deleted Successfully`
                )
                setTimeout(function() {
                    store.dispatch(contactActions.setContacts(currentUser?._id))
                }, 500);
            })
            .catch((er: any) => {
                console.log(er)
            })
    }

    const columns: any = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last or Business Name',
            dataIndex: 'lastOrBusinessName',
            key: 'lastOrBusinessName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_: any, { tags }: any) => (
                <>
                {tags.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';

                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
                </>
            ),
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Popconfirm
                        placement="bottom"
                        title={'Are you sure you want to delete this contact?'}
                        description={'This action is not reversible'}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDelete(record)}
                        // onCancel={cancel}
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <div className='contacts-page'>
            <div className='cp-left-panel'>
                <div className='cp-lp-header'>
                    <span className='cp-lp-header-text'>
                        Filters
                    </span>
                </div>
                <div className='cp-lp-header'>
                    Coming Soon!
                </div>
            </div>
            <div className='cp-right-panel'>
                <div className='cp-rp-header'>
                    <div>
                        <span className='cp-rp-header-text'>
                            Contacts
                        </span>
                    </div>
                    <div>
                        {/* <Button 
                            className='upload-button'
                            onClick={() => setBatchAddModalOpen(true)}
                        >
                            <UploadOutlined/>
                        </Button> */}
                        <Button 
                            type='primary'
                            onClick={() => setSingleAddModalOpen(true)}
                        >
                            Add Contact
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
                        placeholder='Search Contacts...'
                    />
                </div>
                <div className='table-container'>
                    <Table 
                        columns={columns} 
                        dataSource={tableData} 
                    />
                </div>
            </div>
            
            <Modal 
                title="Add Contact" 
                open={singleAddModalOpen} 
                footer={null}
                onOk={() => setSingleAddModalOpen(false)} 
                onCancel={() => setSingleAddModalOpen(false)}
            >
                <ContactForm
                    closeParent={() => setSingleAddModalOpen(false)}
                    onCancel={() => setSingleAddModalOpen(false)}
                />
            </Modal>

            <Modal 
                title="Upload Contact List" 
                open={batchAddModalOpen} 
                onOk={() => setBatchAddModalOpen(false)} 
                onCancel={() => setBatchAddModalOpen(false)}
                footer={null}
            >
                <ContactListUploader/>
            </Modal>

        </div>
    )
}