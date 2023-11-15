import React from 'react'
import './styles.css'
import { DatePicker, Input } from 'antd'


export default function ContactForm() {

    return (
        <div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    First Name
                </span>
                <div className='field-label-input'>
                    <Input/>
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Last or Business Name
                </span>
                <div className='field-label-input'>
                    <Input/>
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Email Address
                </span>
                <div className='field-label-input'>
                    <Input/>
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Phone Number
                </span>
                <div className='field-label-input'>
                    <Input/>
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    DOB
                </span>
                <div className='field-label-input'>
                    <DatePicker className='datepicker-field'/>
                </div>
            </div>
            <div className='contact-form-row'>
                <span className='field-label-text'>
                    Notes
                </span>
                <div className='field-label-input'>
                    <Input/>
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