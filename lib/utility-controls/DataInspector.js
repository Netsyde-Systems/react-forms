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
function stringifyValueReplacer(key, value) {
    if ((value === null || value === void 0 ? void 0 : value.constructor) === File)
        return "".concat(value.name, " | ").concat(convertBytesToKB(value.size), " kB");
    else if (value === undefined)
        return 'undefined';
    else
        return value;
}
export var DataInspector = function (_a) {
    var _b;
    var formBuilder = _a.formBuilder;
    var printableExternalErrors = Object.entries((_b = formBuilder.formState.externalErrorConditions) !== null && _b !== void 0 ? _b : {}).reduce(function (obj, keyValPair) {
        var field = keyValPair[0];
        var map = keyValPair[1];
        var fieldObj = {};
        map === null || map === void 0 ? void 0 : map.forEach(function (fieldErr, fieldVal) {
            fieldObj[fieldVal] = fieldErr;
        });
        obj[field] = fieldObj;
        return obj;
    }, {});
    return (_jsxs("div", __assign({ className: 'data-inspector' }, { children: [_jsxs("div", __assign({ className: 'values' }, { children: [_jsx("strong", { children: "Values" }), _jsx("pre", { children: JSON.stringify(formBuilder.formData, stringifyValueReplacer, 2) })] })), _jsxs("div", __assign({ className: 'types' }, { children: [_jsx("strong", { children: "Types" }), _jsx("pre", { children: JSON.stringify(getTypeMap(formBuilder.formData), null, 2) })] })), _jsxs("div", __assign({ className: 'changes' }, { children: [_jsx("strong", { children: "Changes" }), _jsxs("p", { children: ["Form has Changes: ", (formBuilder.hasChanges).toString()] })] })), _jsxs("div", __assign({ className: 'error-conditions' }, { children: [_jsx("strong", { children: "Error Conditions" }), _jsxs("p", { children: ["Form is Valid: ", (!!formBuilder.isValid).toString()] }), "Field Error Conditions:", _jsx("pre", { children: JSON.stringify(formBuilder.formState.fieldErrorConditions, null, 2) }), _jsxs("p", { children: ["Form has External Errors: ", (!!formBuilder.hasExternalErrors).toString()] }), "External Errors:", _jsx("pre", { children: JSON.stringify(printableExternalErrors, null, 2) })] }))] })));
};
