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
import { GenericSelect } from './GenericSelect';
var NULL_STRING_VALUE = Number.MIN_SAFE_INTEGER.toString();
export function TextSelect(props) {
    var genericProps = Object.assign({}, props, {
        valueToString: function (val) { return !val ? NULL_STRING_VALUE : val; },
        valueFromString: function (stVal) { return stVal === NULL_STRING_VALUE ? undefined : stVal; }
    });
    return _jsx(GenericSelect, __assign({}, genericProps));
}
export default TextSelect;
