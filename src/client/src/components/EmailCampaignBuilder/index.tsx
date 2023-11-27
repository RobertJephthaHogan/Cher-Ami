import React, { useState } from 'react'
import './styles.css'
import { Button, Input, Select } from 'antd'
import ContactListMultiselect from '../ContactListMultiselect';
import FrequencySelector from '../FrequencySelector';
import { ObjectID } from 'bson';
import { useSelector } from 'react-redux';



const { TextArea } = Input;



export default function EmailCampaignBuilder() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [fieldValues, setFieldValues] = useState<any>({})


    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    
    function onChange(field: string, value: any) {
        const workingObj = {...fieldValues}
        workingObj[field] = value
        console.log('workingObj', workingObj)
        setFieldValues(workingObj)
    }

    function onFinish() {
        console.log('onFinish')
        console.log('fieldValues', fieldValues)

        const dto = {
            id: new ObjectID().toString(),
            ...fieldValues,
            createdByUserId: currentUser?._id,
        }

        console.log('dto', dto)

        if (fieldValues?.frequency?.frequencyType === 'oneTime') {
            //TODO: One-time Email Campaign onFinish handling
            console.log('oneTime')
        }

        if (fieldValues?.frequency?.frequencyType === 'recurring') {
            //TODO: Recurring Email Campaign onFinish handling
            console.log('recurring')
        }
    }


    return (
        <div className='email-campaign-builder'>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Campaign Title
                    </span>
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
                        options={[
                        {
                            value: 'jack',
                            label: 'Jack',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                        {
                            value: 'tom',
                            label: 'Tom',
                        },
                        ]}
                    />
                </div>
            </div>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Email Body
                    </span>
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
                </div>
                <div>
                    <ContactListMultiselect
                        onChange={onChange}
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