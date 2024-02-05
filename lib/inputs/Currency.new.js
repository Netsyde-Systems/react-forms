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
import { useState } from 'react';
import IMask from 'imask';
import { TextInputUncontrolled } from './TextInputUncontrolled';
// Added temporarily as a fix for the currency decimal input issue.
// Ideally we resolve the issue with the original currency control so as to reuse the MaskedInput logic
// BROKEN: Doesn't work in subforms because of th euse of useState in the component for some reason.  
// TODO: Investigate
export function Currency(props) {
    var _a;
    var _b = useState((_a = props.value) === null || _a === void 0 ? void 0 : _a.toString()), textValue = _b[0], setTextValue = _b[1];
    var handleChange = function (textValue) {
        var curr = getCurrency(textValue || '');
        if (textValue === '' || isNaN(curr.numberValue))
            props.onChange(undefined);
        else
            props.onChange(curr.numberValue);
        setTextValue(curr.displayString);
    };
    return (_jsx(TextInputUncontrolled, __assign({}, props, { value: textValue || '', placeholder: '$', onChange: handleChange })));
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
export function getCurrency(dirtyString) {
    var _a, _b, _c;
    var dollarMask = IMask.createMask(dollarMaskConfig);
    dollarMask.value = dirtyString;
    var displayString = dollarMask.value;
    var radixIndex = (_a = dirtyString === null || dirtyString === void 0 ? void 0 : dirtyString.indexOf(radix)) !== null && _a !== void 0 ? _a : -1;
    // hacks to allow retaining decimal input status
    if (radixIndex >= 0 && !dollarMask.value.includes(radix)) {
        displayString = (_b = dirtyString === null || dirtyString === void 0 ? void 0 : dirtyString.slice(0, radixIndex + 1)) !== null && _b !== void 0 ? _b : '';
        displayString += (_c = dirtyString === null || dirtyString === void 0 ? void 0 : dirtyString.slice(radixIndex + 1, radixIndex + 3).split('').map(Number).filter(function (n) { return !isNaN(n); }).join('')) !== null && _c !== void 0 ? _c : '';
    }
    var numberValue = Number(dollarMask.unmaskedValue);
    return { numberValue: numberValue, displayString: displayString };
}
