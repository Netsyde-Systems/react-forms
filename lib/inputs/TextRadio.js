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
export function TextRadio(props) {
    var controlProps = props.controlProps;
    var handleOptionChange = function (e) { return !props.readOnly && props.onChange(e.target.value); };
    var className = getInputEnvelopeClass(props, 'radio', 'input');
    var radios = props.selectOptions.map(function (option, optionIndex) {
        var radioId = props.id + optionIndex;
        return (_jsxs("div", { children: [_jsx("input", __assign({}, controlProps, { id: radioId, name: props.id, type: 'radio', value: option.value, checked: props.value === option.value, onChange: handleOptionChange, disabled: props.disabled || option.disabled, readOnly: props.readOnly })), _jsx("label", { htmlFor: props.id + optionIndex, dangerouslySetInnerHTML: { __html: option.text } })] }, optionIndex));
    });
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), radios, _jsx(ErrorMessage, __assign({}, props))] })));
}
export default TextRadio;
