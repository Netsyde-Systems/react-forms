import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
export function ErrorMessage(props) {
    // an error message explicitly set to false means we don't want to reserve space for it when empty (which is the default to avoid jitter)
    // useful for tabular forms where error messages may be rendered elsewhere
    var errorText = props.errorMessage === false ? null : (props.errorMessage);
    // we add a hidden class to indicate that there are no errors (to allow css to hide the padded element)
    var className = classNames('error-message', { hidden: !errorText, collapsed: props.errorMessage === false });
    return (_jsx("span", { className: className, children: errorText }));
}
export default ErrorMessage;
