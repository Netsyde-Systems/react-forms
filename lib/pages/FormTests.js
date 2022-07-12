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
import useFormBuilder from '../hooks/useFormBuilder';
import './FormTests.scss';
var testFormDefinition = {
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
    }
};
var testFormData = {};
var getTypeMap = function (obj) {
    var typeMap = Object.keys(obj).reduce(function (typeMap, key) {
        typeMap[key] = typeof obj[key];
        return typeMap;
    }, {});
    return typeMap;
};
export function FormTests() {
    var formBuilder = useFormBuilder(testFormDefinition, testFormData);
    return (_jsxs("div", __assign({ className: 'form-tests page' }, { children: [_jsx("h1", { children: "Form Tests" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: formBuilder.textInput('stringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: formBuilder.numberInput('numberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: formBuilder.dateInput('dateProperty') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: formBuilder.selectTextInput('selectStringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: formBuilder.selectNumberInput('selectNumberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: formBuilder.checkboxInput('checkboxProperty') }))] }))] })), _jsx("h2", { children: "Test Form Data" }), _jsx("pre", { children: JSON.stringify(formBuilder.formData, null, 2) }), _jsx("h2", { children: "Test Form Types" }), _jsx("pre", { children: JSON.stringify(getTypeMap(formBuilder.formData), null, 2) })] })));
}
export default FormTests;
