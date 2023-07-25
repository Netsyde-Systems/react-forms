import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import classNames from 'classnames';
import './DemoControlPanel.scss';
export var DemoControlPanel = function (_a) {
    var children = _a.children;
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var className = classNames('demo', 'control-panel', { open: isOpen }, { closed: !isOpen });
    var toggleOpen = function () { return setIsOpen(!isOpen); };
    return (_jsxs("div", { className: className, children: [_jsx("button", { className: "panel key", onClick: toggleOpen, children: "Controls " }), _jsx("div", { className: "panel controls", children: children })] }));
};
