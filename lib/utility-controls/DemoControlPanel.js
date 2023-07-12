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
import { useState } from 'react';
import classNames from 'classnames';
import './DemoControlPanel.scss';
export var DemoControlPanel = function (_a) {
    var children = _a.children;
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var className = classNames('demo', 'control-panel', { open: isOpen }, { closed: !isOpen });
    var toggleOpen = function () { return setIsOpen(!isOpen); };
    return (_jsxs("div", __assign({ className: className }, { children: [_jsx("button", __assign({ className: "panel key", onClick: toggleOpen }, { children: "Controls " })), _jsx("div", __assign({ className: "panel controls" }, { children: children }))] })));
};
