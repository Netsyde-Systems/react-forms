import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Header.scss';
import logo from '../images/react-forms-logo.png';
export function Header(props) {
    var _a;
    return (_jsxs("header", { children: [_jsx("img", { src: logo, className: "header-logo", alt: "React Forms Logo" }), _jsxs("div", { className: 'header-banner', children: [_jsx("div", { className: 'header-page-name', children: (_a = props.pageName) !== null && _a !== void 0 ? _a : '' }), _jsx("div", { className: 'header-app-name', children: "A Small, Simple, Strongly Typed Forms Library" })] })] }));
}
export default Header;
