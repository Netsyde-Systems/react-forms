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
// Uses https://imask.js.org/ for masking logic
import IMask from 'imask';
import { getInputEnvelopeClass } from './inputs';
import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';
import './Inputs.scss';
export function MaskedInput(props) {
    var mask = IMask.createMask({ mask: props.mask });
    var maskedValue = mask.resolve(props.value || '');
    var handleChange = function (e) {
        mask.resolve(e.target.value);
        props.onChange(mask.unmaskedValue);
    };
    var className = getInputEnvelopeClass(props, 'text', 'input');
    // Shorthand for common properties with same name, and not requiring processing.  
    // enables more concise notation below
    var id = props.id, disabled = props.disabled, placeholder = props.placeholder, required = props.required;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx("input", __assign({ value: maskedValue, onChange: handleChange }, { id: id, disabled: disabled, required: required, placeholder: placeholder })), _jsx(ErrorMessage, __assign({}, props))] })));
}
