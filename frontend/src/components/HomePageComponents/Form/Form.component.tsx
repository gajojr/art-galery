import { Link } from 'react-router-dom';
import { FormElement, StyledButton } from './Form.style';

const Form = () => {
    return (
        <FormElement>
            <h2 data-testid='homepage-header'>Art Gallery</h2>
            <StyledButton data-testid='link-to-register-page'>
                <Link to='/register'>Register</Link>
            </StyledButton>
            <StyledButton data-testid='link-to-login-page'>
                <Link to='/log-in'>Log In</Link>
            </StyledButton>
        </FormElement>
    )
}

export default Form;
