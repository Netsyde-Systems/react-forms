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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import useReactForms from '../hooks/useReactForms';
import { FormViewSelect, getFormViewState } from '../utility-controls/FormViewSelect';
import { DemoControlPanel } from '../utility-controls/DemoControlPanel';
import FormInspector from '../utility-controls/FormInspector';
import './Forms.scss';
var testFormDefinition = {
    fields: {
        stringProperty: {
            onChange: function (_a) {
                var formData = _a.formData;
                return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        console.log('String changed as expected, cursor should be where expected if changing input in middle');
                        return [2 /*return*/, formData];
                    });
                });
            }
        },
        selectStringProperty: {
            selectOptions: [
                { value: 'First', text: 'First Option' },
                { value: 'Second', text: 'Second Option (Disabled)', disabled: true },
                { value: 'Third', text: 'Third Option' },
            ]
        },
        selectNumberProperty: {
            selectOptions: [
                { value: 1, text: 'First Option' },
                { value: 2, text: 'Second Option (Disabled)', disabled: true },
                { value: 3, text: 'Third Option' },
            ]
        },
        radioStringProperty: {
            selectOptions: [
                { value: 'First', text: 'First Option' },
                { value: 'Second', text: 'Second Option (Disabled)', disabled: true },
                { value: 'Third', text: 'Third Option' },
            ]
        },
        radioNumberProperty: {
            selectOptions: [
                { value: 1, text: 'First Option' },
                { value: 2, text: 'Second Option (Disabled)', disabled: true },
                { value: 3, text: 'Third Option' },
            ]
        },
        filesProperty: {
            label: 'File Input Name is now configurable',
            placeholder: 'As is the "placeholder"',
            onChange: function (_a) {
                var formData = _a.formData;
                return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        console.log('Files changed as expected');
                        return [2 /*return*/, formData];
                    });
                });
            }
        }
    },
};
var now = new Date();
var minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
var maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
export function Forms() {
    var rf = useReactForms(testFormDefinition);
    var RF = rf.ElementBuilder;
    var _a = useState('Edit'), formView = _a[0], setFormView = _a[1];
    useEffect(function () {
        var viewState = getFormViewState(formView);
        rf.setDisabled(viewState.isDisabled);
        rf.setReadOnly(viewState.isReadOnly);
    }, [formView, rf]);
    return (_jsxs(FormInspector, __assign({ formBuilder: rf }, { children: [_jsx(DemoControlPanel, { children: _jsx(FormViewSelect, { currentFormView: formView, onFormViewChange: setFormView }) }), _jsxs("div", __assign({ className: 'forms page' }, { children: [_jsx("h1", { children: "Form Tests" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('stringProperty', { title: 'String Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberInput('numberProperty', { title: 'Number Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.integerInput('integerProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.dateInput('dateProperty', { min: minDate, max: maxDate }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.localizedDateInput('dateProperty', { min: minDate, max: maxDate }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextInput, { field: 'stringProperty', title: 'String Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberInput, { field: 'numberProperty', title: 'Number Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.IntegerInput, { field: 'integerProperty' }) })), _jsxs("div", __assign({ className: 'control-cell' }, { children: ["Note: Fix min/max type colision", _jsx(RF.DateInput, { field: 'dateProperty', title: 'Date Element', min: minDate, max: maxDate })] })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.LocalizedDateInput, { field: 'dateProperty', min: minDate, max: maxDate }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textSelect('selectStringProperty', { title: 'Text Select Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberSelect('selectNumberProperty', { title: 'Number Select Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.checkbox('checkboxProperty', { title: 'Checkbox Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.maskedInput('maskedProperty', '00-0000000') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextSelect, { field: 'selectStringProperty', title: 'Text Select Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberSelect, { field: 'selectNumberProperty', title: 'Number Select Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.CheckBox, { field: 'checkboxProperty', title: 'Checkbox Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.MaskedInput, { field: 'maskedProperty', mask: '0000000-00' }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textRadio('radioStringProperty', { title: 'Text Radio Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberRadio('radioNumberProperty', { title: 'Number Radio Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textArea('longStringProperty', { title: 'Text Area Function', rows: 3 }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextRadio, { field: 'radioStringProperty', title: 'Text Radio Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.NumberRadio, { field: 'radioNumberProperty', title: 'Number Radio Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.TextArea, { field: 'longStringProperty', title: 'Text Area Element', rows: 5 }) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.phoneNumber('phoneNumber', { title: 'Phone Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.postalCode('postalCode', { title: 'Postal Code Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.emailAddress('email', { title: 'Email Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.currency('currency', { title: 'Currency Function' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.readonlyField('Calculated', "number + phone = ".concat((rf.formData.numberProperty || 0) + (rf.formData.phoneNumber || 0))) }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.PhoneNumber, { field: 'phoneNumber', title: 'Phone Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.PostalCode, { field: 'postalCode', title: 'Postal Code Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.EmailAddress, { field: 'email', title: 'Email Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: _jsx(RF.Currency, { field: 'currency', title: 'Currency Element' }) })), _jsx("div", __assign({ className: 'control-cell' }, { children: "Calculated field not yet implemented with element builder.  May require redesign" }))] })), _jsx("div", { children: rf.files('filesProperty', { multiple: true, showFileList: true, maxFileSizeInBytes: { criteria: 25 * Math.pow(1024, 2), onRejected: function (file) { return alert("File ".concat(file.name, " is larger than 25MB")); } } }) }), _jsx("div", { children: _jsx(RF.Files, { field: 'filesProperty', multiple: true, showFileList: true, maxFileSizeInBytes: { criteria: 25 * Math.pow(1024, 2), onRejected: function (file) { return alert("File ".concat(file.name, " is larger than 25MB")); } } }) })] }))] }))] })));
}
export default Forms;
