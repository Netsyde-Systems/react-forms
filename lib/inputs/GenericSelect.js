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
import { getInputEnvelopeClass } from './inputs';
import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';
import { ReadonlyField } from './ReadonlyField';
export function GenericSelect(props) {
    if (props.readOnly) {
        var opt = props.selectOptions.find(function (o) { return o.value === props.value; });
        var value = (opt === null || opt === void 0 ? void 0 : opt.text) || '';
        var selProps = Object.assign({}, props, { value: value });
        return _jsx(ReadonlyField, __assign({}, selProps));
    }
    var handleChange = function (e) { return props.onChange(props.valueFromString(e.target.value)); };
    var className = getInputEnvelopeClass(props, 'select', 'input');
    var id = props.id, disabled = props.disabled, required = props.required, controlProps = props.controlProps;
    var options = props.selectOptions.map(function (option, optionIndex) {
        return (_jsx("option", { value: props.valueToString(option.value), disabled: option.disabled, dangerouslySetInnerHTML: { __html: option.text } }, optionIndex));
    });
    if (!props.disallowBlank)
        options.unshift(_jsx("option", __assign({ value: props.valueToString(undefined) }, { children: props.placeholder || '' }), ''));
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx("select", __assign({}, controlProps, { value: props.valueToString(props.value), onChange: handleChange }, { id: id, disabled: disabled, required: required }, { children: options })), _jsx(ErrorMessage, __assign({}, props))] })));
}
export default GenericSelect;
