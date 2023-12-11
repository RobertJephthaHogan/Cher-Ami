import React, { useState } from 'react'
import './styles.css'
import { Button, Form, Input } from 'antd'
import { useSelector } from 'react-redux'
import { twilioService } from '../../services/twilio.service'


export default function TwilioLoginForm() {

    const currentUser = useSelector((state: any) => state.user?.data ?? {})
    const [formValues, setFormValues] = useState<any>({})


    function onFieldChange(field: string, value: any) {
        const workingObj = {...formValues}
        workingObj[field] = value
        setFormValues(workingObj)
        console.log(workingObj)
    }

    function onFinish() {

        const workingUser = {...currentUser}

        twilioService.connectTwilioAccount(formValues)
        .then((resp: any) => {
            console.log('resp', resp)
        })
        .catch((error: any) => {
            console.error('error', error)
        })

        console.log('formValues', formValues)
        setFormValues({})

    }

    return (
        <div className='twilio-login-form'>
            <Form 
                className='twilio-form'
                onFinish={onFinish}
            >
                <div className='twilio-logo-wrapper'>
                    <div className='twilio-logo'>
                        
                    </div>
                </div>
                <div className='enter-details-wrapper'>
                    <span className='enter-details-text'>
                        Enter Your Twilio Account Details
                    </span>
                </div>
                <div className='input-row'>
                    <div>
                        <span className='input-label-text'>
                            Account SID
                        </span>
                    </div>
                    <Form.Item
                        name="account_sid"
                        rules={[{ required: true }]}
                        className='twilio-form-item'
                    >
                        <div>
                            <Input
                                name='account_sid'
                                onChange={(e) => onFieldChange('account_sid', e?.target?.value)}
                                value={formValues?.account_sid}
                            />
                        </div>
                    </Form.Item>
                </div>
                <div className='input-row'>
                    <div>
                        <span className='input-label-text'>
                            Account Auth Token
                        </span>
                    </div>
                    <Form.Item
                        name="account_auth_token"
                        rules={[{ required: true }]}
                        className='twilio-form-item'
                    >
                        <div>
                            <Input
                                name='account_auth_token'
                                onChange={(e) => onFieldChange('account_auth_token', e?.target?.value)}
                                value={formValues?.account_auth_token}
                            />
                        </div>
                    </Form.Item>
                </div>
                <div className='connect-btn-row'>
                    <Button 
                        type='primary'
                        htmlType='submit'
                    >
                        Connect
                    </Button>
                </div>
            </Form>
        </div>
    )
}