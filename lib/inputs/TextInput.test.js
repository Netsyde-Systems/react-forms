import { jsx as _jsx } from "react/jsx-runtime";
import { render, fireEvent } from '@testing-library/react';
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
    var handleChange = jest.fn();
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
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/\s*/);
});
it('has the correct label when provided', function () {
    var textInput = render(_jsx(TextInput, { id: 'txtInput', value: 'Expected Text', onChange: function () { return null; }, label: 'Expected Label Value' }));
    var label = textInput.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Label Value');
});
