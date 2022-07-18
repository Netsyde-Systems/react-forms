import { jsx as _jsx } from "react/jsx-runtime";
import { render, cleanup, fireEvent } from '@testing-library/react';
import CheckBox from './CheckBox';
it('displays supplied value', function () {
    var control = render(_jsx(CheckBox, { id: 'chkInput', value: null, onChange: function () { return null; } }));
    var input = control.getByRole('checkbox');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var control = render(_jsx(CheckBox, { id: 'chkInput', value: null, onChange: function () { return null; } }));
    var input = control.getByRole('checkbox');
    expect(input).toHaveAttribute('id', 'chkInput');
});
it('calls onChange as expected', function () {
    // initialize with null 
    var handleChange = jest.fn();
    var control = render(_jsx(CheckBox, { id: 'chkInput', value: null, onChange: handleChange }));
    var input = control.getByRole('checkbox');
    // when clicked we expect true
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledWith(true);
    cleanup();
    // initialize with false 
    handleChange = jest.fn();
    control = render(_jsx(CheckBox, { id: 'chkInput', label: 'Checkbox Label', value: false, onChange: handleChange }));
    input = control.getByRole('checkbox');
    // when clicked we expect true
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledWith(true);
    cleanup();
    // initialize with true
    handleChange = jest.fn();
    control = render(_jsx(CheckBox, { id: 'chkInput', label: 'Checkbox Label', value: true, onChange: handleChange }));
    input = control.getByRole('checkbox');
    // when clicked we expect false
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledWith(false);
});
it('has the correct label when provided', function () {
    var control = render(_jsx(CheckBox, { id: 'chkInput', value: null, onChange: function () { return null; } }));
    var label = control.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(CheckBox, { id: 'chkInput', label: 'Expected Label Value', value: true, onChange: function () { return null; } }));
    label = control.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Label Value');
});
it('is required when specified', function () {
    var control = render(_jsx(CheckBox, { id: 'chkInput', value: true, onChange: function () { return null; } }));
    var input = control.getByRole('checkbox');
    expect(input).not.toBeRequired();
    cleanup();
    control = render(_jsx(CheckBox, { id: 'chkInput', value: true, onChange: function () { return null; }, required: true }));
    input = control.getByRole('checkbox');
    expect(input).toBeRequired();
});
it('label has asterisk when required', function () {
    var control = render(_jsx(CheckBox, { id: 'chkInput', label: 'A Label', value: true, onChange: function () { return null; } }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(CheckBox, { id: 'chkInput', value: true, label: 'A Label', onChange: function () { return null; }, required: true }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var control = render(_jsx(CheckBox, { id: 'chkInput', value: true, onChange: function () { return null; } }));
    var input = control.getByRole('checkbox');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(CheckBox, { id: 'chkInput', value: true, onChange: function () { return null; }, hidden: true }));
    input = control.getByRole('checkbox');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var control = render(_jsx(CheckBox, { id: 'chkInput', value: true, onChange: function () { return null; } }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(CheckBox, { id: 'chkInput', value: true, onChange: function () { return null; }, errorMessage: 'Error!!' }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
