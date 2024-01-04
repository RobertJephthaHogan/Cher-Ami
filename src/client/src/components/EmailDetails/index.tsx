import React, { useState } from 'react'
import './styles.css'
import { HistoryOutlined, SnippetsOutlined } from '@ant-design/icons'



export default function EmailDetails() {

    const [selectedView, setSelectedView] = useState<string>("general-info")

    return (
        <div className='email-details-component'>
            <EmailDetailsSidebar/>
            <div className='ed-body'>
                body
            </div>
        </div>
    )
}




function EmailDetailsSidebar() {

    return (
        <div className='ed-sidebar'>
            <div className='ed-sidebar-top'>
                <span className='ed-sb-top-title'>
                    Email Details
                </span>
            </div>
            <div className='ed-sidebar-menu'>
                <div className='ed-sb-menu-item'>
                    <div>
                        <SnippetsOutlined/>
                    </div>
                    <div className='gi-text-container'>
                        <span className='gi-text'>
                            General Information
                        </span>
                    </div>
                </div>
                <div className='ed-sb-menu-item'>
                    <div>
                        <HistoryOutlined/>
                    </div>
                    <div className='gi-text-container'>
                        <span className='gi-text'>
                            History
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}