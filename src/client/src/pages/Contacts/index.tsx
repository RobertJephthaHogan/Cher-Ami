import React, { useState } from 'react'
import './styles.css'
import { Button, Modal } from 'antd'
import UploadOutlined from '@ant-design/icons/UploadOutlined'


export default function Contacts() {

    const [singleAddModalOpen, setSingleAddModalOpen] = useState<boolean>(false)

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
                        <Button className='upload-button'>
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
                right
            </div>
            
            <Modal 
                title="Add Contact" 
                open={singleAddModalOpen} 
                onOk={() => setSingleAddModalOpen(false)} 
                onCancel={() => setSingleAddModalOpen(false)}
            >
                Add Contact Here
            </Modal>

        </div>
    )
}