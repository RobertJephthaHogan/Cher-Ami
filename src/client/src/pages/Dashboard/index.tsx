import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'



export default function Dashboard() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? {})


    return (
        <div>
            <div className='dashboard-top-text-container'>
                <div>
                    <span className='dashboard-title'>
                        Dashboard
                    </span>
                </div>
                <div>
                    <span className='dashboard-greeting'>
                        Welcome Back, {
                            currentUser?.firstName
                            ? currentUser?.firstName
                            : currentUser?.lastOrBusinessName
                        }!
                    </span>
                </div>
            </div>
            <div className='card-row'>
                <div className='dashboard-info-card'>
                    <div className='dic-left'>
                        <div className='dic-circle'>
                            <NotificationOutlined
                                className='dic-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='dic-right'>
                        <div>
                            <div>
                                <span className='dic-title-text'>
                                    Total Campaigns
                                </span>
                            </div>
                            <div>
                                <span className='dic-value-text'>
                                    19
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-info-card'>
                    <div className='dic-left'>
                        <div className='dic-circle'>
                            <UserOutlined
                                className='dic-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='dic-right'>
                        <div>
                            <div>
                                <span className='dic-title-text'>
                                    Total Contacts
                                </span>
                            </div>
                            <div>
                                <span className='dic-value-text'>
                                    18,012
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-info-card'>
                    <div className='dic-left'>
                        <div className='dic-circle'>
                            <SendOutlined
                                className='dic-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='dic-right'>
                        <div>
                            <div>
                                <span className='dic-title-text'>
                                    Total Outreaches
                                </span>
                            </div>
                            <div>
                                <span className='dic-value-text'>
                                    143,143
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-info-card'>
                    <div className='dic-left'>
                        <div className='dic-circle'>
                            <MailOutlined
                                className='dic-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='dic-right'>
                        <div>
                            <div>
                                <span className='dic-title-text'>
                                    New Messages
                                </span>
                            </div>
                            <div>
                                <span className='dic-value-text'>
                                    14
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='actions-title-container'>
                <span className='actions-title'>
                    Actions
                </span>
            </div>
            <div className='action-card-container'>
                <div className='action-card'>
                    card
                </div>
                <div className='action-card'>
                    card
                </div>
                <div className='action-card'>
                    card
                </div>
                <div className='action-card'>
                    card
                </div>
                <div className='action-card'>
                    card
                </div>
                <div className='action-card'>
                    card
                </div>
            </div>

        </div>
    )
}