import { jsx as _jsx } from "react/jsx-runtime";
import { vi } from 'vitest';
import { render, cleanup /*, screen */, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';
it('displays supplied value', function () {
    var textInput = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; } }));
    var input = textInput.getByDisplayValue('Expected Text');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var textInput = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; } }));
    var input = textInput.getByDisplayValue('Expected Text');
    expect(input).toHaveAttribute('id', 'txtInput');
});
it('calls onChange function', function () {
    var handleChange = vi.fn();
    var textInput = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: handleChange }));
    var input = textInput.getByDisplayValue('Expected Text');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledWith('New Value');
});
it('has no label when not provided', function () {
    var textInput = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; } }));
    var label = textInput.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var textInput = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; }, label: 'Expected Label Value' }));
    var label = textInput.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Label Value');
});
it('label has asterisk when required', function () {
    var control = render(_jsx(TextInput, { id: 'txtInput', label: 'Expected Label Value', value: 'Expected Text', onChange: function () { return null; } }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', label: 'Expected Label Value', onChange: function () { return null; }, required: true }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var control = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; } }));
    var input = control.getByDisplayValue('Expected Text');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; }, hidden: true }));
    input = control.getByDisplayValue('Expected Text');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var control = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; } }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; }, errorMessage: 'Error!!' }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
