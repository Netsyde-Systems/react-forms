import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
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
