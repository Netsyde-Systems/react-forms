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
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Header from './header/Header';
import ControlTests from './pages/ControlTests';
import FormTests from './pages/FormTests';
import Home from './pages/Home';
import './App.scss';
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs("div", __assign({ className: "app" }, { children: [_jsx(Header, { pageName: 'Test Page' }), _jsxs("nav", { children: [_jsx(NavLink, __assign({ to: '/' }, { children: "Home" })), _jsx(NavLink, __assign({ to: 'controls' }, { children: "Control Tests" })), _jsx(NavLink, __assign({ to: 'forms' }, { children: "Form Tests" }))] }), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: 'controls', element: _jsx(ControlTests, {}) }), _jsx(Route, { path: 'forms', element: _jsx(FormTests, {}) })] })] })) }));
}
export default App;
