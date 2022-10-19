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
import { getTypeMap } from '../utilities';
import Well from '../well/Well';
import './Validation.scss';
// this form definition is validated only after the validate button is pressed
var stringDefinitionDeferred = {
    reqString: { label: 'Required String', isRequired: true },
    minString: { label: 'Min String (2)', validators: { min: 2 } },
    maxString: { label: 'Max String (5)', validators: { max: 5 } },
    allString: { label: 'Required Min 2 Max 5', isRequired: true, validators: { min: 2, max: 5 } },
    customString: { label: 'Must be of length 10 and contain "sheep"', validators: function (fieldValue, fieldName, formData) {
            var errors = [];
            if (fieldValue && fieldValue.length < 10)
                errors.push("Must be of at least length 10");
            if (fieldValue && !(fieldValue.indexOf('sheep') >= 0))
                errors.push("Must contain 'sheep'");
            return errors;
        } },
    multiFnString: { label: 'Must be of length 7 and contain "ducks"', validators: [
            function (fieldValue, fieldName, formData) {
                return (!fieldValue || fieldValue.length >= 7) ? [] : ["Must be of at least length 7"];
            },
            function (fieldValue, fieldName, formData) {
                return (!fieldValue || fieldValue.indexOf('ducks') >= 0) ? [] : ["Must contain 'ducks'"];
            },
        ] }
};
// this form definition validated as soon as the user begins typing into an input 
var stringDefinitionImmediate = Object.entries(stringDefinitionDeferred).reduce(function (formDef, _a) {
    var key = _a[0], fieldDef = _a[1];
    var typedKey = key;
    formDef[typedKey] = Object.assign({}, fieldDef);
    formDef[typedKey].validateImmediately = true;
    return formDef;
}, {});
var stringFormDataDeferred = {};
var stringFormDataImmediate = {};
export function Validation() {
    var rfDeferred = useReactForms(stringDefinitionDeferred, stringFormDataDeferred);
    var rfImmediate = useReactForms(stringDefinitionImmediate, stringFormDataImmediate);
    return (_jsxs("div", __assign({ className: 'validation page' }, { children: [_jsx("h1", { children: "Validation Tests" }), _jsx(Well, __assign({ title: 'String Validation (Deferred)', buttonDefs: [{ text: 'Validate', onClick: function () { return rfDeferred.validate(); } }] }, { children: _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('reqString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('minString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('maxString') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('allString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('customString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfDeferred.textInput('multiFnString') }))] }))] })) })), _jsx(Well, __assign({ title: 'String Validation (Immediate)' }, { children: _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('reqString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('minString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('maxString') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('allString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('customString') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rfImmediate.textInput('multiFnString') }))] }))] })) })), _jsx("h2", { children: "Deferred Form Data" }), _jsx("pre", { children: JSON.stringify(rfDeferred.formData, null, 2) }), _jsx("h2", { children: "Deferred Form Types" }), _jsx("pre", { children: JSON.stringify(getTypeMap(rfDeferred.formData), null, 2) }), _jsx("h2", { children: "Immediate Form Data" }), _jsx("pre", { children: JSON.stringify(rfImmediate.formData, null, 2) }), _jsx("h2", { children: "Immediate Form Types" }), _jsx("pre", { children: JSON.stringify(getTypeMap(rfImmediate.formData), null, 2) })] })));
}
export default Validation;