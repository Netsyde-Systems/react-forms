import { jsx as _jsx } from "react/jsx-runtime";
import { TextSelect } from '../inputs/TextSelect';
import { assertNever } from '../utilities';
var ALL_FORM_VIEWS = ['Edit', 'ReadOnly', 'Disabled'];
var formViewOptions = ALL_FORM_VIEWS.map(function (formView) { return ({ text: formView, value: formView }); });
export function getFormViewState(formView) {
    var state = { isDisabled: false, isReadOnly: false };
    switch (formView) {
        case 'Edit':
            // No need to change the state
            break;
        case 'ReadOnly':
            state.isReadOnly = true;
            break;
        case 'Disabled':
            state.isDisabled = true;
            break;
        default: assertNever(formView);
    }
    return state;
}
export function FormViewSelect(props) {
    return _jsx(TextSelect, { id: 'form-view-select', value: props.currentFormView, onChange: function (val) { return props.onFormViewChange(val); }, selectOptions: formViewOptions, disallowBlank: true, errorMessage: false, label: 'Form View' });
}
