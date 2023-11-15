import React, { useState } from 'react'
import './styles.css'
import { DatePicker, Input } from 'antd'


const { TextArea } = Input;


export default function ContactForm() {

    const [formValues, setFormValues] = useState<any>()


    function handleFieldChange(field: string, value: any) {
        const workingObj = {...formValues}
        workingObj[field] = value
        console.log('workingObj', workingObj)
        setFormValues(workingObj)
    }


    return (
        <div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    First Name
                </span>
                <div className='field-label-input'>
                    <Input
                        placeholder='First Name'
                        onChange={(e) => handleFieldChange('firstName', e?.target?.value)}
                    />
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Last or Business Name
                </span>
                <div className='field-label-input'>
                    <Input
                        placeholder='Last or Business Name'
                        onChange={(e) => handleFieldChange('lastOrBusinessName', e?.target?.value)}
                    />
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Email Address
                </span>
                <div className='field-label-input'>
                    <Input
                        placeholder='Email Address'
                        onChange={(e) => handleFieldChange('email', e?.target?.value)}
                    />
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Phone Number
                </span>
                <div className='field-label-input'>
                    <Input
                        placeholder='Phone Number'
                        onChange={(e) => handleFieldChange('phone', e?.target?.value)}
                    />
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    DOB
                </span>
                <div className='field-label-input'>
                    <DatePicker 
                        className='datepicker-field'
                        onChange={
                            (v) => handleFieldChange(
                                'dob', v?.format('YYYY-MM-DD HH:mm:ss')
                            )
                        } 
                    />
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Notes
                </span>
                <div className='field-label-input'>
                    <TextArea 
                        rows={4}
                        placeholder='Notes'
                        onChange={(e) => handleFieldChange('notes', e?.target?.value)}
                    />
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Tags
                </span>
                <div className='field-label-input'>
                    *Add Tags Input
                </div>
            </div>
        </div>
    )
}