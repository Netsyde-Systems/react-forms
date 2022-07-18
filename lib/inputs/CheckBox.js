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
import './CheckBox.scss';
export function CheckBox(props) {
    var handleChange = function (e) { return props.onChange(e.target.checked); };
    var className = getInputEnvelopeClass(props, 'checkbox', 'input');
    // Shorthand for common properties with same name, and not requiring processing.  
    // enables more concise notation below
    var id = props.id, disabled = props.disabled, required = props.required;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx("input", __assign({ type: "checkbox", checked: !!props.value, onChange: handleChange }, { id: id, disabled: disabled, required: required })), _jsx(InputLabel, __assign({}, props)), _jsx("br", {}), _jsx(ErrorMessage, __assign({}, props))] })));
}
export default CheckBox;
