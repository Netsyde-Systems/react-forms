import { jsx as _jsx } from "react/jsx-runtime";
import { render, cleanup } from '@testing-library/react';
import NumberRadio from './NumberRadio';
it('displays supplied value', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var numberRadio = render(_jsx(NumberRadio, { id: 'selNumRadioInput', onChange: function () { return null; }, value: undefined, selectOptions: numberSelectOptions }));
    var input = numberRadio.getByDisplayValue('1');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var numberRadio = render(_jsx(NumberRadio, { id: 'selNumRadioInput', onChange: function () { return null; }, value: 2, selectOptions: numberSelectOptions }));
    var input = numberRadio.getByDisplayValue(2);
    expect(input).toHaveAttribute('id');
});
// it('calls onChange as expected', () => {
// 	const numberSelectOptions: Array<SelectOption<number>> = [
// 		{ value: 1, text: 'Option One' }, 
// 		{ value: 2, text: 'Option Two' }, 
// 		{ value: 3, text: 'Option Three' }, 
// 	]
// 	// initialize with null 
// 	let handleChange = jest.fn()
// 	let control = render(<NumberRadio id='selNumRadioInput' value={3} onChange={handleChange} selectOptions={numberSelectOptions} />)
// 	let input = control.getByDisplayValue(3)
// 	// when clicked we expect true
// 	fireEvent.click(input) 
// 	expect(handleChange).toHaveTextContent("Option Three")
// 	cleanup()
// 	// initialize with false 
// 	handleChange = jest.fn()
// 	control = render(<NumberRadio id='selNumRadioInput' label='Expected Number Radio' value={3} onChange={handleChange} selectOptions={numberSelectOptions} />)
// 	input = control.getByDisplayValue(3)
// 	// when clicked we expect true
// 	fireEvent.click(input) 
// 	expect(handleChange).toHaveTextContent("Option Three")
// 	cleanup()
// 	// initialize with true
// 	handleChange = jest.fn()
// 	control = render(<NumberRadio id='selNumRadioInput' label='Expected Number Radio' value={3} onChange={handleChange} selectOptions={numberSelectOptions} />)
// 	input = control.getByDisplayValue(3)
// 	// when clicked we expect false
// 	fireEvent.click(input) 
// 	expect(handleChange).toHaveTextContent("Option Three")
// })
it('has no label when not provided', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var numberRadio = render(_jsx(NumberRadio, { id: 'selNumRadioInput', onChange: function () { return null; }, value: undefined, selectOptions: numberSelectOptions }));
    var label = numberRadio.container.querySelector('label');
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
    var numberRadio = render(_jsx(NumberRadio, { id: 'selNumRadioInput', onChange: function () { return null; }, label: 'Expected Number Radio', value: undefined, selectOptions: numberSelectOptions }));
    var label = numberRadio.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Number Radio');
});
it('label has asterisk when required', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var control = render(_jsx(NumberRadio, { id: 'selNumRadioInput', label: 'A Label', value: undefined, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(NumberRadio, { id: 'selNumRadioInput', value: undefined, label: 'A Label', onChange: function () { return null; }, required: true, selectOptions: numberSelectOptions }));
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
    var control = render(_jsx(NumberRadio, { id: 'selNumRadioInput', value: undefined, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var input = control.getByDisplayValue('3');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(NumberRadio, { id: 'selNumRadioInput', value: undefined, onChange: function () { return null; }, hidden: true, selectOptions: numberSelectOptions }));
    input = control.getByDisplayValue('3');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    var control = render(_jsx(NumberRadio, { id: 'selNumRadioInput', value: undefined, onChange: function () { return null; }, selectOptions: numberSelectOptions }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(NumberRadio, { id: 'selNumRadioInput', value: undefined, onChange: function () { return null; }, errorMessage: 'Error!!', selectOptions: numberSelectOptions }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
it('renders option as disabled', function () {
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two', disabled: true },
        { value: 3, text: 'Option Three' },
    ];
    var numberRadio = render(_jsx(NumberRadio, { id: 'selNumRadioInput', onChange: function () { return null; }, label: 'Expected Number Radio', value: undefined, selectOptions: numberSelectOptions }));
    var input = numberRadio.getByDisplayValue('1');
    expect(input).toBeEnabled();
    var disabledInput = numberRadio.getByDisplayValue('2');
    expect(disabledInput).toBeDisabled();
});
