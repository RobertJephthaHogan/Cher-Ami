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
            title: 'My Workouts',
            route: '/my-workouts'
        },
        {
            title: 'My Nutrition',
            route: '/my-nutrition'
        },
        {
            title: 'Workout Plans',
            route: '/workout-plans'
        },
        {
            title: 'Nutrition Plans',
            route: '/nutrition-plans'
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