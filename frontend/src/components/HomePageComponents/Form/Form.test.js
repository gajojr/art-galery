import Form from './Form.component';
// we need router to wrap element, otherwise it won't work
import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('header renders with correct text', () => {
    const component = render(<BrowserRouter><Form /></BrowserRouter>);
    const headerEl = component.getByTestId('homepage-header');

    expect(headerEl.textContent).toBe('Art Gallery');
});

test('click on register link takes us to register page', () => {
    const component = render(<BrowserRouter><Form /></BrowserRouter>);
    const registerPageLink = component.getByTestId('link-to-register-page');

    expect(registerPageLink).toHaveAttribute('href', '/register');
});

test('click on login link takes us to login page', () => {
    const component = render(<BrowserRouter><Form /></BrowserRouter>);
    const logInPageLink = component.getByTestId('link-to-login-page');

    expect(logInPageLink).toHaveAttribute('href', '/log-in');
});