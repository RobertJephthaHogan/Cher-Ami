import React from 'react'
import ComingSoon from '../../components/ComingSoon'
import './styles.css'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import { Button } from 'antd'


export default function TextMessage() {

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
                                    Emails Sent
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
                                <MailOutlined
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
                    {/* <Table 
                        dataSource={tableData} 
                        columns={columns} 
                    /> */}
                </div>
            </div>
        </div>
    )
}