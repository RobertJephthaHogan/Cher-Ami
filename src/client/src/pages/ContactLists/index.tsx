import React from 'react'
import './styles.css'
import { Button } from 'antd'


export default function ContactLists() {

    return (
        <div className='contact-lists-component'>
            <div className='cl-topbar'>
                <div className='cl-topbar-left'>
                    <span className='cl-title-text'>
                        Contact Lists
                    </span>
                </div>
                <div className='cl-topbar-right'>
                    <Button className='cncl-btn'>
                        Create New Contact List
                    </Button>
                    <Button type='primary'>
                        Add Contact To Existing List
                    </Button>
                </div>
            </div>
            <div className='button-bar'>
                    <Button>
                        Download to CSV
                    </Button>
                    <Button>
                        Send Email 
                    </Button>
                    <Button>
                        Send Text 
                    </Button>
                    <Button>
                        Send Phone Call 
                    </Button>
                </div>
            Contact Lists Content
        </div>
    )
}