import React from 'react'
import './styles.css'
import { Button, Input, Select } from 'antd'
import ContactListSelector from '../ContactListSelector';



const { TextArea } = Input;



export default function EmailCampaignBuilder() {


    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


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
                        //onChange={onChange}
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
                    <TextArea rows={4} />

                </div>
            </div>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Select Recipients
                    </span>
                </div>
                <div>
                    <ContactListSelector/>
                </div>
                TODO: Create Contact List Multiselect
            </div>

            <div className='campaign-input-row'>
                <div>
                    <span className='input-label'>
                        Frequency
                    </span>
                </div>
                <div>
                    TODO: Frequency Selector Here
                </div>
            </div>

            <div className='submission-btn-row'>
                <Button>
                    Create Email Campaign
                </Button>
            </div>

        </div>
    )
}