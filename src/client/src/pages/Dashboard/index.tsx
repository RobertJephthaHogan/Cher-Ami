import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import PhoneOutlined from '@ant-design/icons/PhoneOutlined'
import TeamOutlined from '@ant-design/icons/TeamOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'

import { useNavigate } from 'react-router-dom'



export default function Dashboard() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? {})
    const navigate = useNavigate()

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
                <div 
                    className='dashboard-info-card dicm'
                    onClick={() => navigate('/inbox')}
                >
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
                            <div className='message-bar'>
                                <span className='dic-value-text'>
                                    14
                                </span>
                                <span className='dic-value-text dvtl'>
                                    See Messages {'>'}
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
                <div 
                    className='action-card'
                    onClick={() => navigate('/email')}
                >
                    <div className='ac-left'>
                        <div className='ac-circle'>
                            <MailOutlined
                                className='ac-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='ac-right'>
                        <div>
                            <div>
                                <span className='ac-title-text'>
                                    Email Campaigns
                                </span>
                            </div>
                            <div>
                                <span className='ac-value-text'>
                                    Go To Email Campaigns {'>'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className='action-card'
                    onClick={() => navigate('/text')}
                >
                    <div className='ac-left'>
                        <div className='ac-circle'>
                            <MessageOutlined
                                className='ac-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='ac-right'>
                        <div>
                            <div>
                                <span className='ac-title-text'>
                                    Text Campaigns
                                </span>
                            </div>
                            <div>
                                <span className='ac-value-text'>
                                    Go To Text Campaigns {'>'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className='action-card'
                    onClick={() => navigate('/call')}
                >
                    <div className='ac-left'>
                        <div className='ac-circle'>
                            <PhoneOutlined
                                className='ac-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='ac-right'>
                        <div>
                            <div>
                                <span className='ac-title-text'>
                                    Voice Campaigns
                                </span>
                            </div>
                            <div>
                                <span className='ac-value-text'>
                                    Go To Voice Campaigns {'>'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className='action-card'
                    onClick={() => navigate('/contact-lists')}
                >
                    <div className='ac-left'>
                        <div className='ac-circle'>
                            <TeamOutlined
                                className='ac-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='ac-right'>
                        <div>
                            <div>
                                <span className='ac-title-text'>
                                    Contact Lists
                                </span>
                            </div>
                            <div>
                                <span className='ac-value-text'>
                                    Go To Contact Lists {'>'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className='action-card'
                    onClick={() => navigate('/contacts')}
                >
                    <div className='ac-left'>
                        <div className='ac-circle'>
                            <UserOutlined
                                className='ac-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='ac-right'>
                        <div>
                            <div>
                                <span className='ac-title-text'>
                                    Contacts
                                </span>
                            </div>
                            <div>
                                <span className='ac-value-text'>
                                    Go To Contacts {'>'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className='action-card'
                    onClick={() => navigate('/settings')}
                >
                    <div className='ac-left'>
                        <div className='ac-circle'>
                            <SettingOutlined
                                className='ac-circle-logo'
                            />
                        </div>
                    </div>
                    <div className='ac-right'>
                        <div>
                            <div>
                                <span className='ac-title-text'>
                                    Settings
                                </span>
                            </div>
                            <div>
                                <span className='ac-value-text'>
                                    Go To User Settings {'>'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}