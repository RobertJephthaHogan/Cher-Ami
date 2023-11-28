import React, { useEffect, useState } from 'react'
import NotificationOutlined from '@ant-design/icons/NotificationOutlined'
import SendOutlined from '@ant-design/icons/SendOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import './styles.css'
import { Button, Modal } from 'antd'
import EmailCampaignBuilder from '../../components/EmailCampaignBuilder'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import emailCampaignActions from '../../redux/actions/emailCampaign'


export default function Email() {
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userEmailCampaigns = useSelector((state: any) => state.emailCampaigns?.queryResult ?? [])
    const [cnecModalOpen, setCnecModalOpen] = useState<any>()

    
    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(emailCampaignActions.setEmailCampaigns(currentUser?._id))
    }

    console.log('userEmailCampaigns', userEmailCampaigns)

    return (
        <div className='email-component'>
            <div className='email-component-title-bar'>
                <span className='email-component-title'>
                    Email Campaigns
                </span>
            </div>
            <div className='email-data-bar'>
                <div className='data-bar-info-container'>
                    <div className='data-bar-info-card'>
                        <div className='dbic-left'>
                            <span>
                                <NotificationOutlined
                                    className='dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='dbic-right'>
                            <div className='dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Total Email Campaigns
                                </span>
                                <span className='dbic-sub-text'>
                                    14
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='data-bar-info-card'>
                        <div className='dbic-left'>
                            <span>
                                <SendOutlined
                                    className='dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='dbic-right'>
                            <div className='dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Emails Sent
                                </span>
                                <span className='dbic-sub-text'>
                                    124,031
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='data-bar-info-card'>
                        <div className='dbic-left'>
                            <span>
                                <MailOutlined
                                    className='dbic-logo'
                                />
                            </span>
                        </div>
                        <div className='dbic-right'>
                            <div className='dbic-right-content'>
                                <span className='dbic-main-text'>
                                    Contacts Accessible Via Email
                                </span>
                                <span className='dbic-sub-text'>
                                    18,213
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='data-bar-actions-container'>
                    <div className='data-bar-actions-card'>
                        <Button 
                            type='primary' 
                            className='cnec-btn'
                            onClick={() => setCnecModalOpen(true)}
                        >
                            Create New Email Campaign
                        </Button>
                    </div>
                </div>
            </div>

            Email

            <Modal 
                title="Email Campaign Builder" 
                open={cnecModalOpen} 
                onOk={() => setCnecModalOpen(false)} 
                onCancel={() => setCnecModalOpen(false)}
                footer={null}
            >
                <EmailCampaignBuilder/>
            </Modal>
        </div>
    )
}