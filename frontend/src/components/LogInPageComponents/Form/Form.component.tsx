import { FormElement, FormCaption, StyledButton } from './Form.style';
import { Input, message } from 'antd';
import axios from 'axios';

const Form = () => {
    const onFinish = async (values: { username: string; password: string; }) => {
        console.log('values', values);

        const res = await axios.post('/log-in', values);
        console.log(res);
        if (!res.data.error) {
            message.success('Logged in successfully');

            sessionStorage.setItem('username', res.data.username);
            sessionStorage.setItem('role', res.data.role);
            sessionStorage.setItem('auth', res.data.auth);
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('appRole', res.data.appRole);

            if (sessionStorage.getItem('role') === 'admin') {
                return window.location.href = '/admin-page';
            }

            if (res.data.appRole === 'viewer/critic') {
                window.location.href = '/viewer-profile-page';
            } else {
                window.location.href = '/publisher-profile-page';
            }
        } else {
            console.log(res.data.error)
            return message.error(res.data.error);
        }
    }

    return (
        <FormElement onFinish={onFinish}>
            <FormCaption>Log In</FormCaption>

            <FormElement.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your username!',
                    },
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
                        message: 'Please enter your password!',
                    },
                ]}
            >
                <Input.Password />
            </FormElement.Item>

            <StyledButton htmlType="submit">Log In</StyledButton>
        </FormElement>
    )
}

export default Form;
