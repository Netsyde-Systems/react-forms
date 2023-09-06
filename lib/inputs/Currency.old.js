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
import { MaskedInput } from './MaskedInput';
// Doesn't allow inputting decimals due to model being a number that can't track radix status
export function Currency(props) {
    var _a;
    var handleChange = function (textValue, rawValue) {
        console.log("currency change textValue: ".concat(textValue, " rawValue: ").concat(rawValue));
        var numVal = Number(textValue);
        if (textValue === '' || isNaN(numVal))
            props.onChange(undefined);
        else
            props.onChange(numVal, rawValue);
    };
    var dollarMask = {
        mask: '$curr',
        blocks: {
            curr: {
                mask: Number,
                thousandsSeparator: ',',
                radix: '.',
            }
        }
    };
    return (_jsx(MaskedInput, __assign({}, props, { value: ((_a = props.value) === null || _a === void 0 ? void 0 : _a.toString()) || '', placeholder: '$', onChange: handleChange, mask: dollarMask })));
}
export default Currency;
