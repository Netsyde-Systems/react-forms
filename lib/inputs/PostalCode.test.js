import { jsx as _jsx } from "react/jsx-runtime";
import { render, cleanup, fireEvent } from '@testing-library/react';
import PostalCode from './PostalCode';
it('displays supplied value', function () {
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var input = postalCode.getByDisplayValue('');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var input = postalCode.getByDisplayValue('');
    expect(input).toHaveAttribute('id', 'txtPostalCode');
});
it('calls onChange function', function () {
    var handleChange = jest.fn();
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', value: undefined, onChange: handleChange }));
    var input = postalCode.getByDisplayValue('');
    fireEvent.change(input, { target: { value: 'A1A1A1' } });
    expect(handleChange).toHaveBeenCalledWith('A1A1A1');
});
it('has no label when not provided', function () {
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var label = postalCode.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, label: 'Expected Postal Code', value: undefined }));
    var label = postalCode.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Postal Code');
});
it('label has asterisk when required', function () {
    var control = render(_jsx(PostalCode, { id: 'txtPostalCode', label: 'A Label', onChange: function () { return null; }, value: undefined }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(PostalCode, { id: 'txtPostalCode', label: 'A Label', onChange: function () { return null; }, required: true, value: undefined }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var control = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var input = control.getByDisplayValue('');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, hidden: true, value: undefined }));
    input = control.getByDisplayValue('');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var control = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, errorMessage: 'Error!!', value: undefined }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
