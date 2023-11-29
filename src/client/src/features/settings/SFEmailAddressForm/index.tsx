import { Button, Input } from 'antd'
import React, { useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { userService } from '../../../services'
import { store } from '../../../redux/store'
import { openNotification } from '../../../helpers/notifications'
import userActions from '../../../redux/actions/user'


interface SFEmailAddressFormProps {
    closeParent?: any
}

export default function SFEmailAddressForm(props: SFEmailAddressFormProps) {
    
    const currentUser = useSelector((state: any) => state.user?.data ?? {})
    const [formValues, setFormValues] = useState<any>({})

    function onChange(fieldName: string, value: any) {
        const workingObj = {...formValues}
        workingObj[fieldName] = value
        setFormValues(workingObj)
    }

    function onFinish() {

        const workingUser = {...currentUser}
        const updatedSfEmails = [...currentUser?.sendFromEmailAddresses, formValues]
        workingUser['sendFromEmailAddresses'] = updatedSfEmails

        userService
            .updateUser(workingUser?._id, workingUser)
            .then((resp:any) => {
                store.dispatch(userActions.updateUserData(resp?.data?.data))
                openNotification(
                    resp?.data?.response_type,
                    `User Updated Successfully`
                )
                props.closeParent()
                setFormValues({})
            })
            .catch((error: any) => {
                console.error('error', error)
            })


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