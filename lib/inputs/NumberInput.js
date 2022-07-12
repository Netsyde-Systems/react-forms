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
export function NumberInput(props) {
    var _a;
    var handleChange = function (e) { return props.onChange(e.target.value === '' ? null : Number(e.target.value)); };
    var className = getInputEnvelopeClass(props, 'text', 'input');
    // Shorthand for common properties with same name, and not requiring processing.  
    // enables more concise notation below
    var id = props.id, disabled = props.disabled, placeholder = props.placeholder;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx("input", __assign({ type: 'number', value: (_a = props.value) !== null && _a !== void 0 ? _a : '', onChange: handleChange }, { id: id, disabled: disabled, placeholder: placeholder })), _jsx(ErrorMessage, __assign({}, props))] })));
}
