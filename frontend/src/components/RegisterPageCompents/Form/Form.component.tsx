import { useState } from 'react';

import axios from 'axios';

import { FormElement, FormCaption, StyledButton, UploadButton } from './Form.style';
import { Input, Upload, message, Radio, RadioChangeEvent } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';

import { UserSchemaWithAvatar } from './UserSchema';

const Form = () => {
  const [appRole, setAppRole] = useState('viewer/critic');
  const [files, setFiles] = useState<File[]>([]);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setAppRole(e.target.value);
  };

  const props = {
    beforeUpload: (file: File) => {
      setFiles([file]);
    },
    onRemove: (file: UploadFile) => {
      setFiles([]);
    },
    onChange: (info: UploadChangeParam<UploadFile<any>>) => {
      if (info.file.status === 'done') {
        message.success('file uploaded');
      }
    },
    customRequest: (options: UploadRequestOption<any>) => {
      setTimeout(() => {
        (options as any).onSuccess('ok', new XMLHttpRequest());
      }, 0);
    }
  };

  const onFinish = (values: UserSchemaWithAvatar) => {
    console.log('values', values);

    const formData = new FormData();
    for (const name in values) {
      if (name !== 'confirmPassword') {
        formData.append(name, values[name]); // there should be values.avatar which is a File object
      }
    }

    if (!files.length) {
      message.error('File upload is required!');
      return;
    }

    if (values.password !== values.confirmPassword) {
      message.error('Passwords don\'t match!');
      return;
    }

    formData.append('appRole', appRole);

    axios.post('/auth/signup', formData)
      .then(res => {
        console.log(res);
        message.success('registered successfully');
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('administrationRole', res.data.administrationRole);
        sessionStorage.setItem('auth', res.data.auth);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('appRole', res.data.appRole);

        if (res.data.appRole === 'viewer/critic') {
          window.location.href = '/viewer-profile-page';
        } else {
          window.location.href = '/publisher-profile-page';
        }
      })
      .catch(err => {
        message.error(`register failed, ${err.response.data.message}`);
      });
  }

  return (
    <FormElement onFinish={onFinish}>
      <FormCaption>Register</FormCaption>

      <FormElement.Item
        label="First name"
        name="firstname"
        rules={[
          {
            required: true,
            message: 'Please enter your first name!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Last name"
        name="lastname"
        rules={[
          {
            required: true,
            message: 'Please enter your last name!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please enter the username!',
          },
          {
            min: 6,
            max: 20,
            message: 'Must be between 6 and 20 characters'
          }
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter the password!',
          },
          {
            min: 6,
            max: 20,
            message: 'Must be between 6 and 20 characters'
          }
        ]}
      >
        <Input.Password />
      </FormElement.Item>

      <FormElement.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            min: 6,
            max: 20,
            message: 'Must be between 6 and 20 characters'
          }
        ]}
      >
        <Input.Password />
      </FormElement.Item>

      <span style={{ marginTop: 5 }}>Select the role you want to have in this app:</span>

      <Radio.Group onChange={onChange} value={appRole} style={{ marginTop: 8, marginBottom: 8 }}>
        <Radio value='artist/publisher'>artist/publisher</Radio>
        <Radio value='viewer/critic'>viewer/critic</Radio>
      </Radio.Group>

      <FormElement.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter your email!',
          },
        ]}
      >
        <Input />
      </FormElement.Item>

      <FormElement.Item
        name="avatar"
        valuePropName="file"
        getValueFromEvent={(options: any) => {
          console.log(options.file.originFileObj);
          return options.file.originFileObj
        }}
      >
        <Upload
          accept=".jpg, .png"
          maxCount={1}
          {...props}
        >
          Upload .jpg or .png file
          <UploadButton data-testid='avatar-upload-button' disabled={files.length ? true : false} icon={<UploadOutlined />}>Click to Upload</UploadButton>
        </Upload>
      </FormElement.Item>

      <StyledButton htmlType="submit">Register</StyledButton>
    </FormElement>
  )
}

export default Form;
