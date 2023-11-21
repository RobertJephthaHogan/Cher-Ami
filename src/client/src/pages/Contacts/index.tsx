import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, Input, Modal, Space, Table, Tag  } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import ContactForm from '../../components/ContactForm'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactActions from '../../redux/actions/contact'
import ContactListUploader from '../../components/ContastListUploader'
import contactListActions from '../../redux/actions/contactList'







interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
  
const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
];
  
const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];




export default function Contacts() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContacts = useSelector((state: any) => state.contacts?.queryResult ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [batchAddModalOpen, setBatchAddModalOpen] = useState<boolean>(false)
    const [singleAddModalOpen, setSingleAddModalOpen] = useState<boolean>(false)

    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactActions.setContacts(currentUser?._id))
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }

    return (
        <div className='contacts-page'>
            <div className='cp-left-panel'>
                <div className='cp-lp-header'>
                    <span className='cp-lp-header-text'>
                        Filters
                    </span>
                </div>
                left
            </div>
            <div className='cp-right-panel'>
                <div className='cp-rp-header'>
                    <div>
                        <span className='cp-rp-header-text'>
                            Contacts
                        </span>
                    </div>
                    <div>
                        <Button 
                            className='upload-button'
                            onClick={() => setBatchAddModalOpen(true)}
                        >
                            <UploadOutlined/>
                        </Button>
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
                    <Table columns={columns} dataSource={data} />
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