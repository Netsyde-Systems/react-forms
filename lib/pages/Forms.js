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
export function Forms() {
    var rf = useReactForms(testFormDefinition);
    var RF = rf.ElementBuilder;
    return (_jsx(FormInspector, __assign({ formBuilder: rf }, { children: _jsxs("div", __assign({ className: 'forms page' }, { children: [_jsx("h1", { children: "Form Tests" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('stringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberInput('numberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.dateInput('dateProperty') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextInput, { field: 'stringProperty' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberInput, { field: 'numberProperty' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.DateInput, { field: 'dateProperty' }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textSelect('selectStringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberSelect('selectNumberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.checkbox('checkboxProperty') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextSelect, { field: 'selectStringProperty' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberSelect, { field: 'selectNumberProperty' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.CheckBox, { field: 'checkboxProperty' }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textRadio('radioStringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberRadio('radioNumberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textArea('longStringProperty') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextRadio, { field: 'radioStringProperty' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberRadio, { field: 'radioNumberProperty' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextArea, { field: 'longStringProperty' }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.phoneNumber('phoneNumber') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.postalCode('postalCode') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.emailAddress('email') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.currency('currency') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.PhoneNumber, { field: 'phoneNumber' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.PostalCode, { field: 'postalCode' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.EmailAddress, { field: 'email' }) })), _jsxs("div", __assign({ className: 'control-cell' }, { children: [_jsx(RF.Currency, { field: 'currency' }), "Note, cents input not yet working with form builder (but is when using control itself).  ", _jsx("br", {}), "TODO: investigate"] }))] })), _jsx("div", { children: rf.files('filesProperty') }), _jsx("div", { children: _jsx(RF.Files, { field: 'filesProperty' }) })] }))] })) })));
}
export default Forms;
