import React from 'react';
import Form from './Form.component';
// we need router to wrap element, otherwise it won't work
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('header renders with correct text', () => {
    const component = render(<BrowserRouter><Form /></BrowserRouter>);
    const headerEl = component.getByTestId('homepage-header');

    expect(headerEl.textContent).toBe('Art Gallery');
});

test('click on register button takes us to register page', () => {
    const component = render(<BrowserRouter><Form /></BrowserRouter>);
    const registerBtn = component.getByTestId('link-to-register-page');

    fireEvent.click(registerBtn);
    expect(screen.getByText('Register')).toBeInTheDocument();
});

test('click on login button takes us to login page', () => {
    const component = render(<BrowserRouter><Form /></BrowserRouter>);
    const logInBtn = component.getByTestId('link-to-login-page');

    fireEvent.click(logInBtn);
    expect(screen.getByText('Log In')).toBeInTheDocument();
});