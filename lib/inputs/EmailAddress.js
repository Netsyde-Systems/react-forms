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
import { isValidEmail } from '../validation/validation';
export function EmailAddress(props) {
    var _a, _b;
    var clonedProps = Object.assign({}, props);
    (_a = clonedProps.placeholder) !== null && _a !== void 0 ? _a : (clonedProps.placeholder = 'email@server.com');
    (_b = clonedProps.errorMessage) !== null && _b !== void 0 ? _b : (clonedProps.errorMessage = (!props.value || isValidEmail(props.value)) ? undefined : 'Invalid email');
    return (_jsx(TextInput, __assign({}, clonedProps)));
}
export default EmailAddress;
