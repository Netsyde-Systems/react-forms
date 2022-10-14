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
import { NumberInput } from '../inputs/NumberInput';
import { TextArea } from '../inputs/TextArea';
import { TextSelect } from '../inputs/TextSelect';
import { NumberSelect } from '../inputs/NumberSelect';
import { CheckBox } from '../inputs/CheckBox';
import { TextRadio } from '../inputs/TextRadio';
import { NumberRadio } from '../inputs/NumberRadio';
import { DateInput } from '../inputs/DateInput';
import './ControlTests.scss';
import { MaskedInput } from '../inputs/MaskedInput';
import { PhoneNumber } from '../inputs/PhoneNumber';
import { PostalCode } from '../inputs/PostalCode';
import { EmailInput } from '../inputs/EmailInput';
function ControlTests() {
    var _a = React.useState(), locale = _a[0], setLocale = _a[1];
    var _b = React.useState(), textInputValue = _b[0], setTextInputValue = _b[1];
    var _c = React.useState(), numberInputValue = _c[0], setNumberInputValue = _c[1];
    var _d = React.useState(), dateInputValue = _d[0], setDateInputValue = _d[1];
    var _e = React.useState(), selectTextValue = _e[0], setSelectTextValue = _e[1];
    var _f = React.useState(), selectNumberValue = _f[0], setSelectNumberValue = _f[1];
    var _g = React.useState(), checkboxValue = _g[0], setCheckboxValue = _g[1];
    var _h = React.useState(), RadioValue = _h[0], setRadioValue = _h[1];
    var _j = React.useState(), NumberRadioValue = _j[0], setNumberRadioValue = _j[1];
    var _k = React.useState(), textAreaValue = _k[0], setTextAreaValue = _k[1];
    var _l = React.useState(), textMaskedValue = _l[0], setMaskedValue = _l[1];
    var _m = React.useState(), phoneValue = _m[0], setPhoneValue = _m[1];
    var _o = React.useState(), postalCodeValue = _o[0], setPostalCodeValue = _o[1];
    var _p = React.useState(), emailValue = _p[0], setEmailValue = _p[1];
    var _q = React.useState(false), controlsHaveErrors = _q[0], setControlErrors = _q[1];
    var _r = React.useState(false), controlsAreDisabled = _r[0], disableControls = _r[1];
    var _s = React.useState(false), controlsAreHidden = _s[0], hideControls = _s[1];
    var _t = React.useState(false), inputsAreRequired = _t[0], makeInputsRequired = _t[1];
    var clearInputs = function () {
        setTextInputValue(undefined);
        setNumberInputValue(undefined);
        setSelectTextValue(undefined);
        setSelectNumberValue(undefined);
        setDateInputValue(undefined);
        setCheckboxValue(undefined);
        setRadioValue(undefined);
        setNumberRadioValue(undefined);
        setTextAreaValue(undefined);
        setMaskedValue(undefined);
        setPhoneValue(undefined);
        setPostalCodeValue(undefined);
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
        { type: 'secondary', text: toggleButtonText.locale, onClick: function () { return setLocale(locale === 'en-CA' ? 'fr-CA' : 'en-CA'); } },
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
    return (_jsxs("div", __assign({ className: 'control-tests page' }, { children: [_jsx("h1", { children: "Control Tests" }), _jsxs(Well, __assign({ title: "Well Title", buttonDefs: buttonDefs }, { children: [_jsx("p", { children: "Well content" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextInput, __assign({ id: 'txtInput', label: 'Text Input', value: textInputValue, onChange: setTextInputValue, placeholder: "Text Input Placeholder" }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(textInputValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(NumberInput, __assign({ id: 'numInput', label: 'Number Input', value: numberInputValue, onChange: setNumberInputValue, placeholder: "Number Input Placeholder" }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(numberInputValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextSelect, __assign({ id: 'selTextInput', label: 'Text Select', value: selectTextValue, onChange: setSelectTextValue, placeholder: "Select Text Placeholder", selectOptions: textSelectOptions }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(selectTextValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(NumberSelect, __assign({ id: 'selNumInput', label: 'Number Select', value: selectNumberValue, onChange: setSelectNumberValue, placeholder: "Select Number Placeholder", selectOptions: numberSelectOptions }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(selectNumberValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextRadio, __assign({ id: 'rdInput', label: 'Text Radio', value: RadioValue, onChange: setRadioValue }, sharedProperties, { selectOptions: textSelectOptions })) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(RadioValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(NumberRadio, __assign({ id: 'selNumRadioInput', label: 'Number Radio', value: NumberRadioValue, onChange: setNumberRadioValue, selectOptions: numberSelectOptions }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(NumberRadioValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextArea, __assign({ id: 'txtAreaInput', label: 'Text Area', value: textAreaValue, onChange: setTextAreaValue, placeholder: "Text Area Placeholder", rows: 5 }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(textAreaValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(MaskedInput, __assign({ id: 'txtMaskedInput', label: 'Masked Input (X12)', value: textMaskedValue, onChange: setMaskedValue, mask: 'a00' }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(textMaskedValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(CheckBox, __assign({ id: 'chkInput', label: 'Checkbox Input', value: checkboxValue, onChange: setCheckboxValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(checkboxValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(DateInput, __assign({ id: 'datInput', label: 'Date', value: dateInputValue, onChange: setDateInputValue }, sharedProperties)) })), _jsxs("div", __assign({ className: 'control-cell' }, { children: [nullableValueMessage(dateInputValue), _jsx("br", {}), "ISO GMT DATE: ", toIsoGmtDateString(dateInputValue)] })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(PhoneNumber, __assign({ id: 'txtPhoneNumber', label: 'Phone Number', value: phoneValue, onChange: setPhoneValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(phoneValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(PostalCode, __assign({ id: 'txtPostalCode', label: 'Postal Code', value: postalCodeValue, onChange: setPostalCodeValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(postalCodeValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(EmailInput, __assign({ id: 'txtEmail', label: 'Email', value: emailValue, onChange: setEmailValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(emailValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(Button, { type: 'secondary', text: 'Secondary Button', onClick: function () { return alert('Secondary Button Clicked'); }, disabled: controlsAreDisabled, hidden: controlsAreHidden }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(Button, { type: 'primary', text: 'Primary Button', onClick: function () { return alert('Primary Button Clicked'); }, disabled: controlsAreDisabled, hidden: controlsAreHidden }) }))] }))] }))] }))] })));
}
function nullableValueMessage(val) {
    var output = "Value: '".concat(val, "' is of type: '").concat(typeof val, ".' ");
    if (val === null)
        output += ' Value is null';
    return output;
}
export default ControlTests;
