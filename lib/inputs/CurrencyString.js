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
import { TextInput } from './TextInput';
import { getCurrency } from './Currency.new';
// Added temporarily as a hack to fix for the currency decimal input issue.
// Works by storing the dollar value as a string.  Models need to be augmented with a string value unfortunately.
export function CurrencyString(props) {
    var handleChange = function (textValue) {
        var curr = getCurrency(textValue || '');
        props.onChange(curr.displayString);
    };
    return (_jsx(TextInput, __assign({}, props, { value: props.value || '', placeholder: '$', onChange: handleChange })));
}
export default CurrencyString;
