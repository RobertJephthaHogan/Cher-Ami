import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router'


export default function SideBar() {

    const navigate = useNavigate()

    const menuItems = [
        {
            title: 'Dashboard',
            route: '/dashboard'
        },
        {
            title: 'Broadcasts',
            route: '/broadcast'
        },
        {
            title: 'Contacts',
            route: '/contacts'
        },
        {
            title: 'Inbox',
            route: '/inbox'
        },
        {
            title: 'Messages',
            route: '/messages'
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
                            <span className='sidebar-row-title'>{item?.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}