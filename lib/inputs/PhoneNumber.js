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
import { jsx as _jsx } from "react/jsx-runtime";
import './Inputs.scss';
import { MaskedInput } from './MaskedInput';
export function PhoneNumber(props) {
    var _a;
    var handleChange = function (textValue) {
        var numVal = Number(textValue);
        if (textValue === '' || isNaN(numVal))
            props.onChange(undefined);
        else
            props.onChange(numVal);
    };
    return (_jsx(MaskedInput, __assign({}, props, { type: 'tel', value: ((_a = props.value) === null || _a === void 0 ? void 0 : _a.toString()) || '', placeholder: '(555)123-4567x12345', onChange: handleChange, mask: '(000)000-0000x[00000]' })));
}
export default PhoneNumber;
