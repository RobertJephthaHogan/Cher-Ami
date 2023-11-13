import React, { useState } from 'react'
import './styles.css'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { useSelector } from 'react-redux'
import { Input } from 'antd'


export default function Settings() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])

    

    function handleFieldChange(value: any) {
        console.log('value', value)
    }

    function handleFieldSave(value: any) {
        console.log('value', value)
    }


    
    interface SettingsFieldProps {
        fieldName?: any
        fieldLabel?: any
        handleFieldChange?: any
        handleFieldSave?: any
    }

    function SettingsField(props: SettingsFieldProps) {

        const [editingMode, setEditingMode] = useState<boolean>(false)

        const shouldFieldBeDisabled = !editingMode

        return (
            <div>
                <div className='settings-field-label-row'>
                    <span>
                        {props.fieldLabel ? props.fieldLabel : ''}
                    </span>
                    <div className='edit-icon-wrapper'>
                        {
                            editingMode ? (
                                <SaveOutlined/>
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
                        disabled={shouldFieldBeDisabled}
                        placeholder={props.fieldLabel}
                        onChange={props.handleFieldChange}
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
                            handleFieldChange={handleFieldChange}
                            handleFieldSave={handleFieldSave}
                        />
                    </div>
                    <div className='gaic-right'>
                        right
                    </div>
                </div>
            </div>
        </div>
    )
}