import React, { useMemo, useState } from 'react'
import './styles.css'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { useSelector } from 'react-redux'
import { Button, Input, Modal, Popconfirm, Space, Table } from 'antd'
import { userService } from '../../services'
import userActions from '../../redux/actions/user'
import { store } from '../../redux/store'
import { openNotification } from '../../helpers/notifications'
import SFEmailAddressForm from '../../features/settings/SFEmailAddressForm'
import TwilioLoginForm from '../../components/TwilioLoginForm'


export default function Settings() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [newSendFromEmailModalOpen, setNewSendFromEmailModalOpen] = useState<boolean>(false)
    const [sfEmailAddressTableData, setSfEmailAddressTableData] = useState<any>()
  
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


    useMemo(() => {

        const tData = currentUser?.sendFromEmailAddresses?.map((adr: any, i: any) => {
            return (
                {
                    key: i,
                    ...adr
                }
            )
        })

        setSfEmailAddressTableData(tData)

    }, [currentUser?.sendFromEmailAddresses])


    function onDeleteSFEmailAddress(data: any, i: any) {

        const workingUser = {...currentUser}
        const workingSfEmailADdresses = [...currentUser?.sendFromEmailAddresses]
        workingSfEmailADdresses.splice(i, 1) // removes object at index i
        
        workingUser['sendFromEmailAddresses'] = workingSfEmailADdresses

        userService
        .updateUser(workingUser?._id, workingUser)
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
    }

    const emailAddressesDataSource = [
        {
          key: '1',
          emailAddress: 'sendingEmailOne@gmail.com',
          emailAddressPassword: 'superSecretEncryptedPassword',
          emailAddressLabel: 'Primary Email Address',
        },
    ];
      
    const emailAddressesColumns = [
        {
          title: 'Email Address',
          dataIndex: 'emailAddress',
          key: 'emailAddress',
        },
        {
          title: 'Email Address Password',
          dataIndex: 'emailAddressPassword',
          key: 'emailAddressPassword',
        },
        {
          title: 'Email Address Label',
          dataIndex: 'emailAddressLabel',
          key: 'emailAddressLabel',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any, i: any) => (
                <Space size="middle">
                    <Popconfirm
                        placement="bottom"
                        title={'Are you sure you want to delete this contact?'}
                        description={'This action is not reversible'}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDeleteSFEmailAddress(record, i)}
                        // onCancel={cancel}
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
    ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
    ];



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
                <div className='twilio-connect-wrapper'>
                    <TwilioLoginForm/>
                </div>
                <div 
                    className='ci-sf-section-subtitle-container'
                    id='sf-emails-section'
                >
                    <span className='sf-email-address-section-title'>
                        Email Addresses
                    </span>
                </div>
                <div className='ci-sf-info-container'>
                    <span className='ci-sf-info-text'>
                    The email address information you add to this section will be used to send your emails. The sending email  <br/>
                    address, and its corresponding password are required.
                    </span>
                </div>
                <div className='ci-sf-btn-container'>
                    <Button
                        onClick={() => setNewSendFromEmailModalOpen(true)}
                    >
                        Add Send-from Email Address
                    </Button>
                </div>
                <div className='acct-info-content'>
                    <Table 
                        dataSource={sfEmailAddressTableData} 
                        columns={emailAddressesColumns} 
                    />
                </div>
                {/* <div className='ci-sf-section-subtitle-container'>
                    <span>
                        Phone Numbers
                    </span>
                </div>
                <div className='ci-sf-info-container'>
                    <span className='ci-sf-info-text'>
                    The phone number information you add to this section will be used to send your texts and phone calls. The sending phone   <br/>
                    number, and its corresponding password are required.
                    </span>
                </div>
                <div className='acct-info-content'>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                    />
                </div> */}
            </div>


            <Modal 
                title="Add New Send-from Email Address" 
                open={newSendFromEmailModalOpen} 
                footer={null}
                onOk={() => setNewSendFromEmailModalOpen(false)} 
                onCancel={() => setNewSendFromEmailModalOpen(false)}
            >
                <SFEmailAddressForm
                    closeParent={() => setNewSendFromEmailModalOpen(false)}
                />
            </Modal>


        </div>
    )
}