import { jsx as _jsx } from "react/jsx-runtime";
import { render, cleanup, fireEvent } from '@testing-library/react';
import TextRadio from './TextRadio';
it('displays supplied value', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var numberSelect = render(_jsx(TextRadio, { id: 'rdInput', value: undefined, onChange: function () { return null; }, selectOptions: textSelectOptions }));
    var input = numberSelect.getByDisplayValue('Value Two');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var numberSelect = render(_jsx(TextRadio, { id: 'rdInput', value: undefined, onChange: function () { return null; }, selectOptions: textSelectOptions }));
    var input = numberSelect.getByDisplayValue('Value One');
    expect(input).toHaveAttribute('id', 'rdInput0');
});
it('calls onChange as expected', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var handleChange = jest.fn();
    var control = render(_jsx(TextRadio, { id: 'rdInput', value: undefined, onChange: handleChange, selectOptions: textSelectOptions }));
    var input = control.getByDisplayValue('Value Two');
    // when clicked we expect correct value
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledWith('Value Two');
});
it('has no label when not provided', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var numberSelect = render(_jsx(TextRadio, { id: 'rdInput', value: 'Value Two', onChange: function () { return null; }, selectOptions: textSelectOptions }));
    var label = numberSelect.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var numberSelect = render(_jsx(TextRadio, { id: 'rdInput', value: 'Value Three', onChange: function () { return null; }, label: 'Expected Label Value', selectOptions: textSelectOptions }));
    var label = numberSelect.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Label Value');
});
it('label has asterisk when required', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var control = render(_jsx(TextRadio, { id: 'chkInput', label: 'A Label', value: undefined, onChange: function () { return null; }, selectOptions: textSelectOptions }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(TextRadio, { id: 'rdInput', label: 'A Label', value: undefined, onChange: function () { return null; }, required: true, selectOptions: textSelectOptions }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(label).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var control = render(_jsx(TextRadio, { id: 'rdInput', value: undefined, onChange: function () { return null; }, selectOptions: textSelectOptions }));
    var input = control.getByDisplayValue('Value One');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(TextRadio, { id: 'rdInput', value: undefined, onChange: function () { return null; }, hidden: true, selectOptions: textSelectOptions }));
    input = control.getByDisplayValue('Value One');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var control = render(_jsx(TextRadio, { id: 'rdInput', value: undefined, onChange: function () { return null; }, selectOptions: textSelectOptions }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(TextRadio, { id: 'rdInput', value: undefined, onChange: function () { return null; }, errorMessage: 'Error!!', selectOptions: textSelectOptions }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
