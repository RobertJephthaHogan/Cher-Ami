import React, { useState } from 'react'
import './styles.css'
import { Button, DatePicker, Empty, Input } from 'antd'
import PlusOutlined from '@ant-design/icons/PlusOutlined'


const { TextArea } = Input;


export default function ContactForm() {

    const [formValues, setFormValues] = useState<any>({
        tags: []
    })


    function handleFieldChange(field: string, value: any) {
        const workingObj = {...formValues}
        workingObj[field] = value
        console.log('workingObj', workingObj)
        setFormValues(workingObj)
    }

    interface TagInputProps {
        tags?: any
        handleFieldChange?: any
    }

    function TagInput(props: TagInputProps) {

        const [inputMode, setInputMode] = useState<boolean>(false)
        const [activeValue, setActiveValue] = useState<any>('')

        function addTagToFormValues() {
            const existingTags = [...props?.tags]
            const newTags = [...existingTags, activeValue]
            console.log('activeValue', activeValue)
            console.log('newTags', newTags)
            props.handleFieldChange('tags', newTags)
        }

        return (
            <div>
                {
                    inputMode
                    ? null
                    : (
                        <div>
                            {
                                props?.tags?.length
                                ? "has tags"
                                : <Empty/>
                            }
                        </div>
                    )
                }
                
                <div>
                    {
                        inputMode
                        ? (
                            <div>
                                <Input 
                                    placeholder='Add Tag'
                                    onChange={(e) => setActiveValue(e?.target?.value)}
                                />
                                <Button onClick={() => addTagToFormValues()}>
                                    <PlusOutlined/>
                                </Button>
                            </div>
                        )
                        : null
                    }
                </div>
                <Button 
                    className='add-tag-btn'
                    onClick={() => setInputMode(true)}
                >
                    Add Tag <PlusOutlined/>
                </Button>
            </div>
        )
    }

    return (
        <div className='contact-form'>
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
                    <TagInput
                        tags={formValues?.tags}
                        handleFieldChange={handleFieldChange}
                    />
                </div>
            </div>
        </div>
    )
}