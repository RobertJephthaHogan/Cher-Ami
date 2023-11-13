import React, { useState } from 'react'
import './styles.css'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { useSelector } from 'react-redux'
import { Input } from 'antd'


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
            console.log('alteredFields', alteredFields)
            console.log('currentUser', currentUser)

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
        </div>
    )
}