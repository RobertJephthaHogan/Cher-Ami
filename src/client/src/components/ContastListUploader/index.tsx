import { Button, Empty, Upload, message } from 'antd'
import React, { useState } from 'react'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import type { UploadProps } from 'antd';
import { useSelector } from 'react-redux';
import { ObjectID } from 'bson';
import { contactListService } from '../../services/contactList.service';
import axios from 'axios';
import * as XLSX from "xlsx";



export default function ContactListUploader() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [uploadedFile, setUploadedFile] = useState<any>(null)
    const [parsedFileData, setParsedFileData] = useState<any>()

    
    const setFile = async ({ file, onSuccess, onError }: any) => {
        console.log('file', file)
        console.log('type', file?.type)

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
            console.log('e', e)
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

    function onFinish() {

        const dto = {
            id: new ObjectID().toString(),
            name: 'test',
            file: uploadedFile,
            createdByUserId: currentUser?._id,
        }

        console.log('dto', dto)

        // contactListService.createContactList(dto)
        //     .then((resp:any) => {
        //         console.log('resp', resp)
        //     })
        //     .catch((er: any) => {
        //         console.log('er', er)
        //     })
    }


    return (
        <div>
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
        </div>
    )
}