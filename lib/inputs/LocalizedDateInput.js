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
import DatePicker from 'react-datepicker';
import { dateToIsoGmtShortDateString } from '../utilities';
import { getInputEnvelopeClass } from './inputs';
import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';
import { ReadonlyField } from './ReadonlyField';
import 'react-datepicker/dist/react-datepicker.css';
// Note: Localized Date Input does not support standard controlProps like the other inputs do (at this time)
export function LocalizedDateInput(props) {
    var value = dateToIsoGmtShortDateString(props.value);
    if (props.readOnly) {
        return _jsx(ReadonlyField, __assign({}, Object.assign({}, props, { value: value })));
    }
    var handleChange = function (date) {
        props.onChange(date || undefined);
    };
    var className = getInputEnvelopeClass(props, 'date', 'input');
    var id = props.id, disabled = props.disabled;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx(DatePicker, __assign({ onChange: handleChange, value: value, locale: props.locale }, { id: id, disabled: disabled })), _jsx(ErrorMessage, __assign({}, props))] })));
}
export default LocalizedDateInput;
