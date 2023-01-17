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
import { Button } from '../inputs/Button';
import { Well } from '../utility-controls/Well';
import { TextInput } from '../inputs/TextInput';
import { NumberInput } from '../inputs/NumberInput';
import { TextArea } from '../inputs/TextArea';
import { TextSelect } from '../inputs/TextSelect';
import { NumberSelect } from '../inputs/NumberSelect';
import { CheckBox } from '../inputs/CheckBox';
import { TextRadio } from '../inputs/TextRadio';
import { NumberRadio } from '../inputs/NumberRadio';
import { DateInput } from '../inputs/DateInput';
import { LocalizedDateInput } from '../inputs/LocalizedDateInput';
import { MaskedInput } from '../inputs/MaskedInput';
import { PhoneNumber } from '../inputs/PhoneNumber';
import { PostalCode } from '../inputs/PostalCode';
import { EmailAddress } from '../inputs/EmailAddress';
import { FileInput } from '../inputs/FileInput';
import './Controls.scss';
import { enCA, frCA } from 'date-fns/locale';
import { dateToIsoGmtShortDateString } from '../utilities';
import Currency from '../inputs/Currency';
var dateLocales = {
    'en-CA': enCA,
    'fr-CA': frCA
};
function Controls() {
    var _a = React.useState('en-CA'), locale = _a[0], setLocale = _a[1];
    var _b = React.useState(), textInputValue = _b[0], setTextInputValue = _b[1];
    var _c = React.useState(), numberInputValue = _c[0], setNumberInputValue = _c[1];
    var _d = React.useState(), dateInputValue = _d[0], setDateInputValue = _d[1];
    var _e = React.useState(), localizedDateInputValue = _e[0], setLocalizedDateInputValue = _e[1];
    var _f = React.useState(), selectTextValue = _f[0], setSelectTextValue = _f[1];
    var _g = React.useState(), selectNumberValue = _g[0], setSelectNumberValue = _g[1];
    var _h = React.useState(), checkboxValue = _h[0], setCheckboxValue = _h[1];
    var _j = React.useState(), RadioValue = _j[0], setRadioValue = _j[1];
    var _k = React.useState(), NumberRadioValue = _k[0], setNumberRadioValue = _k[1];
    var _l = React.useState(), textAreaValue = _l[0], setTextAreaValue = _l[1];
    var _m = React.useState(), textMaskedValue = _m[0], setMaskedValue = _m[1];
    var _o = React.useState(), phoneValue = _o[0], setPhoneValue = _o[1];
    var _p = React.useState(), dollarValue = _p[0], setDollarValue = _p[1];
    var _q = React.useState(), postalCodeValue = _q[0], setPostalCodeValue = _q[1];
    var _r = React.useState(), emailValue = _r[0], setEmailValue = _r[1];
    var _s = React.useState(), fileValue = _s[0], setFileValue = _s[1];
    var _t = React.useState(false), controlsHaveErrors = _t[0], setControlErrors = _t[1];
    var _u = React.useState(false), controlsAreDisabled = _u[0], disableControls = _u[1];
    var _v = React.useState(false), controlsAreHidden = _v[0], hideControls = _v[1];
    var _w = React.useState(false), controlsAreReadOnly = _w[0], makeControlsReadonly = _w[1];
    var _x = React.useState(false), controlsAreRequired = _x[0], makeControlsRequired = _x[1];
    var clearInputs = function () {
        setTextInputValue(undefined);
        setNumberInputValue(undefined);
        setSelectTextValue(undefined);
        setSelectNumberValue(undefined);
        setDateInputValue(undefined);
        setLocalizedDateInputValue(undefined);
        setCheckboxValue(undefined);
        setRadioValue(undefined);
        setNumberRadioValue(undefined);
        setTextAreaValue(undefined);
        setMaskedValue(undefined);
        setPhoneValue(undefined);
        setDollarValue(undefined);
        setPostalCodeValue(undefined);
        setFileValue(undefined);
    };
    var buttonText = {
        clear: "Clear Inputs",
        locale: "Toggle Locale (".concat(locale, ")"),
        error: "Toggle Errors",
        hidden: "Toggle Hidden",
        disable: "Toggle Disabled",
        readonly: "Toggle Readonly",
        required: "Toggle Required",
    };
    var getToggleButtonType = function (toggleValue) { return toggleValue ? 'primary' : 'secondary'; };
    var buttonDefs = [
        { type: 'secondary', text: buttonText.clear, onClick: clearInputs },
        { type: 'secondary', text: buttonText.locale, onClick: function () { return setLocale(locale === 'en-CA' ? 'fr-CA' : 'en-CA'); } },
        { type: getToggleButtonType(controlsHaveErrors), text: buttonText.error, onClick: function () { return setControlErrors(!controlsHaveErrors); } },
        { type: getToggleButtonType(controlsAreHidden), text: buttonText.hidden, onClick: function () { return hideControls(!controlsAreHidden); } },
        { type: getToggleButtonType(controlsAreDisabled), text: buttonText.disable, onClick: function () { return disableControls(!controlsAreDisabled); } },
        { type: getToggleButtonType(controlsAreReadOnly), text: buttonText.readonly, onClick: function () { return makeControlsReadonly(!controlsAreReadOnly); } },
        { type: getToggleButtonType(controlsAreRequired), text: buttonText.required, onClick: function () { return makeControlsRequired(!controlsAreRequired); } },
    ];
    var sharedProperties = {
        errorMessage: controlsHaveErrors ? 'There is an Error of some sort' : undefined,
        disabled: controlsAreDisabled,
        required: controlsAreRequired,
        readOnly: controlsAreReadOnly,
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
    return (_jsxs("div", __assign({ className: 'controls page' }, { children: [_jsx("h1", { children: "Control Tests" }), _jsxs(Well, __assign({ title: "Well Title", buttonDefs: buttonDefs }, { children: [_jsx("p", { children: "Well content" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextInput, __assign({ id: 'txtInput', label: 'Text Input', value: textInputValue, onChange: setTextInputValue, placeholder: "Text Input Placeholder" }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(textInputValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(NumberInput, __assign({ id: 'numInput', label: 'Number Input', value: numberInputValue, onChange: setNumberInputValue, placeholder: "Number Input Placeholder" }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(numberInputValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextSelect, __assign({ id: 'selTextInput', label: 'Text Select', value: selectTextValue, onChange: setSelectTextValue, placeholder: "Select Text Placeholder", selectOptions: textSelectOptions }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(selectTextValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(NumberSelect, __assign({ id: 'selNumInput', label: 'Number Select', value: selectNumberValue, onChange: setSelectNumberValue, placeholder: "Select Number Placeholder", selectOptions: numberSelectOptions }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(selectNumberValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextRadio, __assign({ id: 'rdInput', label: 'Text Radio', value: RadioValue, onChange: setRadioValue }, sharedProperties, { selectOptions: textSelectOptions })) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(RadioValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(NumberRadio, __assign({ id: 'selNumRadioInput', label: 'Number Radio', value: NumberRadioValue, onChange: setNumberRadioValue, selectOptions: numberSelectOptions }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(NumberRadioValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(TextArea, __assign({ id: 'txtAreaInput', label: 'Text Area', value: textAreaValue, onChange: setTextAreaValue, placeholder: "Text Area Placeholder", rows: 5 }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(textAreaValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(FileInput, __assign({ id: 'fileInput', label: 'File Input', value: fileValue, onChange: setFileValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(fileValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(MaskedInput, __assign({ id: 'txtMaskedInput', label: 'Masked Input (X12)', value: textMaskedValue, onChange: setMaskedValue, mask: 'a00' }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(textMaskedValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(CheckBox, __assign({ id: 'chkInput', label: 'Checkbox Input', value: checkboxValue, onChange: setCheckboxValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(checkboxValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(DateInput, __assign({ id: 'datInput', label: 'Date', value: dateInputValue, onChange: setDateInputValue }, sharedProperties)) })), _jsxs("div", __assign({ className: 'control-cell' }, { children: [nullableValueMessage(dateInputValue), _jsx("br", {}), "ISO GMT DATE: ", dateToIsoGmtShortDateString(dateInputValue)] })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(LocalizedDateInput, __assign({ locale: dateLocales[locale], id: 'locDatInput', label: 'Localized Date', value: localizedDateInputValue, onChange: setLocalizedDateInputValue }, sharedProperties)) })), _jsxs("div", __assign({ className: 'control-cell' }, { children: [nullableValueMessage(localizedDateInputValue), _jsx("br", {}), "ISO GMT DATE: ", dateToIsoGmtShortDateString(localizedDateInputValue)] }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(PostalCode, __assign({ id: 'txtPostalCode', label: 'Postal Code', value: postalCodeValue, onChange: setPostalCodeValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(postalCodeValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(EmailAddress, __assign({ id: 'txtEmail', label: 'Email', value: emailValue, onChange: setEmailValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(emailValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(PhoneNumber, __assign({ id: 'txtPhoneNumber', label: 'Phone Number', value: phoneValue, onChange: setPhoneValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(phoneValue) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(Currency, __assign({ id: 'txtCurrency', label: 'Currency', value: dollarValue, onChange: setDollarValue }, sharedProperties)) })), _jsx("div", __assign({ className: 'control-cell' }, { children: nullableValueMessage(dollarValue) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(Button, { type: 'secondary', text: 'Secondary Button', onClick: function () { return alert('Secondary Button Clicked'); }, disabled: controlsAreDisabled, hidden: controlsAreHidden }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(Button, { type: 'primary', text: 'Primary Button', onClick: function () { return alert('Primary Button Clicked'); }, disabled: controlsAreDisabled, hidden: controlsAreHidden }) }))] }))] }))] }))] })));
}
function nullableValueMessage(val) {
    var output = "Value: '".concat(val, "' is of type: '").concat(typeof val, ".' ");
    if (val === null)
        output += ' Value is null';
    return output;
}
export default Controls;
