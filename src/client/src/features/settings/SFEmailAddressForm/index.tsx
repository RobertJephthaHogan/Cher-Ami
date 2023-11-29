import { Button, Input } from 'antd'
import React, { useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'


export default function SFEmailAddressForm() {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [formValues, setFormValues] = useState<any>({})

    function onChange(fieldName: string, value: any) {
        const workingObj = {...formValues}
        workingObj[fieldName] = value
        console.log('workingObj', workingObj)
        setFormValues(workingObj)
    }

    function onFinish() {
        
    }

    return (
        <div className='sf-email-address-form'>
            <div>
                <div className='sfeaf-input-label-wrapper'>
                    <span className='sfeaf-input-label'>
                        Email Address
                    </span>
                </div>
                <div>
                    <Input
                        placeholder='Email Address'
                        onChange={(e) => onChange('emailAddress', e?.target?.value)}
                        value={formValues?.emailAddress}
                    />
                </div>
            </div>
            <div>
                <div className='sfeaf-input-label-wrapper'>
                    <span className='sfeaf-input-label'>
                        Email Address Password
                    </span>
                </div>
                <div>
                    <Input
                        placeholder='Email Address Password'
                        onChange={(e) => onChange('emailAddressPassword', e?.target?.value)}
                        value={formValues?.emailAddressPassword}
                    />
                </div>
            </div>
            <div>
                <div className='sfeaf-input-label-wrapper'>
                    <span className='sfeaf-input-label'>
                        Email Address Label
                    </span>
                </div>
                <div>
                    <Input
                        placeholder='Email Address Label'
                        onChange={(e) => onChange('emailAddressLabel', e?.target?.value)}
                        value={formValues?.emailAddressLabel}
                    />
                </div>
            </div>
            <div className='submit-btn-wrapper'>
                <Button
                    onClick={onFinish}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}