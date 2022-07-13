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
export function PostalCode(props) {
    var _a;
    var handleChange = function (val) { return props.onChange((val === null || val === void 0 ? void 0 : val.toUpperCase()) || ''); };
    return (_jsx(MaskedInput, __assign({}, props, { value: ((_a = props.value) === null || _a === void 0 ? void 0 : _a.toString()) || '', placeholder: 'A1A 1A1', onChange: handleChange, mask: 'a0a 0a0' })));
}
