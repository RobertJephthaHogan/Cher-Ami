import React, { useState } from 'react'
import './styles.css'
import { Button, DatePicker, Empty, Input } from 'antd'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { ObjectID } from 'bson';
import { useSelector } from 'react-redux';
import { contactService } from '../../services/contact.service';


const { TextArea } = Input;


interface ContactFormProps {
    closeParent?: any
    onCancel?: any
}

export default function ContactForm(props: ContactFormProps) {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [formValues, setFormValues] = useState<any>({
        tags: []
    })


    function handleFieldChange(field: string, value: any) {
        const workingObj = {...formValues}
        workingObj[field] = value
        setFormValues(workingObj)
    }

    function onCancel() {
        setFormValues({tags: []})
        props.onCancel()
    }

    function onFinish() {
        
        const dto = {...formValues}
        dto['id'] = new ObjectID().toString()
        dto['createdByUserId'] = currentUser?._id

        contactService.createContact(dto)
            .then((resp:any) => {
                console.log('resp', resp)
            })
            .catch((e: any) => {
                console.log('error', e)
            })

        //props.onCancel()
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
            props.handleFieldChange('tags', newTags)
        }

        interface TagRendererProps {
            tags?: any
        }

        function TagRenderer(props: TagRendererProps) {

            const tagNodes = props.tags?.map((tag: any) => {
                return (
                    <div 
                        key={`${tag}`}
                        className='contact-tag'
                    >
                        {tag}
                    </div>
                )
            })

            return (
                <div className='tag-node-container'>
                    {tagNodes}
                </div>
            )
        }

        return (
            <div>
                <div>
                    {
                        props?.tags?.length
                        ? <TagRenderer tags={props?.tags}/>
                        : <Empty/>
                    }
                </div>
                
                <div>
                    {
                        inputMode
                        ? (
                            <div className='tag-input-row'>
                                <Input 
                                    placeholder='Add Tag'
                                    onChange={(e) => setActiveValue(e?.target?.value)}
                                    className='tag-input-field'
                                />
                                <Button onClick={() => addTagToFormValues()}>
                                    <PlusOutlined/>
                                </Button>
                            </div>
                        )
                        : null
                    }
                </div>
                
                {
                    inputMode
                    ? null
                    : (
                        <Button 
                            className='add-tag-btn'
                            onClick={() => setInputMode(true)}
                        >
                            Add Tag <PlusOutlined/>
                        </Button>
                    )
                }
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
            <div className='btm-button-row'>
                <Button 
                    className='cancel-btn'
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button 
                    type='primary'
                    onClick={onFinish}
                >
                    OK
                </Button>
            </div>
        </div>
    )
}