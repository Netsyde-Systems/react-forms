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
import { Button } from '../button/Button';
import './Well.scss';
export function Well(props) {
    return (_jsxs("div", __assign({ className: 'well' }, { children: [WellHeader(props.title), _jsx("div", __assign({ className: 'well-contents' }, { children: props.children })), WellButtons(props.buttonDefs)] })));
}
export default Well;
function WellHeader(title) {
    if (!title)
        return null;
    else
        return (_jsx("div", __assign({ className: 'well-header' }, { children: title })));
}
function WellButtons(buttonDefs) {
    if (!buttonDefs)
        return null;
    else {
        var buttonSections = buttonDefs.map(function (buttonDef, buttonIndex) { return (_jsx("div", __assign({ className: 'well-button-wrapper' }, { children: _jsx(Button, __assign({}, buttonDef)) }), buttonIndex)); });
        return (_jsx("div", __assign({ className: 'well-buttons' }, { children: buttonSections })));
    }
}
