import { Button, Empty, Upload, message } from 'antd'
import React, { useState } from 'react'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import type { UploadProps } from 'antd';
import { useSelector } from 'react-redux';
import { ObjectID } from 'bson';
import { contactListService } from '../../services/contactList.service';



export default function ContactListUploader() {

    const currentUser = useSelector((state: any) => state.user?.data ?? [])
    const [uploadedFile, setUploadedFile] = useState<any>(null)


    
  const customRequest = ({ file, onSuccess, onError }: any) => {
    console.log('file', file)
    console.log('onSuccess', onSuccess)
    console.log('onError', onError)
    // You can perform additional actions here if needed
    setUploadedFile(file);

    // Call the onSuccess or onError function based on the result
    // For simplicity, we always call onSuccess in this example
    onSuccess();

    const formData = new FormData();
    formData.append('file', file as File);

    console.log('formData', formData)

    if (file instanceof File) {
        formData.append('file', file);
        console.log("yes")
    } else {
        console.log("no")
    }

    const dto = {
        id: new ObjectID().toString(),
        name: 'test',
        file: file,
        createdByUserId: currentUser?._id,
    }

    console.log('dto', dto)

    contactListService.createContactList(dto)
        .then((resp:any) => {
            console.log('resp', resp)
        })
        .catch((er: any) => {
            console.log('er', er)
        })

    console.log('formData', formData)


  };

    const props: UploadProps = {
        name: 'file',
        customRequest,
        //action: undefined,
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };

    return (
        <div>
            <div className='uploader-row'>
                <Upload {...props}>
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