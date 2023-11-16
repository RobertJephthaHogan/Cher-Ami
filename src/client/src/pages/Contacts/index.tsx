import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, Input, Modal } from 'antd'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import ContactForm from '../../components/ContactForm'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import contactActions from '../../redux/actions/contact'


export default function Contacts() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContacts = useSelector((state: any) => state.contacts?.queryResult ?? [])
    const [batchAddModalOpen, setBatchAddModalOpen] = useState<boolean>(false)
    const [singleAddModalOpen, setSingleAddModalOpen] = useState<boolean>(false)

    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactActions.setContacts(currentUser?._id))
    }

    return (
        <div className='contacts-page'>
            <div className='cp-left-panel'>
                <div className='cp-lp-header'>
                    <span className='cp-lp-header-text'>
                        Filters
                    </span>
                </div>
                left
            </div>
            <div className='cp-right-panel'>
                <div className='cp-rp-header'>
                    <div>
                        <span className='cp-rp-header-text'>
                            Contacts
                        </span>
                    </div>
                    <div>
                        <Button 
                            className='upload-button'
                            onClick={() => setBatchAddModalOpen(true)}
                        >
                            <UploadOutlined/>
                        </Button>
                        <Button 
                            type='primary'
                            onClick={() => setSingleAddModalOpen(true)}
                        >
                            Add Contact
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
                        placeholder='Search Contacts...'
                    />
                </div>
                <div className='table-container'>
                    Table Container
                </div>
            </div>
            
            <Modal 
                title="Add Contact" 
                open={singleAddModalOpen} 
                footer={null}
                onOk={() => setSingleAddModalOpen(false)} 
                onCancel={() => setSingleAddModalOpen(false)}
            >
                <ContactForm
                    closeParent={() => setSingleAddModalOpen(false)}
                    onCancel={() => setSingleAddModalOpen(false)}
                />
            </Modal>

            <Modal 
                title="Add Multiple Contacts" 
                open={batchAddModalOpen} 
                onOk={() => setBatchAddModalOpen(false)} 
                onCancel={() => setSingleAddModalOpen(false)}
            >
                Add Multiple Contacts from upload here
            </Modal>

        </div>
    )
}