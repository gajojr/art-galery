import Form from './Form.component';
// import { Simulate } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

global.matchMedia = global.matchMedia || function () {
    return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

describe('Text inputs', () => {
    test('It should allow letters to be inputted for first name', () => {
        const input = render(< Form />).getByLabelText('First name');
        expect(input.value).toBe('') // empty before
        fireEvent.change(input, { target: { value: 'Andrija' } })
        expect(input.value).toBe('Andrija') //changed after
    });

    test('It should allow letters to be inputted for last name', () => {
        const input = render(< Form />).getByLabelText('Last name');
        expect(input.value).toBe('') // empty before
        fireEvent.change(input, { target: { value: 'Gajic' } })
        expect(input.value).toBe('Gajic') //changed after
    });

    test('It should allow letters to be inputted for username', () => {
        const input = render(< Form />).getByLabelText('Username');
        expect(input.value).toBe('') // empty before
        fireEvent.change(input, { target: { value: 'ilija123' } })
        expect(input.value).toBe('ilija123') //changed after
    });

    test('It should allow letters to be inputted for password', () => {
        const input = render(< Form />).getByLabelText('Password');
        expect(input.value).toBe('') // empty before
        fireEvent.change(input, { target: { value: 'gajovac12' } })
        expect(input.value).toBe('gajovac12') //changed after
    });

    test('It should allow letters to be inputted for confirm password', () => {
        const input = render(< Form />).getByLabelText('Confirm Password');
        expect(input.value).toBe('') // empty before
        fireEvent.change(input, { target: { value: 'gajovac12' } })
        expect(input.value).toBe('gajovac12') //changed after
    });

    test('It should allow letters to be inputted for email', () => {
        const input = render(< Form />).getByLabelText('Email');
        expect(input.value).toBe('') // empty before
        fireEvent.change(input, { target: { value: 'jovanovan@gmail.com' } })
        expect(input.value).toBe('jovanovan@gmail.com') //changed after
    });
});

describe('File input', () => {
    test('User can upload .jpg or .png file', () => {
        //simulate file upload
        (async () => {
            const file = new File(['(⌐□_□)'], 'testImage.png', { type: 'image/png' });
            const hiddenFileInput = document.querySelector('input[type="file"]');

            await fireEvent.change(hiddenFileInput, { target: { files: [file] } });

            expect(document.getElementById('avatar').files.length).toBe(1);
        })();
    });
});
