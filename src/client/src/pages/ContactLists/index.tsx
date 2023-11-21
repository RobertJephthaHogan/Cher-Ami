import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, Input, Modal, Space, Table, Tag  } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
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

export default function ContactLists() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [newCLModalOpen, setNewCLModalOpen] = useState<boolean>(false)
    const [updateCLModalOpen, setUpdateCLModalOpen] = useState<boolean>(false)


    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }


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
                <Table columns={columns} dataSource={data} />
            </div>

            

            Contact Lists Content

            <Modal
                title='Create New Contact List'
                open={newCLModalOpen}
                onCancel={() => setNewCLModalOpen(false)}
            >
                Create New Contact List Modal
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