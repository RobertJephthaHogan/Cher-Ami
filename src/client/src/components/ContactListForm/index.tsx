import { Button, Empty, Input, Upload, message } from 'antd';
import { ObjectID } from 'bson';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as XLSX from "xlsx";
import { contactListService } from '../../services/contactList.service';
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import './styles.css'


export default function ContactListForm() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [uploadedFile, setUploadedFile] = useState<any>(null)
    const [fileName, setFileName] = useState<any>('')
    const [parsedFileData, setParsedFileData] = useState<any>()


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

    return (
        <div className='contact-list-form'>

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
                    ? null
                    : <Empty
                        description={
                            <span>
                                No File Selected
                            </span>
                        }
                    />
                }
            </div>

            <div className='submission-row'>
                <Button
                    onClick={createNewContactList}
                >
                    Create Contact List
                </Button>
            </div>

        </div>
    )
}