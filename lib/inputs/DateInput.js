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
import './Inputs.scss';
import { dateToIsoGmtShortDateString, shortDateStringToDate } from '../utilities';
export function DateInput(props) {
    var value = dateToIsoGmtShortDateString(props.value);
    if (props.readOnly) {
        return _jsx(ReadonlyField, __assign({}, Object.assign({}, props, { value: value })));
    }
    var handleChange = function (e) {
        var valueAsDate = shortDateStringToDate(e.target.value);
        props.onChange(valueAsDate);
    };
    var className = getInputEnvelopeClass(props, 'date', 'input');
    var id = props.id, disabled = props.disabled, controlProps = props.controlProps;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx("input", __assign({}, controlProps, { type: 'date', value: value, onChange: handleChange }, { id: id, disabled: disabled })), _jsx(ErrorMessage, __assign({}, props))] })));
}
export default DateInput;
