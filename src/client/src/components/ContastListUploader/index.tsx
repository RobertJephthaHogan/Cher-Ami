import { Button, Empty, Input, Radio, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import type { UploadProps } from 'antd';
import { useSelector } from 'react-redux';
import { ObjectID } from 'bson';
import { contactListService } from '../../services/contactList.service';
import axios from 'axios';
import * as XLSX from "xlsx";
import './styles.css'
import { store } from '../../redux/store';
import contactActions from '../../redux/actions/contact';
import contactListActions from '../../redux/actions/contactList';
import ContactListSelector from '../ContactListSelector';



export default function ContactListUploader() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const userContacts = useSelector((state: any) => state.contacts?.queryResult ?? [])
    const userContactLists = useSelector((state: any) => state.contactLists?.queryResult ?? [])
    const [uploadType, setUploadType] = useState<'create' | 'add'>('create')
    const [uploadedFile, setUploadedFile] = useState<any>(null)
    const [fileName, setFileName] = useState<any>('')
    const [parsedFileData, setParsedFileData] = useState<any>()
    const [selectedContactList, setSelectedContactList] = useState<any>()


    useEffect(() => {
        setComponentData()
    }, [])

    function setComponentData() {
        store.dispatch(contactActions.setContacts(currentUser?._id))
        store.dispatch(contactListActions.setContactLists(currentUser?._id))
    }
    
    const setFile = async ({ file, onSuccess, onError }: any) => {

        setUploadedFile(file);
        onSuccess();

        if (file?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // TODO: HANDLE SUBMISSION FROM EXCEL FILE TYPE
            handleXlsxFileUpload(file)
        }

    };

    const handleXlsxFileUpload = (file: any) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            const data = e?.target?.result;
            const workbook = XLSX.read(data, { type: "binary", cellDates: true  });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            console.log("parsedData", parsedData)
            setParsedFileData(parsedData)
        };
    }

    function handleFileChange(info: any) {

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }

    function createNewContactList() {
        const dto = {
            id: new ObjectID().toString(),
            name: fileName,
            file: parsedFileData,
            createdByUserId: currentUser?._id,
        }

        contactListService.createContactList(dto)
            .then((resp:any) => {
                console.log('resp', resp)
            })
            .catch((er: any) => {
                console.log('er', er)
            })
    }

    function addContactsToExistingList() {
        //TODO: ADD NEW CONTACTS TO EXISTING CONTACT LIST HANDLING
    }


    return (
        <div>
            <div className='upload-type-row'>
                <div>
                    <span className='select-upload-type-text'>
                        Select Upload Type
                    </span>
                </div>
                <div>
                    <Radio.Group 
                        onChange={(e) => setUploadType(e?.target?.value)} 
                        defaultValue={'create'}
                    >
                        <Radio value={'create'}>Create New Contact List</Radio>
                        <Radio value={'add'}>Add To Existing Contact List</Radio>
                    </Radio.Group>
                </div>
            </div>

            {
                uploadType === 'add'
                ? (
                    <div className='contact-list-selector-row'>
                        <span className='select-contact-list-text'>
                            Select a Contact List
                        </span>
                        <div>
                            <ContactListSelector
                                onSelect={setSelectedContactList}
                            />
                        </div>
                    </div>
                )
                : null
            }

            {
                uploadType === 'create'
                ? (
                    <div className='name-input-row'>
                        <div>
                            <span className='contact-list-name-text'>
                                Contact List Name
                            </span>
                        </div>
                        <div>
                            <Input
                                placeholder='Contact List Name'
                                value={fileName}
                                onChange={(e) => setFileName(e?.target?.value)}
                            />
                        </div>
                    </div>
                )
                : null
            }
            
            <div className='uploader-row'>
                <Upload 
                    onChange={handleFileChange}
                    name='file'
                    headers={{authorization: 'authorization-text',}}
                    customRequest={setFile}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div>
            <div className='uploader-workspace'>
                {
                    uploadedFile
                    ? "Display here"
                    : <Empty
                        description={
                            <span>
                                No File Selected
                            </span>
                        }
                    />
                }
            </div>
            {
                uploadType === 'add'
                ? (
                    <div className='submission-row'>
                        <Button
                            onClick={createNewContactList}
                        >
                            Create Contact List
                        </Button>
                    </div>
                )
                : null
            }
            {
                uploadType === 'create'
                ? (
                    <div className='submission-row'>
                        <Button
                            onClick={addContactsToExistingList}
                        >
                            Add New Contacts
                        </Button>
                    </div>
                )
                : null
            }
            
        </div>
    )
}