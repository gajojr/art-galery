import { useEffect } from 'react';

import Form from '../../components/LogInPageComponents/Form/Form.component';

import { LogInPageContainer } from './LogInPage.style';

const LogInPage = () => {
    useEffect(() => {
        if (sessionStorage.getItem('username')) {
            if (sessionStorage.getItem('role') === 'admin') {
                window.location.href = '/admin-page';
            } else if (sessionStorage.getItem('appRole') === 'viewer/critic') {
                window.location.href = '/viewer-profile-page';
            } else if (sessionStorage.getItem('appRole') === 'artist/publisher') {
                window.location.href = '/publisher-profile-page';
            }
        }
    }, []);

    return (
        <LogInPageContainer>
            <Form />
        </LogInPageContainer>
    )
}

export default LogInPage;
