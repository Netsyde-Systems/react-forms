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
import React from 'react';
import classNames from 'classnames';
import { DataInspector } from './DataInspector';
import './FormInspector.scss';
export var FormInspector = function (_a) {
    var formBuilder = _a.formBuilder, children = _a.children;
    var _b = React.useState(), inspectorIsOpen = _b[0], setInspectorIsOpen = _b[1];
    var className = classNames('form-inspector', { open: inspectorIsOpen });
    var buttonText = inspectorIsOpen ?
        '> Close' :
        '< Inspect';
    var dataInspector = inspectorIsOpen ?
        _jsx(DataInspector, { formBuilder: formBuilder }) :
        null;
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx("div", __assign({ className: 'form' }, { children: children })), _jsxs("div", __assign({ className: 'data-inspector' }, { children: [_jsx("button", __assign({ className: 'inspect', onClick: function () { return setInspectorIsOpen(!inspectorIsOpen); } }, { children: buttonText })), dataInspector] }))] })));
};
export default FormInspector;
