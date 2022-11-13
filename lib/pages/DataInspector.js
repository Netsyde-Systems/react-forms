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
import { getTypeMap, convertBytesToKB } from "../utilities";
import './DataInspector.scss';
// custom stringify replacers to allow us to inspect file arrays
function stringifyTypeReplacer(key, value) {
    if (Array.isArray(value) && value.every(function (v) { return v.constructor === File; }))
        return 'file array';
    else
        return value;
}
function stringifyValueReplacer(key, value) {
    if (value.constructor === File)
        return "file: ".concat(value.name, " | size: ").concat(convertBytesToKB(value.size), " kB");
    else
        return value;
}
export var DataInspector = function (_a) {
    var formBuilder = _a.formBuilder;
    return (_jsxs("div", __assign({ className: 'data-inspector' }, { children: [_jsxs("div", __assign({ className: 'values' }, { children: [_jsx("strong", { children: "Values" }), _jsx("pre", { children: JSON.stringify(formBuilder.formData, stringifyValueReplacer, 2) })] })), _jsxs("div", __assign({ className: 'types' }, { children: [_jsx("strong", { children: "Types" }), _jsx("pre", { children: JSON.stringify(getTypeMap(formBuilder.formData), stringifyTypeReplacer, 2) })] }))] })));
};
