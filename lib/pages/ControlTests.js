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
import { toIsoGmtDateString } from '../utilities';
import Button from '../button/Button';
import { Well } from '../well/Well';
import { TextInput } from '../inputs/TextInput';
import { TextArea } from '../inputs/TextArea';
import { TextSelect } from '../inputs/TextSelect';
import { NumberSelect } from '../inputs/NumberSelect';
import { CheckBox } from '../inputs/CheckBox';
import { NumberInput } from '../inputs/NumberInput';
import { DateInput } from '../inputs/DateInput';
import './ControlTests.scss';
function ControlTests() {
    var _a = React.useState(), locale = _a[0], setLocale = _a[1];
    var _b = React.useState(null), textInputValue = _b[0], setTextInputValue = _b[1];
    var _c = React.useState(null), numberInputValue = _c[0], setNumberInputValue = _c[1];
    var _d = React.useState(null), dateInputValue = _d[0], setDateInputValue = _d[1];
    var _e = React.useState(null), selectTextValue = _e[0], setSelectTextValue = _e[1];
    var _f = React.useState(null), selectNumberValue = _f[0], setSelectNumberValue = _f[1];
    var _g = React.useState(null), checkboxValue = _g[0], setCheckboxValue = _g[1];
    var _h = React.useState(null), textAreaValue = _h[0], setTextAreaValue = _h[1];
    var _j = React.useState(false), controlsHaveErrors = _j[0], setControlErrors = _j[1];
    var _k = React.useState(false), controlsAreDisabled = _k[0], disableControls = _k[1];
    var _l = React.useState(false), controlsAreHidden = _l[0], hideControls = _l[1];
    var _m = React.useState(false), inputsAreRequired = _m[0], makeInputsRequired = _m[1];
    var clearInputs = function () {
        setTextInputValue('');
        setNumberInputValue(null);
        setSelectTextValue(null);
        setSelectNumberValue(null);
        setDateInputValue(null);
        setCheckboxValue(null);
        setTextAreaValue('');
    };
    var toggleButtonText = {
        clear: "Clear Inputs",
        locale: "Toggle Locale (".concat(locale, ")"),
        error: "Toggle Errors",
        hidden: "Toggle Hidden",
        required: "Toggle Required",
        disable: "Toggle Disabled",
    };
    var buttonDefs = [
        { type: 'secondary', text: toggleButtonText.clear, onClick: clearInputs },
        { type: 'secondary', text: toggleButtonText.locale, onClick: function () { return setLocale(locale == 'en-CA' ? 'fr-CA' : 'en-CA'); } },
        { type: 'secondary', text: toggleButtonText.error, onClick: function () { return setControlErrors(!controlsHaveErrors); } },
        { type: 'secondary', text: toggleButtonText.hidden, onClick: function () { return hideControls(!controlsAreHidden); } },
        { type: 'secondary', text: toggleButtonText.disable, onClick: function () { return disableControls(!controlsAreDisabled); } },
        { type: 'secondary', text: toggleButtonText.required, onClick: function () { return makeInputsRequired(!inputsAreRequired); } },
    ];
    var sharedProperties = {
        errorMessage: controlsHaveErrors ? 'There is an Error of some sort' : undefined,
        disabled: controlsAreDisabled,
        required: inputsAreRequired,
        hidden: controlsAreHidden
    };
    var textSelectOptions = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var numberSelectOptions = [
        { value: 1, text: 'Option One' },
        { value: 2, text: 'Option Two' },
        { value: 3, text: 'Option Three' },
    ];
    return (_jsxs("div", __assign({ className: 'control-tests page' }, { children: [_jsx("h1", { children: "Control Tests" }), _jsxs(Well, __assign({ title: "Well Title", buttonDefs: buttonDefs }, { children: [_jsx("p", { children: "Well content" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextInput, __assign({ id: 'txtInput', label: 'Text Input', value: textInputValue, onChange: setTextInputValue, placeholder: "Text Input Placeholder" }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(textInputValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(NumberInput, __assign({ id: 'numInput', label: 'Number Input', value: numberInputValue, onChange: setNumberInputValue, placeholder: "Number Input Placeholder" }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(numberInputValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(DateInput, __assign({ id: 'datInput', label: 'Date Input', value: dateInputValue, onChange: setDateInputValue }, sharedProperties)) })), _jsxs("div", __assign({ className: 'control-cell' }, { children: [nullableValueMessage(dateInputValue), _jsx("br", {}), "ISO GMT DATE: ", toIsoGmtDateString(dateInputValue)] }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextSelect, __assign({ id: 'selTextInput', label: 'Select Text', value: selectTextValue, onChange: setSelectTextValue, placeholder: "Select Text Placeholder", selectOptions: textSelectOptions }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(selectTextValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(NumberSelect, __assign({ id: 'selNumInput', label: 'Select Number', value: selectNumberValue, onChange: setSelectNumberValue, placeholder: "Select Number Placeholder", selectOptions: numberSelectOptions }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(selectNumberValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(CheckBox, __assign({ id: 'chkInput', label: 'Checkbox Input', value: checkboxValue, onChange: setCheckboxValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(checkboxValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextArea, __assign({ id: 'txtAreaInput', label: 'Text Area', value: textAreaValue, onChange: setTextAreaValue, placeholder: "Text Area Placeholder", rows: 5 }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx("pre", { children: nullableValueMessage(textAreaValue) }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(Button, { type: 'secondary', text: 'Secondary Button', onClick: function () { return alert('Secondary Button Clicked'); }, disabled: controlsAreDisabled, hidden: controlsAreHidden }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(Button, { type: 'primary', text: 'Primary Button', onClick: function () { return alert('Primary Button Clicked'); }, disabled: controlsAreDisabled, hidden: controlsAreHidden }) }))] }))] }))] }))] })));
}
function nullableValueMessage(val) {
    var output = "Value: '".concat(val, "' is of type: '").concat(typeof val, ".' ");
    if (val === null)
        output += ' Value is null';
    return output;
}
export default ControlTests;
