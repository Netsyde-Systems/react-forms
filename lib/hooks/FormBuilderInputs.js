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
import { jsx as _jsx } from "react/jsx-runtime";
import { TextInput } from '../inputs/TextInput';
import { NumberInput } from '../inputs/NumberInput';
import { DateInput } from '../inputs/DateInput';
import { NumberSelect } from '../inputs/NumberSelect';
import { TextSelect } from '../inputs/TextSelect';
import { CheckBox } from '../inputs/CheckBox';
export function createTextInput(formDefinition, formData, formState, fieldName, onChange) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    return [
        _jsx(TextInput, __assign({}, props)),
        isValid
    ];
}
export function createNumberInput(formDefinition, formData, formState, fieldName, onChange) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    return [
        _jsx(NumberInput, __assign({}, props)),
        isValid
    ];
}
export function createDateInput(formDefinition, formData, formState, fieldName, onChange) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    return [
        _jsx(DateInput, __assign({}, props)),
        isValid
    ];
}
export function createSelectTextInput(formDefinition, formData, formState, fieldName, onChange) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName);
    return [
        _jsx(TextSelect, __assign({}, props, { selectOptions: selectOptions })),
        isValid
    ];
}
export function createSelectNumberInput(formDefinition, formData, formState, fieldName, onChange) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName);
    return [
        _jsx(NumberSelect, __assign({}, props, { selectOptions: selectOptions })),
        isValid
    ];
}
export function createCheckboxInput(formDefinition, formData, formState, fieldName, onChange) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    return [
        _jsx(CheckBox, __assign({}, props)),
        isValid
    ];
}
function getInputProps(formDefinition, formData, formState, fieldName, onFormChange) {
    var _a, _b, _c;
    var fieldDef = formDefinition[fieldName];
    var fieldValue = formData[fieldName];
    // id defaults to fieldname if not provided
    var id = (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.id) || fieldName;
    // label is titleized fieldName if not provided
    var label = fieldName;
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.label) == 'string')
        label = fieldDef.label;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.label) == 'function')
        label = fieldDef.label(fieldValue, fieldName, formData);
    // fields aren't required unless they're specified as such with a boolean or a function
    var required = false;
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isRequired) == 'boolean')
        required = fieldDef.isRequired;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isRequired) == 'function')
        required = fieldDef.isRequired(fieldValue, fieldName, formData);
    var errorMessage = (_a = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.errorMessage) === null || _a === void 0 ? void 0 : _a.call(fieldDef, fieldValue, fieldName, formData);
    var disabled = (_b = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isDisabled) === null || _b === void 0 ? void 0 : _b.call(fieldDef, fieldValue, fieldName, formData);
    var hidden = (_c = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isHidden) === null || _c === void 0 ? void 0 : _c.call(fieldDef, fieldValue, fieldName, formData);
    var isValid = !errorMessage;
    // error message is only shown if 
    // 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
    // 2. Form has been validated (give user feedback only after submit attempt)
    if ((fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validateImmediately) && formState.fieldsTouched[fieldName] || formState.hasBeenValidated) { /* errorMessage already initiated */ }
    else {
        errorMessage = '';
    }
    var onChange = function (newFieldValue) {
        var _a;
        // some type hacks here... TODO: look into how to do this properly
        var coercedFieldValue = newFieldValue;
        // first we check if we should even perform the change
        if ((_a = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.disallowChange) === null || _a === void 0 ? void 0 : _a.call(fieldDef, coercedFieldValue, fieldName, formData)) {
            return;
        }
        else {
            formData[fieldName] = coercedFieldValue;
            if (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.onChange) {
                formData = fieldDef.onChange(formData[fieldName], fieldName, formData);
            }
            onFormChange(formData);
        }
    };
    var props = { id: id, value: formData[fieldName], label: label, onChange: onChange, errorMessage: errorMessage, hidden: hidden, disabled: disabled, required: required };
    return [props, isValid];
}
function getSelectOptions(formDefinition, formData, fieldName) {
    var fieldDef = formDefinition[fieldName];
    var fieldValue = formData[fieldName];
    var selectOptions = [];
    if (fieldDef) {
        if (typeof fieldDef.selectOptions == 'object') {
            selectOptions = fieldDef.selectOptions;
        }
        else if (typeof fieldDef.selectOptions == 'function') {
            selectOptions = fieldDef.selectOptions(fieldValue, fieldName, formData);
        }
    }
    return selectOptions;
}
