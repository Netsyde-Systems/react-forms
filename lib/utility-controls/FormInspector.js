import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { DataInspector } from './DataInspector';
import './FormInspector.scss';
export var FormInspector = function (_a) {
    var formBuilder = _a.formBuilder, children = _a.children;
    var _b = React.useState(), inspectorIsOpen = _b[0], setInspectorIsOpen = _b[1];
    var buttonText = inspectorIsOpen ?
        '> Close' :
        '< Inspect';
    var dataInspector = inspectorIsOpen ?
        _jsx(DataInspector, { formBuilder: formBuilder }) :
        null;
    return (_jsxs("div", { className: 'form-inspector', children: [_jsx("button", { className: 'inspect', onClick: function () { return setInspectorIsOpen(!inspectorIsOpen); }, children: buttonText }), _jsx("div", { className: 'inspection-results', children: dataInspector }), children] }));
};
export default FormInspector;
