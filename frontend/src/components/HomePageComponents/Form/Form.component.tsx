import { Link } from 'react-router-dom';
import { FormElement, StyledButton } from './Form.style';

const Form = () => {
    return (
        <FormElement>
            <h2 data-testid='homepage-header'>Art Gallery</h2>
            <StyledButton>
                <Link to='/register' data-testid='link-to-register-page'>Register</Link>
            </StyledButton>
            <StyledButton>
                <Link to='/log-in' data-testid='link-to-login-page'>Log In</Link>
            </StyledButton>
        </FormElement>
    )
}

export default Form;
