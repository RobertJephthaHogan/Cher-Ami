import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, Form, Input } from 'antd'
import { useSelector } from 'react-redux'
import { twilioService } from '../../services/twilio.service'
import { openNotification } from '../../helpers/notifications'
import { userService } from '../../services'
import { store } from '../../redux/store'
import userActions from '../../redux/actions/user'
const { useForm } = Form;


export default function TwilioLoginForm() {

    const [form] = useForm();
    const currentUser = useSelector((state: any) => state.user?.data ?? {})
    const [formValues, setFormValues] = useState<any>({})
    const [isUserConnected, setIsUserConnected] = useState<boolean>(false)


    useEffect(() => {
        const existingCredentials = currentUser?.twilioCredentials
        const authToken = existingCredentials?.account_auth_token
        const accountSID = existingCredentials?.account_sid

        if (authToken && accountSID) {
            setIsUserConnected(true)
        }
    })

    function onFieldChange(field: string, value: any) {
        const workingObj = {...formValues}
        workingObj[field] = value
        setFormValues(workingObj)
    }

    function onFinish() {

        twilioService.connectTwilioAccount(formValues)
        .then((resp: any) => {

            const statusCode = resp.data.status_code

            if (statusCode === 401) {
                openNotification(
                    'Error',
                    `Invalid Twilio Credentials Provided. 
                    Please enter valid credentials and try again`
                )
            }

            if (statusCode === 500) {
                openNotification(
                    'Error',
                    `Unknown Error while trying to verify your Twilio credentials. 
                    Please enter valid credentials and try again`
                )
            }

            if (statusCode === 200) {

                openNotification(
                    'Success',
                    `Twilio Account Connection Verified. Adding Credentials to account...`
                )
                const workingUser = {...currentUser}
                const workingCredentialData = {...currentUser?.twilioCredentials}
                workingCredentialData['account_sid'] = formValues?.account_sid
                workingCredentialData['account_auth_token'] = formValues?.account_auth_token
                workingUser['twilioCredentials'] = workingCredentialData

                userService
                    .updateUser(workingUser?._id, workingUser)
                    .then((resp:any) => {
                        store.dispatch(userActions.updateUserData(resp?.data?.data))
                        openNotification(
                            resp?.data?.response_type,
                            `Twilio Credentials Saved Successfully`
                        )
                        setFormValues({})
                        form.resetFields();
                        setIsUserConnected(true)
                    })
                    .catch((error: any) => {
                        console.error('error', error)
                    })
            }

        })
        .catch((error: any) => {
            console.error('error', error)
            openNotification(
                'Error',
                `Unknown Error while trying to verify your Twilio credentials. 
                Please enter valid credentials and try again`
            )
        })

    }

    function onDisconnect() {
        const workingUser = {...currentUser}
        workingUser['twilioCredentials'] = {}

        userService
            .updateUser(workingUser?._id, workingUser)
            .then((resp:any) => {
                store.dispatch(userActions.updateUserData(resp?.data?.data))
                openNotification(
                    resp?.data?.response_type,
                    `Disconnected From Twilio Successfully`
                )
                setFormValues({})
                form.resetFields();
                setIsUserConnected(false)
            })
            .catch((error: any) => {
                console.error('error', error)
            })

    }

    return (
        <div className='twilio-login-form'>
            <Form 
                className='twilio-form'
                onFinish={onFinish}
                form={form}
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
                                disabled={isUserConnected}
                                placeholder={isUserConnected ? '****************' : undefined}
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
                                disabled={isUserConnected}
                                placeholder={isUserConnected ? '****************' : undefined}
                            />
                        </div>
                    </Form.Item>
                </div>
                <div className='connect-btn-row'>
                    {
                        isUserConnected
                        ? (
                            <Button 
                                onClick={() => onDisconnect()}
                            >
                                Disconnect
                            </Button>
                        )
                        : (
                            <Button 
                                type='primary'
                                htmlType='submit'
                            >
                                Connect
                            </Button>
                        )
                    }
                    
                </div>
            </Form>
        </div>
    )
}