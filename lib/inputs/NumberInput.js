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
import { ReadonlyField } from './ReadonlyField';
export function NumberInput(props) {
    var _a, _b;
    if (props.readOnly) {
        var value = (_a = props.value) === null || _a === void 0 ? void 0 : _a.toString();
        var roProps = Object.assign({}, props, { value: value });
        return _jsx(ReadonlyField, __assign({}, roProps));
    }
    var handleChange = function (e) { return props.onChange(e.target.value === '' ? undefined : Number(e.target.value)); };
    var className = getInputEnvelopeClass(props, 'number', 'input');
    var id = props.id, disabled = props.disabled, placeholder = props.placeholder, required = props.required, controlProps = props.controlProps;
    return (_jsxs("div", { className: className, children: [_jsx(InputLabel, __assign({}, props)), _jsx("input", __assign({}, controlProps, { type: 'number', value: (_b = props.value) !== null && _b !== void 0 ? _b : '', onChange: handleChange, id: id, disabled: disabled, required: required, placeholder: placeholder })), _jsx(ErrorMessage, __assign({}, props))] }));
}
export default NumberInput;
