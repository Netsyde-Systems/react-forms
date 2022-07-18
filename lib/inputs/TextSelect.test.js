import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import TextSelect from './TextSelect';
it('displays supplied value', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var textSelect = render(_jsx(TextSelect, { id: 'selTextInput', value: 'Value Two', onChange: function () { return null; }, selectOptions: textSelectOptions }));
    var input = textSelect.getByDisplayValue('Option Two');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var textSelect = render(_jsx(TextSelect, { id: 'selTextInput', value: 'Value One', onChange: function () { return null; }, selectOptions: textSelectOptions }));
    var input = textSelect.getByDisplayValue('Option One');
    expect(input).toHaveAttribute('id', 'selTextInput');
});
