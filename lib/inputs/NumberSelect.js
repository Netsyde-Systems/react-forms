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
import TextSelect from './TextSelect';
import './Inputs.scss';
export function NumberSelect(props) {
    var id = props.id, value = props.value, onChange = props.onChange, label = props.label, errorMessage = props.errorMessage, required = props.required, hidden = props.hidden, placeholder = props.placeholder, selectOptions = props.selectOptions, disabled = props.disabled;
    var textValue = value === null || value === void 0 ? void 0 : value.toString();
    var textOnChange = function (textValue) {
        var numVal = Number(textValue);
        if (textValue === null || isNaN(numVal))
            props.onChange(null);
        else
            onChange(numVal);
    };
    var textSelectOptions = selectOptions.map(function (_a) {
        var text = _a.text, value = _a.value;
        return { text: text, value: value.toString() };
    });
    var textProps = {
        id: id,
        value: textValue, onChange: textOnChange,
        label: label,
        errorMessage: errorMessage,
        required: required,
        hidden: hidden,
        placeholder: placeholder,
        selectOptions: textSelectOptions,
        disabled: disabled
    };
    return _jsx(TextSelect, __assign({}, textProps));
}
export default NumberSelect;
