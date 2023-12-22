import React from 'react'
import ComingSoon from '../../components/ComingSoon'
import './styles.css'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import { Button, Table } from 'antd'


export default function TextMessage() {


    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
    ];
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
    ];

    return (
        <div className='text-message-component'>
            <div className='text-message-title-bar'>
                <span className='text-message-title'>
                    Text Message Campaigns
                </span>
            </div>
            <div className='text-data-bar'>
                <div className='text-data-bar-info-container'>
                    <div className='text-data-bar-info-card'>
                        <div className='text-dbic-left'>
                            <span>
                                <NotificationOutlined
                                    className='text-dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='text-dbic-right'>
                            <div className='text-dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Total Text
                                </span>
                                <span className='dbic-sub-text'>
                                    4
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='text-data-bar-info-card'>
                        <div className='text-dbic-left'>
                            <span>
                                <SendOutlined
                                    className='text-dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='text-dbic-right'>
                            <div className='text-dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Texts Sent
                                </span>
                                <span className='dbic-sub-text'>
                                    124,031
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='text-data-bar-info-card'>
                        <div className='text-dbic-left'>
                            <span>
                                <MessageOutlined
                                    className='text-dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='text-dbic-right'>
                            <div className='text-dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Contacts Accessible Via Text
                                </span>
                                <span className='dbic-sub-text'>
                                    18,213
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='data-bar-actions-container'>
                    <div className='data-bar-actions-card'>
                        <Button 
                            type='primary' 
                            className='cnec-btn'
                            //onClick={() => setCnecModalOpen(true)}
                        >
                            Create New Text Campaign
                        </Button>
                    </div>
                </div>
            </div>

            <div className='text-component-body'>
                <div className='text-component-table-container'>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                    />
                </div>
            </div>
        </div>
    )
}