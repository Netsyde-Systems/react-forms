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
import './Header.scss';
import logo from '../images/react-forms-logo.png';
export function Header(props) {
    var _a;
    return (_jsxs("header", { children: [_jsx("img", { src: logo, className: "header-logo", alt: "React Forms Logo" }), _jsxs("div", __assign({ className: 'header-banner' }, { children: [_jsx("div", __assign({ className: 'header-page-name' }, { children: (_a = props.pageName) !== null && _a !== void 0 ? _a : '' })), _jsx("div", __assign({ className: 'header-app-name' }, { children: "A Small, Simple, Strongly Typed Forms Library" }))] }))] }));
}
export default Header;
