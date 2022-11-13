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
import { DataInspector } from './DataInspector';
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
var testFormData = {};
export function Forms() {
    var rf = useReactForms(testFormDefinition, testFormData);
    return (_jsxs("div", __assign({ className: 'forms page' }, { children: [_jsx("h1", { children: "Form Tests" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('stringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberInput('numberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.dateInput('dateProperty') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textSelect('selectStringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberSelect('selectNumberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.checkbox('checkboxProperty') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textRadio('radioStringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberRadio('radioNumberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textArea('longStringProperty') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.phoneNumber('phoneNumber') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.postalCode('postalCode') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.emailAddress('email') }))] })), _jsx("div", { children: rf.files('filesProperty') }), _jsx("h2", { children: "JSX Tests" }), _jsx("p", { children: "TODO: Fix 'input losing focus' issue when calling property via JSX" }), _jsx("div", __assign({ className: 'control-row' }, { children: _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(rf.TextInputElementTest, { field: 'stringProperty' }) })) }))] })), _jsx(DataInspector, { formBuilder: rf })] })));
}
export default Forms;
