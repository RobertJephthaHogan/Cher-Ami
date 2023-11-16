import { Button, Empty, Upload, message } from 'antd'
import React, { useState } from 'react'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import type { UploadProps } from 'antd';



export default function ContactListUploader() {

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