import React, { useEffect, useState } from 'react'
import './styles.css'
import { HistoryOutlined, SnippetsOutlined } from '@ant-design/icons'
import { store } from '../../redux/store'
import contactListActions from '../../redux/actions/contactList'
import { useSelector } from 'react-redux'
import { capitalizeFirstLetter } from '../../helpers'
import { emailCampaignService } from '../../services/emailCampaign.service'



interface EmailDetailProps {
    emailData?: any
}

export default function EmailDetails(props: EmailDetailProps) {

    const [selectedView, setSelectedView] = useState<string>("general-info")
    const [numTotalRecipients, setNumTotalRecipients] = useState<null | number>(null)
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [campaignHistory, setCampaignHistory] = useState<any>([])



    useEffect(() =>{
        calculateTotalRecipients()
        setComponentData()
        fetchCampaignHistory(props.emailData?.id)
    }, [props.emailData])

    function setComponentData() {
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }

    function fetchCampaignHistory(campaignID: string) {
        emailCampaignService.getEmailCampaignHistory(campaignID)
            .then((resp: any) => {
                console.log('resp', resp)
                //setCampaignHistory(resp?.data)
            })
            .catch((error: any) => {
                console.log('error', error)
            })
    }

    function calculateTotalRecipients() {
        let numTotal = 0
        const recipientContactLists = props.emailData?.recipientContactLists
        let rclData : any[] = []
        recipientContactLists.forEach((list: any) => {
            const targetLists = userContactLists.filter((cl: any) => cl.id === list)
            rclData = targetLists
        })

        rclData.forEach((list: any) => {
            numTotal = numTotal + list?.file?.length
        })
        setNumTotalRecipients(numTotal)
    }


    return (
        <div className='email-details-component'>
            <div className='ed-sidebar'>
                <div className='ed-sidebar-top'>
                    <span className='ed-sb-top-title'>
                        Email Details
                    </span>
                </div>
                <div className='ed-sidebar-menu'>
                    <div 
                        className={`ed-sb-menu-item ${selectedView === 'general-info' ? 'ed-smi': ''}`}
                        onClick={() => setSelectedView("general-info")}
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
                        className={`ed-sb-menu-item ${selectedView === 'history' ? 'ed-smi': ''}`}
                        onClick={() => setSelectedView("history")}
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
            <div className='ed-body'>
                {
                    selectedView === 'general-info' 
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
                                                {props.emailData?.id}
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
                                                {props.emailData?.title}
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
                                                {props.emailData?.emailSubject}
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
                                                {props.emailData?.sendFromEmail}
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
                                                {new Date(props.emailData?.creationTime)?.toLocaleString()}
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
                                                {numTotalRecipients}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='info-row'>
                                        <div>
                                            <span className='info-row-title'>
                                                Recipient Contact Lists:
                                            </span>
                                        </div>
                                        <div className='ir-rcl-container'>
                                            {
                                                props.emailData.recipientContactLists.map((rcl: any) => {
                                                    return (
                                                        <span
                                                            className='info-row-data'
                                                            key={`ir-${rcl}`}
                                                        >
                                                            {(userContactLists.find((cl: any) => cl.id === rcl))?.name}
                                                        </span>
                                                    )
                                                }) || []
                                            }
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
                                                {capitalizeFirstLetter(props.emailData?.frequency?.recurrence?.frequencyInterval)}
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
                                                <div className='isd-chip-container'>
                                                    {props.emailData?.frequency?.recurrence?.intervalSendDays?.map((day: any) => {
                                                        return (
                                                            <div className='isd-chip'>
                                                                <span className='isd-chip-text'>
                                                                    {day}
                                                                </span>
                                                            </div>
                                                        )
                                                    })|| []}
                                                </div>
                                                
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
                                                {new Date(capitalizeFirstLetter(props.emailData?.frequency?.recurrence?.sendTime))?.toLocaleTimeString()}
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
                                                {props.emailData?.status?.title}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ): null
                }
                {
                    selectedView === 'history' 
                    ? (
                        <div>
                            History
                        </div>
                    ): null
                }
            </div>
        </div>
    )
}



