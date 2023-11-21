import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, Input, Modal } from 'antd'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactListActions from '../../redux/actions/contactList'


export default function ContactLists() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [newCLModalOpen, setNewCLModalOpen] = useState<boolean>(false)
    const [updateCLModalOpen, setUpdateCLModalOpen] = useState<boolean>(false)


    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }


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
            <div className='search-bar-container'>
                <Input
                    placeholder='Search Contact Lists...'
                />
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