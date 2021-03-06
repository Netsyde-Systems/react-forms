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
import { getInputEnvelopeClass } from './inputs';
import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';
import './Inputs.scss';
// html options in react can't take a null values
// bit of a hack fix to allow returning null value.
var NULL_STRING_VALUE = Number.MIN_SAFE_INTEGER.toString();
export function TextSelect(props) {
    var _a;
    var handleChange = function (e) { return props.onChange(e.target.value === NULL_STRING_VALUE ? null : e.target.value); };
    var className = getInputEnvelopeClass(props, 'select', 'input');
    // Shorthand for common properties with same name, and not requiring processing.  
    // enables more concise notation below
    var id = props.id, disabled = props.disabled, required = props.required;
    var options = props.selectOptions.map(function (option, optionIndex) {
        return (_jsx("option", __assign({ value: option.value }, { children: option.text }), optionIndex));
    });
    options.unshift(_jsx("option", __assign({ value: NULL_STRING_VALUE }, { children: props.placeholder || '' }), ''));
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx("select", __assign({ value: (_a = props.value) !== null && _a !== void 0 ? _a : '', onChange: handleChange }, { id: id, disabled: disabled, required: required }, { children: options })), _jsx(ErrorMessage, __assign({}, props))] })));
}
export default TextSelect;
