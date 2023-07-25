import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
export function InputLabel(props) {
    var id = props.id, label = props.label, required = props.required;
    var className = classNames('input-label', { required: required && !!label });
    // a label explicitly set to false means we don't want to reserve space for it when empty (which is the default to avoid jitter)
    // useful for tabular forms with labels as column headers
    var labelText = label === false ? null : label;
    return (_jsx("label", { className: className, htmlFor: id, children: labelText }));
}
export default InputLabel;
