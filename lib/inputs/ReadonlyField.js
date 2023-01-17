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
import './Inputs.scss';
export function ReadonlyField(props) {
    var className = getInputEnvelopeClass(props, 'readonly', 'field');
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx(InputLabel, __assign({}, props)), _jsx("div", __assign({ className: 'value' }, { children: props.value || ' ' })), _jsx(ErrorMessage, __assign({}, props))] })));
}
export default ReadonlyField;
