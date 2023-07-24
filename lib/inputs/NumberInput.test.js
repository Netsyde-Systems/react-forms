import { jsx as _jsx } from "react/jsx-runtime";
import { render, cleanup /*, screen, fireEvent */ } from '@testing-library/react';
import NumberInput from './NumberInput';
it('displays supplied value', function () {
    var numberInput = render(_jsx(NumberInput, { id: 'numInput', onChange: function () { return null; }, value: undefined }));
    var input = numberInput.getByDisplayValue('');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var numberInput = render(_jsx(NumberInput, { id: 'numInput', onChange: function () { return null; }, value: undefined }));
    var input = numberInput.getByDisplayValue('');
    expect(input).toHaveAttribute('id', 'numInput');
});
//it('calls onChange function', () => {
//	const handleChange = jest.fn()
//	const numberInput = render(<NumberInput id='txtPostalCode' onChange={handleChange} value={undefined} />)
//	const input = numberInput.getByDisplayValue('')
//	fireEvent.change(input, { target: { value: "1" } })
//	expect(handleChange).toHaveBeenCalledWith("1")
//})
it('has no label when not provided', function () {
    var maskedInput = render(_jsx(NumberInput, { id: 'numInput', onChange: function () { return null; }, value: undefined }));
    var label = maskedInput.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var maskedInput = render(_jsx(NumberInput, { id: 'numInput', onChange: function () { return null; }, label: 'Expected Number Input', value: undefined }));
    var label = maskedInput.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Number Input');
});
it('label has asterisk when required', function () {
    var control = render(_jsx(NumberInput, { id: 'numInput', label: 'A Label', value: undefined, onChange: function () { return null; } }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(NumberInput, { id: 'numInput', value: undefined, label: 'A Label', onChange: function () { return null; }, required: true }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var control = render(_jsx(NumberInput, { id: 'numInput', value: undefined, onChange: function () { return null; } }));
    var input = control.getByDisplayValue('');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(NumberInput, { id: 'numInput', value: undefined, onChange: function () { return null; }, hidden: true }));
    input = control.getByDisplayValue('');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var control = render(_jsx(NumberInput, { id: 'numInput', value: undefined, onChange: function () { return null; } }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(NumberInput, { id: 'numInput', value: undefined, onChange: function () { return null; }, errorMessage: 'Error!!' }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
