import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, Input, Select } from 'antd'
import ContactListMultiselect from '../ContactListMultiselect';
import FrequencySelector from '../FrequencySelector';
import { ObjectID } from 'bson';
import { useSelector } from 'react-redux';
import { openNotification } from '../../helpers/notifications';
import { emailCampaignService } from '../../services/emailCampaign.service';
import dayjs from 'dayjs';
import { store } from '../../redux/store';
import emailCampaignActions from '../../redux/actions/emailCampaign';


const { TextArea } = Input;


interface EmailCampaignBuilderProps {
    closeParent?: any
}

export default function EmailCampaignBuilder(props: EmailCampaignBuilderProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [sendFromEmailOptions, setSendFromEmailOptions] = useState<any>([])
    const [fieldValues, setFieldValues] = useState<any>({
        recipientContactLists: []
    })
    const [submissionAttempted, setSubmissionAttempted] = useState<boolean>(false)
    const [verificationData, setVerificationData] = useState<any>()


    useEffect(() => {

        const sfEmailOptions = currentUser?.sendFromEmailAddresses?.map((op: any) => {
            return (
                {
                    label: op?.emailAddress,
                    value: op?.emailAddress
                }
            )
        }) || []

        setSendFromEmailOptions(sfEmailOptions)

    }, [])

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    
    function onChange(field: string, value: any) {
        const workingObj = {...fieldValues}
        workingObj[field] = value
        setFieldValues(workingObj)
    }

    function fieldChecker(value: any) {

        if (value == undefined || null) {
            return 'error'
        }
        
        return value
    }

    function requiredFieldVerifier(formData: any) {

        const title = fieldChecker(formData?.title)
        const sendFromEmail = fieldChecker(formData?.sendFromEmail)
        const emailBody = fieldChecker(formData?.emailBody)
        const recipientContactLists = fieldChecker(formData?.recipientContactLists)
        const frequency = fieldChecker(formData?.frequency)

        let status = 'success'
        if (
            title === 'error'
            || sendFromEmail === 'error'
            || emailBody === 'error'
            || recipientContactLists === 'error'
            || frequency === 'error'
        ) {
            status = 'error'
        }
        const verificationObject = {
            status,
            data: {
                title,
                sendFromEmail,
                emailBody,
                recipientContactLists,
                frequency
            }
        }
        setVerificationData(verificationObject)
        return verificationObject
    }

    function onFinish() {

        setSubmissionAttempted(true)

        const dto = {
            id: new ObjectID().toString(),
            ...fieldValues,
            status: 'pending',
            creationTime: dayjs().format(),
            createdByUserId: currentUser?._id,
        }

        const verification = requiredFieldVerifier(dto)

        if (verification?.status === 'success') { // If there were no field verification errors
            
            if (fieldValues?.frequency?.frequencyType === 'oneTime') {
                emailCampaignService?.createEmailCampaign(dto)
                    .then((resp: any) => {
                        console.log('resp')
                        openNotification(
                            resp?.data?.response_type,
                            `Email Campaign Created Successfully`
                        )
                        props.closeParent()
                        setTimeout(function() {
                            store.dispatch(emailCampaignActions.setEmailCampaigns(currentUser?._id))
                        }, 500);
                        setFieldValues({
                            recipientContactLists: []
                        })
                    })
                    .catch((er: any) => {
                        console.log('error', er)
                    })

            }
    
            if (fieldValues?.frequency?.frequencyType === 'recurring') {
                //TODO: Recurring Email Campaign onFinish handling
                console.log('recurring')
                console.log('dto', dto)
            }

        }

        if (verification?.status === 'error') {
            console.log('error')
            openNotification(
                'Error',
                `Check all required fields`
            )
        }
        
    }


    return (
        <div className='email-campaign-builder'>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Campaign Title
                    </span>
                    {
                        (submissionAttempted && (verificationData?.data?.title === 'error'))
                        ? (
                            <span className='required-field-error'>
                                * A title is required
                            </span>
                        )
                        : null
                    }
                </div>
                <div>
                    <Input
                        placeholder='Title...'
                        onChange={(e) => onChange('title', e?.target?.value)}
                        value={fieldValues?.title}
                    />
                </div>
            </div>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Send From Email
                    </span>
                    {
                        (submissionAttempted && (verificationData?.data?.sendFromEmail === 'error'))
                        ? (
                            <span className='required-field-error'>
                                * A send-from email is required
                            </span>
                        )
                        : null
                    }
                </div>
                <div>
                    <Select
                        showSearch
                        placeholder="Select a 'send from' email"
                        optionFilterProp="children"
                        onChange={(v) => onChange('sendFromEmail', v)}
                        value={fieldValues?.sendFromEmail}
                        //onSearch={onSearch}
                        filterOption={filterOption}
                        options={sendFromEmailOptions}
                    />
                </div>
            </div>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Email Body
                    </span>
                    {
                        (submissionAttempted && (verificationData?.data?.emailBody === 'error'))
                        ? (
                            <span className='required-field-error'>
                                * An email body is required
                            </span>
                        )
                        : null
                    }
                </div>
                <div>
                    <TextArea 
                        rows={4} 
                        onChange={(e) => onChange('emailBody', e?.target?.value)}
                        value={fieldValues?.emailBody}
                    />

                </div>
            </div>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Select Recipients
                    </span>
                    {
                        (submissionAttempted && (verificationData?.data?.recipientContactLists === 'error'))
                        ? (
                            <span className='required-field-error'>
                                * At least one contact list is required
                            </span>
                        )
                        : null
                    }
                </div>
                <div>
                    <ContactListMultiselect
                        onChange={onChange}
                        selected={fieldValues?.recipientContactLists}
                    />
                </div>
            </div>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Frequency
                    </span>
                </div>
                <div>
                    <FrequencySelector
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className='submission-btn-row'>
                <Button
                    onClick={onFinish}
                >
                    Create Email Campaign
                </Button>
            </div>

        </div>
    )
}