import React from 'react'
import './styles.css'
import { Button, Input } from 'antd'


export default function TwilioLoginForm() {

    return (
        <div className='twilio-login-form'>
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
                <div>
                    <Input/>
                </div>
            </div>
            <div className='input-row'>
                <div>
                    <span className='input-label-text'>
                        Account Auth Token
                    </span>
                </div>
                <div>
                    <Input/>
                </div>
            </div>
            <div className='connect-btn-row'>
                <Button type='primary'>
                    Connect
                </Button>
            </div>
        </div>
    )
}