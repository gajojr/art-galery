import { useEffect } from 'react';
import { RegisterPageContainer } from './RegisterPage.style';

import Form from '../../components/RegisterPageCompents/Form/Form.component';

const RegisterPage = () => {
    useEffect(() => {
        if (sessionStorage.getItem('username')) {
            if (sessionStorage.getItem('role') === 'admin') {
                window.location.href = '/admin-page';
            } else if (sessionStorage.getItem('appRole') === 'viewer/critic') {
                window.location.href = '/viewer-profile-page';
            } else if (sessionStorage.getItem('appRole') === 'artist/publisher') {
                window.location.href = '/publisher-profile';
            }
        }
    }, []);

    return (
        <RegisterPageContainer>
            <Form />
        </RegisterPageContainer>
    )
}

export default RegisterPage;
