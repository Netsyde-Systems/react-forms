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
import Home from './pages/Home';
import Controls from './pages/Controls';
import Forms from './pages/Forms';
import Validation from './pages/Validation';
import Localization from './pages/Localization';
import SubForms from './pages/SubForms';
// This was causing issues when importing into other projects
// import { Config } from './utilities'
// <BrowserRouter basename={Config.DeploymentDirectory}></BrowserRouter>
import './App.scss';
import './styles/react-forms.scss';
function App() {
    return (
    // <BrowserRouter basename={Config.DeploymentDirectory}></BrowserRouter>
    _jsx(BrowserRouter, { children: _jsxs("div", __assign({ className: "app" }, { children: [_jsx(Header, {}), _jsxs("nav", { children: [_jsx(NavLink, __assign({ to: '/' }, { children: "Home" })), _jsx(NavLink, __assign({ to: 'controls' }, { children: "Controls" })), _jsx(NavLink, __assign({ to: 'forms' }, { children: "Forms" })), _jsx(NavLink, __assign({ to: 'validation' }, { children: "Validation" })), _jsx(NavLink, __assign({ to: 'localization' }, { children: "Localization" })), _jsx(NavLink, __assign({ to: 'subforms' }, { children: "SubForms" }))] }), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: 'controls', element: _jsx(Controls, {}) }), _jsx(Route, { path: 'forms', element: _jsx(Forms, {}) }), _jsx(Route, { path: 'validation', element: _jsx(Validation, {}) }), _jsx(Route, { path: 'localization', element: _jsx(Localization, {}) }), _jsx(Route, { path: 'subforms', element: _jsx(SubForms, {}) })] })] })) }));
}
export default App;
