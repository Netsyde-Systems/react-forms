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
import { toIsoGmtDateString } from '../utilities';
export function DateInput(props) {
    var handleChange = function (e) {
        console.log(e.target.value);
        console.log(e.target.valueAsDate);
        props.onChange(e.target.valueAsDate || undefined);
    };
    var className = getInputEnvelopeClass(props, 'date', 'input');
    // Shorthand for common properties with same name, and not requiring processing.  
    // enables more concise notation below
    var id = props.id, disabled = props.disabled;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx("input", __assign({ type: 'date', value: toIsoGmtDateString(props.value), onChange: handleChange }, { id: id, disabled: disabled })), _jsx(ErrorMessage, __assign({}, props))] })));
}
export default DateInput;
