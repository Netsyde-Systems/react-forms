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
import { IMaskInput } from 'react-imask';
import { getInputEnvelopeClass } from './inputs';
import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';
import { ReadonlyField } from './ReadonlyField';
import './Inputs.scss';
export function MaskedInput(props) {
    var _a;
    var mask;
    if (typeof props.mask === 'string') {
        mask = IMask.createMask({ mask: props.mask });
    }
    else
        mask = IMask.createMask(props.mask);
    mask.value = (_a = props.value) !== null && _a !== void 0 ? _a : '';
    if (props.readOnly) {
        return _jsx(ReadonlyField, __assign({}, Object.assign({}, props, { value: mask.value })));
    }
    var handleAccept = function (value, mask, e) {
        props.onChange(value);
    };
    var className = getInputEnvelopeClass(props, 'text', 'input');
    var id = props.id, disabled = props.disabled, placeholder = props.placeholder, required = props.required, controlProps = props.controlProps;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx(IMaskInput, __assign({}, controlProps, { value: mask.value, unmask: true, mask: mask, onAccept: handleAccept }, { id: id, disabled: disabled, required: required, placeholder: placeholder })), _jsx(ErrorMessage, __assign({}, props))] })));
}
export default MaskedInput;
