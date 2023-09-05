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
import { useState, useRef } from 'react';
import IMask from 'imask';
import { TextInput } from './TextInput';
// Added temporarily as a fix for the currency decimal input issue.
// Ideally we resolve the issue with the original currency control so as to reuse the MaskedInput logic
export function Currency(props) {
    var _a;
    var _b = useState((_a = props.value) === null || _a === void 0 ? void 0 : _a.toString()), textValue = _b[0], setTextValue = _b[1];
    var dollarMaskRef = useRef(IMask.createMask(dollarMaskConfig));
    var dollarMask = dollarMaskRef.current;
    var handleChange = function (textValue) {
        var _a, _b, _c;
        dollarMask.value = textValue || '';
        var numVal = Number(dollarMask.unmaskedValue);
        if (textValue === '' || isNaN(numVal))
            props.onChange(undefined);
        else
            props.onChange(numVal);
        var newTextValue = dollarMask.value;
        var radixIndex = (_a = textValue === null || textValue === void 0 ? void 0 : textValue.indexOf(radix)) !== null && _a !== void 0 ? _a : -1;
        // hacks to allow retaining decimal input status
        if (radixIndex >= 0 && !dollarMask.value.includes(radix)) {
            newTextValue = (_b = textValue === null || textValue === void 0 ? void 0 : textValue.slice(0, radixIndex + 1)) !== null && _b !== void 0 ? _b : '';
            newTextValue += (_c = textValue === null || textValue === void 0 ? void 0 : textValue.slice(radixIndex + 1, radixIndex + 3).split('').map(Number).filter(function (n) { return !isNaN(n); }).join('')) !== null && _c !== void 0 ? _c : '';
        }
        setTextValue(newTextValue);
    };
    return (_jsx(TextInput, __assign({}, props, { value: textValue || '', placeholder: '$', onChange: handleChange })));
}
export default Currency;
var radix = '.';
var dollarMaskConfig = {
    mask: '$curr',
    blocks: {
        curr: {
            mask: Number,
            thousandsSeparator: ',',
            radix: radix,
        }
    }
};
