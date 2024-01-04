import React, { useState } from 'react'
import './styles.css'
import { HistoryOutlined, SnippetsOutlined } from '@ant-design/icons'



export default function EmailDetails() {

    const [selectedView, setSelectedView] = useState<string>("general-info")



    return (
        <div className='email-details-component'>
            <EmailDetailsSidebar
                setSelectedView={setSelectedView}
                selectedView={selectedView}
            />
            <EmailDetailPanels
                selectedView={selectedView}
            />
        </div>
    )
}


interface EmailDetailPanelsProps {
    selectedView?: string
}

function EmailDetailPanels(props: EmailDetailPanelsProps) {

    return (
        <div className='ed-body'>
            {
                props.selectedView === 'general-info' 
                ? (
                    <div>
                        General Info
                    </div>
                ): null
            }
            {
                props.selectedView === 'history' 
                ? (
                    <div>
                        History
                    </div>
                ): null
            }
        </div>
    )
}



interface EmailDetailsSidebarProps {
    setSelectedView?: any
    selectedView?: string
}

function EmailDetailsSidebar(props: EmailDetailsSidebarProps) {

    return (
        <div className='ed-sidebar'>
            <div className='ed-sidebar-top'>
                <span className='ed-sb-top-title'>
                    Email Details
                </span>
            </div>
            <div className='ed-sidebar-menu'>
                <div 
                    className={`ed-sb-menu-item ${props.selectedView === 'general-info' ? 'ed-smi': ''}`}
                    onClick={() => props.setSelectedView("general-info")}
                >
                    <div>
                        <SnippetsOutlined/>
                    </div>
                    <div className='gi-text-container'>
                        <span className='gi-text'>
                            General Information
                        </span>
                    </div>
                </div>
                <div 
                    className={`ed-sb-menu-item ${props.selectedView === 'history' ? 'ed-smi': ''}`}
                    onClick={() => props.setSelectedView("history")}
                >
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