var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useReactForms from '../hooks/useReactForms';
import FormInspector from '../utility-controls/FormInspector';
import './Forms.scss';
var testFormDefinition = {
    fields: {
        selectStringProperty: {
            selectOptions: [
                { value: 'First', text: 'First Option' },
                { value: 'Second', text: 'Second Option' },
            ]
        },
        selectNumberProperty: {
            selectOptions: [
                { value: 1, text: 'First Option' },
                { value: 2, text: 'Second Option' },
            ]
        },
        radioStringProperty: {
            selectOptions: [
                { value: 'First', text: 'First Option' },
                { value: 'Second', text: 'Second Option' },
            ]
        },
        radioNumberProperty: {
            selectOptions: [
                { value: 1, text: 'First Option' },
                { value: 2, text: 'Second Option' },
            ]
        },
        filesProperty: {
            label: 'File Input Name is now configurable'
        }
    },
};
var now = new Date();
var minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
var maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
export function Forms() {
    var rf = useReactForms(testFormDefinition);
    var RF = rf.ElementBuilder;
    return (_jsx(FormInspector, __assign({ formBuilder: rf }, { children: _jsxs("div", __assign({ className: 'forms page' }, { children: [_jsx("h1", { children: "Form Tests" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('stringProperty', { title: 'String Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberInput('numberProperty', { title: 'Number Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.integerInput('integerProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.dateInput('dateProperty', { min: minDate, max: maxDate }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.localizedDateInput('dateProperty', { min: minDate, max: maxDate }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextInput, { field: 'stringProperty', title: 'String Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberInput, { field: 'numberProperty', title: 'Number Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.IntegerInput, { field: 'integerProperty' }) })), _jsxs("div", __assign({ className: 'control-cell' }, { children: ["Note: Fix min/max type colision", _jsx(RF.DateInput, { field: 'dateProperty', title: 'Date Element', min: minDate, max: maxDate })] })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.LocalizedDateInput, { field: 'dateProperty', min: minDate, max: maxDate }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textSelect('selectStringProperty', { title: 'Text Select Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberSelect('selectNumberProperty', { title: 'Number Select Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.checkbox('checkboxProperty', { title: 'Checkbox Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.maskedInput('maskedProperty', '00-0000000') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextSelect, { field: 'selectStringProperty', title: 'Text Select Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberSelect, { field: 'selectNumberProperty', title: 'Number Select Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.CheckBox, { field: 'checkboxProperty', title: 'Checkbox Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.MaskedInput, { field: 'maskedProperty', mask: '0000000-00' }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textRadio('radioStringProperty', { title: 'Text Radio Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberRadio('radioNumberProperty', { title: 'Number Radio Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textArea('longStringProperty', { title: 'Text Area Function', rows: 3 }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextRadio, { field: 'radioStringProperty', title: 'Text Radio Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberRadio, { field: 'radioNumberProperty', title: 'Number Radio Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextArea, { field: 'longStringProperty', title: 'Text Area Element', rows: 5 }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.phoneNumber('phoneNumber', { title: 'Phone Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.postalCode('postalCode', { title: 'Postal Code Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.emailAddress('email', { title: 'Email Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.currency('currency', { title: 'Currency Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.readonlyField('Calculated', "number + phone = ".concat((rf.formData.numberProperty || 0) + (rf.formData.phoneNumber || 0))) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.PhoneNumber, { field: 'phoneNumber', title: 'Phone Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.PostalCode, { field: 'postalCode', title: 'Postal Code Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.EmailAddress, { field: 'email', title: 'Email Element' }) })), _jsxs("div", __assign({ className: 'control-cell' }, { children: [_jsx(RF.Currency, { field: 'currency', title: 'Currency Element' }), "Note, cents input not yet working with form builder (but is when using control itself).  ", _jsx("br", {}), "TODO: investigate"] })), _jsx("div", __assign({ className: 'control-cell' }, { children: "Calculated field not yet implemented with element builder.  May require redesign" }))] })), _jsx("div", { children: rf.files('filesProperty') }), _jsx("div", { children: _jsx(RF.Files, { field: 'filesProperty' }) })] }))] })) })));
}
export default Forms;
