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
export function InputLabel(props) {
    var id = props.id, label = props.label, required = props.required;
    var className = classNames('input-label', { required: required && !!label });
    // a label explicitly set to false means we don't want to reserve space for it when empty (which is the default to avoid jitter)
    // useful for tabular forms with labels as column headers
    var labelText = label === false ? null : label;
    return (_jsx("label", __assign({ className: className, htmlFor: id }, { children: labelText })));
}
export default InputLabel;
