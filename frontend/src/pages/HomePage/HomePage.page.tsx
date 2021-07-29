import { useEffect } from 'react';
import axios from 'axios';

import { HomePageContainer } from './HomePage.style';
import Form from '../../components/HomePageComponents/Form/Form.component';

const HomePage = () => {
    useEffect(() => {
        axios.get('/data')
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <HomePageContainer>
            <Form />
        </HomePageContainer>
    )
}

export default HomePage;
