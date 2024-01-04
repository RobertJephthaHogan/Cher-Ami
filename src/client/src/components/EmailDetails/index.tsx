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
                    <div className='ed-general-info'>
                        <div className='ed-gi-top'>
                            <span className='ed-gi-text'>
                                General Information
                            </span>
                        </div>
                        <div className='ed-gi-body'>
                            <div className='ed-gi-body-left'>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Campaign ID:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            adTut67Dasgq212bmkjha97bs
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Campaign Title:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            Spring Apparel Now In Stock - Broadcast
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Email Subject:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            Limited Edition Spring Apparel Now In Stock!
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Email Sent From:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            cher.ami.sender.1@gmail.com
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Campaign Creation Time:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            *Time Here*
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='ed-gi-body-right'>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Total Recipients:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            10,123
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Recipient Contact Lists:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            Customer List
                                        </span>
                                        <span className='info-row-data'>
                                            Marketing List
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Frequency Interval:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            Weekly
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Interval Send Days:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            * Add interval send days chips *
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Send Time:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            * Add Send Time *
                                        </span>
                                    </div>
                                </div>
                                <div className='info-row'>
                                    <div>
                                        <span className='info-row-title'>
                                            Status:
                                        </span>
                                    </div>
                                    <div>
                                        <span className='info-row-data'>
                                            * Add status chips *
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
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