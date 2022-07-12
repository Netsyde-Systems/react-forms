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
import './Button.scss';
export function Button(props) {
    var _a;
    var buttonType = (_a = props.type) !== null && _a !== void 0 ? _a : 'primary';
    var className = classNames(buttonType, { 'hidden': props.hidden });
    return (_jsx("button", __assign({ className: className, onClick: props.onClick, disabled: props.disabled }, { children: props.text })));
}
export default Button;
