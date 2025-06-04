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
import { TextRadio } from './TextRadio';
export function NumberRadio(props) {
    var value = props.value, onChange = props.onChange, selectOptions = props.selectOptions;
    var textValue = value === null || value === void 0 ? void 0 : value.toString();
    var textOnChange = function (textValue) {
        var numVal = Number(textValue);
        if (isNaN(numVal))
            props.onChange(undefined);
        else
            onChange(numVal);
    };
    var textSelectOptions = selectOptions.map(function (_a) {
        var text = _a.text, value = _a.value, disabled = _a.disabled;
        return { text: text, value: value.toString(), disabled: disabled };
    });
    var textProps = __assign(__assign({}, props), { value: textValue, onChange: textOnChange, selectOptions: textSelectOptions });
    return _jsx(TextRadio, __assign({}, textProps));
}
export default NumberRadio;
