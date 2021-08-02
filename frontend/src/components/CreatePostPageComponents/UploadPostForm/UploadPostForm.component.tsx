import { useState } from 'react';
import axios from 'axios';

import { FormElement, FormCaption, StyledButton, UploadButton } from './UploadPostForm.style';
import { Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadPostForm = () => {
    const [files, setFiles] = useState<File[]>([]);

    const props = {
        beforeUpload: (file: File) => {
            setFiles([file]);
        },
        onRemove: (file: any) => {
            setFiles([]);
        },
        onChange: (info: any) => {
            if (info.file.status === 'done') {
                message.success('file uploaded');
            }
        },
        customRequest: (options: any) => {
            setTimeout(() => {
                options.onSuccess('ok');
            }, 0);
        }
    };

    const onFinish = (values: any) => {
        console.log('values', values);

        const formData = new FormData();
        for (const name in values) {
            formData.append(name, values[name]); // there should be values.imageToPost which is a File object
        }

        if (!files.length) {
            message.error('File upload is required!');
            return;
        }

        formData.append('username', sessionStorage.getItem('username') as string);

        axios.post('/create-post', formData, {
            headers: {
                'x-access-token': sessionStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res)

                if (!res.data.message) {
                    message.success('Image posted!');
                    window.location.reload();
                } else {
                    message.error(res.data.message);
                    sessionStorage.clear();
                    window.location.href = '/';
                }
            })
            .catch(err => {
                console.log(err)
                message.error('upload failed');
            });
    }

    return (
        <FormElement onFinish={onFinish}>
            <FormCaption>Upload post</FormCaption>

            <FormElement.Item
                name="imageToPost"
                valuePropName="file"
                getValueFromEvent={(options: any) => {
                    console.log(options.file.originFileObj);
                    return options.file.originFileObj
                }}
            >
                <Upload
                    listType="picture"
                    accept=".jpg, .png"
                    maxCount={1}
                    {...props}
                >
                    Upload .jpg or .png file
                    <UploadButton disabled={files.length ? true : false} icon={<UploadOutlined />}>Click to Upload</UploadButton>
                </Upload>
            </FormElement.Item>

            <FormElement.Item
                label="Description"
                name="description"
                rules={[
                    {
                        max: 300,
                        message: 'Max is 300 characters'
                    }
                ]}
            >
                <Input />
            </FormElement.Item>

            <StyledButton htmlType="submit">Post</StyledButton>
        </FormElement>
    )
}

export default UploadPostForm;
