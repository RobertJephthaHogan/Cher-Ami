import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router'
import DashboardOutlined from '@ant-design/icons/DashboardOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import InboxOutlined from '@ant-design/icons/InboxOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import TeamOutlined from '@ant-design/icons/TeamOutlined'


export default function SideBar() {

    const navigate = useNavigate()

    const menuItems = [
        {
            title: 'Dashboard',
            route: '/dashboard',
            icon: <DashboardOutlined />
        },
        {
            title: 'Contacts',
            route: '/contacts',
            icon: <UserOutlined />
        },
        {
            title: 'Contact Lists',
            route: '/contact-lists',
            icon: <TeamOutlined />
        },
        {
            title: 'Inbox',
            route: '/inbox',
            icon: <InboxOutlined />
        },
        {
            title: 'Email',
            route: '/email',
            icon: <MailOutlined />
        },
        {
            title: 'Messages',
            route: '/messages',
            icon: <MessageOutlined />
        },
    ]


    return (
        <div className='sidebar'>
            {
                menuItems?.map((item: any, i: any) => {
                    return (
                        <div 
                            className='sidebar-row'
                            onClick={() => navigate(item?.route)}
                            key={`sidebar-row-${i}`}
                        >
                            <div className='sidebar-row-content'>
                                <div className='sidebar-row-icon-container'>
                                    <span className='sidebar-icon'>
                                        {item?.icon}
                                    </span>
                                </div>
                                <div className='sidebar-row-icon-container'>
                                    <span className='sidebar-row-title'>
                                        {item?.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}