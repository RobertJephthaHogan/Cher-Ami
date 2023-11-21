import React, { useState } from 'react'
import './styles.css'
import { Button, Modal } from 'antd'


export default function ContactLists() {

    const [newCLModalOpen, setNewCLModalOpen] = useState<boolean>(false)
    const [updateCLModalOpen, setUpdateCLModalOpen] = useState<boolean>(false)

    return (
        <div className='contact-lists-component'>
            <div className='cl-topbar'>
                <div className='cl-topbar-left'>
                    <span className='cl-title-text'>
                        Contact Lists
                    </span>
                </div>
                <div className='cl-topbar-right'>
                    <Button 
                        className='cncl-btn'
                        onClick={() => setNewCLModalOpen(true)}
                    >
                        Create New Contact List
                    </Button>
                    <Button 
                        type='primary'
                        onClick={() => setUpdateCLModalOpen(true)}
                    >
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

            <Modal
                title='Create New Contact List'
                open={newCLModalOpen}
                onCancel={() => setNewCLModalOpen(false)}
            >
                Create New Contact List Modal
            </Modal>

            <Modal
                title='Update Contact List'
                open={updateCLModalOpen}
                onCancel={() => setUpdateCLModalOpen(false)}
            >
                Update Contact List Modal
            </Modal>
            
        </div>
    )
}