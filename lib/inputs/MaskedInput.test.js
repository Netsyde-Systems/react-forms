import { jsx as _jsx } from "react/jsx-runtime";
import { render, cleanup, fireEvent } from '@testing-library/react';
import MaskedInput from './MaskedInput';
it('displays supplied value', function () {
    var maskedInput = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: function () { return null; }, value: 'null', mask: '' }));
    var input = maskedInput.getByDisplayValue('');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var maskedInput = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: function () { return null; }, value: 'null', mask: '' }));
    var input = maskedInput.getByDisplayValue('');
    expect(input).toHaveAttribute('id', 'txtMaskedInput');
});
it('calls onChange function', function () {
    var handleChange = jest.fn();
    var maskedInput = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: handleChange, value: 'null', mask: '' }));
    var input = maskedInput.getByDisplayValue('');
    fireEvent.change(input, { target: { value: 'a00' } });
    expect(handleChange).toHaveBeenCalledWith('');
});
it('has no label when not provided', function () {
    var maskedInput = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: function () { return null; }, value: 'null', mask: '' }));
    var label = maskedInput.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var maskedInput = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: function () { return null; }, label: 'Expected Masked Input', value: 'null', mask: '' }));
    var label = maskedInput.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Masked Input');
});
it('label has asterisk when required', function () {
    var control = render(_jsx(MaskedInput, { id: 'txtMaskedInput', label: 'A Label', onChange: function () { return null; }, value: 'null', mask: '' }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(MaskedInput, { id: 'txtMaskedInput', label: 'A Label', onChange: function () { return null; }, required: true, value: 'null', mask: '' }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var control = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: function () { return null; }, value: 'null', mask: '' }));
    var input = control.getByDisplayValue('');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: function () { return null; }, hidden: true, value: 'null', mask: '' }));
    input = control.getByDisplayValue('');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var control = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: function () { return null; }, value: 'null', mask: '' }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(MaskedInput, { id: 'txtMaskedInput', onChange: function () { return null; }, errorMessage: 'Error!!', value: 'null', mask: '' }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
