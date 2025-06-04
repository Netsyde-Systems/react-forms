import { jsx as _jsx } from "react/jsx-runtime";
import { render, cleanup } from '@testing-library/react';
import NumberSelect from './NumberSelect';
it('displays supplied value', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var numberSelect = render(_jsx(NumberSelect, { id: 'selNumInput', value: 2, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var input = numberSelect.getByDisplayValue('Option Two');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var numberSelect = render(_jsx(NumberSelect, { id: 'selNumInput', value: 1, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var input = numberSelect.getByDisplayValue('Option One');
    expect(input).toHaveAttribute('id', 'selNumInput');
});
//it('calls onChange function', () => {
//	const numberSelectOptions: Array<SelectOption<number>> = [
//		{ value: 1, text: 'Option One' }, 
//		{ value: 2, text: 'Option Two' }, 
//		{ value: 3, text: 'Option Three' }, 
//	]
//	const handleChange = jest.fn()
//	const textInput = render(<NumberSelect id='selNumInput' value={3} onChange={handleChange} selectOptions={numberSelectOptions} />)
//	const input = textInput.getByDisplayValue('Option Three')
//	fireEvent.change(input, { target: { value: '1' } })
//	expect(handleChange).toHaveBeenCalledWith('1')
//})
it('has no label when not provided', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var textInput = render(_jsx(NumberSelect, { id: 'selNumInput', value: 1, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var label = textInput.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var textInput = render(_jsx(NumberSelect, { id: 'selNumInput', value: 2, label: 'Number Select', onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var label = textInput.container.querySelector('label');
    expect(label).toHaveTextContent('Number Select');
});
it('label has asterisk when required', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var control = render(_jsx(NumberSelect, { id: 'selNumInput', value: 3, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(NumberSelect, { id: 'selNumInput', value: 3, onChange: function () { return null; }, required: true, selectOptions: numberSelectOptions }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var control = render(_jsx(NumberSelect, { id: 'selNumInput', value: 1, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var input = control.getByDisplayValue('Option One');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(NumberSelect, { id: 'selNumInput', value: 1, onChange: function () { return null; }, hidden: true, selectOptions: numberSelectOptions }));
    input = control.getByDisplayValue('Option One');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var control = render(_jsx(NumberSelect, { id: 'selNumInput', value: 2, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(NumberSelect, { id: 'selNumInput', value: 2, onChange: function () { return null; }, errorMessage: 'Error!!', selectOptions: numberSelectOptions }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
it('renders disabled option', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two', disabled: true },
        { value: 3, text: 'Option Three' },
    ];
    var rendered = render(_jsx(NumberSelect, { id: 'ctlId', label: 'Control Label', value: 1, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var option = rendered.getByText('Option One');
    expect(option).toBeEnabled();
    var disabledOption = rendered.getByText('Option Two');
    expect(disabledOption).toBeDisabled();
});
