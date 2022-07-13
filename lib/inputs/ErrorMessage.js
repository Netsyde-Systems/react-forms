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
import classNames from 'classnames';
import './ErrorMessage.scss';
export function ErrorMessage(props) {
    // we add a 'none' class to indicate that there are no errors (to allow css to hide the element)
    var className = classNames('error-message', { hidden: !props.errorMessage });
    // we render a space if there is no error so that the span doesn't collapse (prevents form jitter)
    return (_jsx("span", __assign({ className: className }, { children: props.errorMessage || ' ' })));
}
export default ErrorMessage;
