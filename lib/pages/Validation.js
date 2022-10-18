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
import './Validation.scss';
var testFormDefinition = {};
var testFormData = {};
var getTypeMap = function (obj) {
    var typeMap = Object.keys(obj).reduce(function (typeMap, key) {
        typeMap[key] = typeof obj[key];
        return typeMap;
    }, {});
    return typeMap;
};
export function Validation() {
    var rf = useReactForms(testFormDefinition, testFormData);
    return (_jsxs("div", __assign({ className: 'form-tests page' }, { children: [_jsx("h1", { children: "Validation Tests" }), _jsx("div", __assign({ className: 'control-grid' }, { children: _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('reqString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('minString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('maxString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('customString') }))] })) })), _jsx("h2", { children: "Test Form Data" }), _jsx("pre", { children: JSON.stringify(rf.formData, null, 2) }), _jsx("h2", { children: "Test Form Types" }), _jsx("pre", { children: JSON.stringify(getTypeMap(rf.formData), null, 2) })] })));
}
export default Validation;
