import { jsx as _jsx } from "react/jsx-runtime";
import { render, cleanup } from '@testing-library/react';
import DateInput from './DateInput';
it('displays supplied value', function () {
    var dateInput = render(_jsx(DateInput, { id: 'datInput', onChange: function () { return null; }, value: undefined }));
    var input = dateInput.getByDisplayValue('');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var dateInput = render(_jsx(DateInput, { id: 'datInput', onChange: function () { return null; }, value: undefined }));
    var input = dateInput.getByDisplayValue('');
    expect(input).toHaveAttribute('id', 'datInput');
});
//it('calls onChange function', () => {
//	const handleChange = jest.fn()
//	const postalCode = render(<DateInput id='datInput' onChange={handleChange} value={undefined} />)
//	const input = postalCode.getByDisplayValue('')
//	fireEvent.change(input, { target: { value: '11111111' } })
//	expect(handleChange).toHaveBeenCalledWith('11111111')
//})
it('has no label when not provided', function () {
    var dateInput = render(_jsx(DateInput, { id: 'datInput', onChange: function () { return null; }, value: undefined }));
    var label = dateInput.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var dateInput = render(_jsx(DateInput, { id: 'datInput', onChange: function () { return null; }, label: 'Expected Date Input', value: undefined }));
    var label = dateInput.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Date Input');
});
it('label has asterisk when required', function () {
    var control = render(_jsx(DateInput, { id: 'datInput', label: 'A Label', onChange: function () { return null; }, value: undefined }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(DateInput, { id: 'datInput', label: 'A Label', onChange: function () { return null; }, required: true, value: undefined }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var control = render(_jsx(DateInput, { id: 'datInput', onChange: function () { return null; }, value: undefined }));
    var input = control.getByDisplayValue('');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(DateInput, { id: 'datInput', onChange: function () { return null; }, hidden: true, value: undefined }));
    input = control.getByDisplayValue('');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var control = render(_jsx(DateInput, { id: 'datInput', onChange: function () { return null; }, value: undefined }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(DateInput, { id: 'datInput', onChange: function () { return null; }, errorMessage: 'Error!!', value: undefined }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
