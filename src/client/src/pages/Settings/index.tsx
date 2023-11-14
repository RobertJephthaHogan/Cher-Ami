import React, { useState } from 'react'
import './styles.css'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { useSelector } from 'react-redux'
import { Input } from 'antd'
import { userService } from '../../services'
import userActions from '../../redux/actions/user'
import { store } from '../../redux/store'
import { openNotification } from '../../helpers/notifications'


export default function Settings() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    
  
    interface SettingsFieldProps {
        fieldName?: any
        fieldLabel?: any
        initialFieldValue?: any
    }

    function SettingsField(props: SettingsFieldProps) {

        const currentUser = useSelector((state: any) => state.user?.data ?? [])
        const [editingMode, setEditingMode] = useState<any>(false)
        const [alteredFields, setAlteredFields] = useState<any>('')
        const shouldFieldBeDisabled = !editingMode

        function handleFieldChange(field: any, value: any) {
            let workingObj: any = {}
            workingObj[field] = value
            setAlteredFields(workingObj)
        }

        function onSave() {

            const workingObj = {...currentUser}
            const entries = Object.entries(alteredFields)
            workingObj[entries?.[0]?.[0]] = entries?.[0]?.[1]

            userService
                .updateUser(workingObj?._id, workingObj)
                .then((resp:any) => {
                    store.dispatch(userActions.updateUserData(resp?.data?.data))
                    openNotification(
                        resp?.data?.response_type,
                        `User Updated Successfully`
                    )
                })
                .catch((error: any) => {
                    console.error('error', error)
                })

            setEditingMode(false)
        }

        return (
            <div>
                <div className='settings-field-label-row'>
                    <span>
                        {props.fieldLabel ? props.fieldLabel : ''}
                    </span>
                    <div className='edit-icon-wrapper'>
                        {
                            (editingMode) ? (
                                <SaveOutlined
                                    onClick={onSave}
                                />
                            ) : (
                                <EditOutlined
                                    onClick={() => setEditingMode(true)}
                                />
                            )
                        }
                    </div>
                </div>
                <div className='settings-field-input-row'>
                    <Input
                        defaultValue={props.initialFieldValue}
                        value={alteredFields?.value}
                        disabled={shouldFieldBeDisabled}
                        placeholder={props.fieldLabel}
                        onChange={(e) => handleFieldChange(props.fieldName, e?.target?.value)}
                    />
                </div>
            </div>
        )
    }



    return (
        <div className='settings-page'>
            <div className='settings-topbar'>
                <div className='settings-topbar-content'>
                    <span className='topbar-home-icon-container'>
                        <HomeOutlined/>
                    </span>
                    <span className='topbar-path-container'>
                        {'>'}
                    </span>
                    <span className='topbar-settings-text'>
                        Settings
                    </span>
                </div>
                <div className='topbar-bottom-divider'/>
            </div>
            <div className='general-acct-info-section'>
                <div className='gaic-title-container'>
                    <span className='gaic-title-text'>
                        General Account Information
                    </span>
                </div>
                <div className='general-acct-info-content'>
                    <div className='gaic-left'>
                        <SettingsField
                            fieldName={'firstName'}
                            fieldLabel={'First Name'}
                            initialFieldValue={currentUser?.firstName}
                        />
                    </div>
                    <div className='gaic-right'>
                        <SettingsField
                            fieldName={'lastOrBusinessName'}
                            fieldLabel={'Last Name'}
                            initialFieldValue={currentUser?.lastOrBusinessName}
                        />
                    </div>
                </div>
            </div>
            <div className='ci-rt-section'>
                <div className='ci-rt-title-container'>
                    <span className='ci-rt-title-text'>
                        Contact Information (receive to)
                    </span>
                </div>
                <div className='ci-rt-info-container'>
                    <span className='ci-rt-info-text'>
                        The email and phone number you list in this section are the email and phone number we use to contact you. <br/>
                        The email address you list below is also the email you will use to log in to your account. 
                    </span>
                </div>
                <div className='acct-info-content'>
                    <div className='aic-left'>
                        <SettingsField
                            fieldName={'receiveToEmail'}
                            fieldLabel={'Receive To Email Address'}
                            initialFieldValue={currentUser?.receiveToEmail}
                        />
                    </div>
                    <div className='aic-right'>
                        <SettingsField
                            fieldName={'receiveToPhone'}
                            fieldLabel={'Receive To Phone Number'}
                            initialFieldValue={currentUser?.receiveToPhone}
                        />
                    </div>
                </div>
            </div>
            <div className='ci-sf-section'>
                <div className='ci-sf-title-container'>
                    <span className='ci-sf-title-text'>
                        Contact Information (send from)
                    </span>
                </div>
                <div className='ci-sf-info-container'>
                    <span className='ci-sf-info-text'>
                        The email and phone number you list in this section are the email and phone number your emails, text <br/>
                        messages, and phone calls will be sent from. 
                    </span>
                </div>
                <div className='acct-info-content'>
                    <div className='aic-left'>
                        <SettingsField
                            fieldName={'sendFromEmail'}
                            fieldLabel={'Send From Email Address'}
                            initialFieldValue={currentUser?.sendFromEmail}
                        />
                    </div>
                    <div className='aic-right'>
                        <SettingsField
                            fieldName={'sendFromPhone'}
                            fieldLabel={'Send From Phone Number'}
                            initialFieldValue={currentUser?.sendFromPhone}
                        />
                    </div>
                </div>
                <div className='acct-info-content'>
                    <div className='aic-left'>
                        {/* TODO: Implement Send From Email Address Password */}
                        <SettingsField
                            fieldName={'sendFromEmail'}
                            fieldLabel={'Send From Email Address Password'}
                            initialFieldValue={currentUser?.sendFromEmail}
                        />
                    </div>
                    <div className='aic-right'>
                        {/* Place Holder */}
                    </div>
                </div>
            </div>
        </div>
    )
}