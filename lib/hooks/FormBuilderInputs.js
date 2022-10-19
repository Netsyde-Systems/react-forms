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
import { NumberSelect } from '../inputs/NumberSelect';
import { TextSelect } from '../inputs/TextSelect';
import { getMaxLengthValidator, getMaxValidator, getMinLengthValidator, getMinValidator, requiredFieldValidator } from '../validation/validation';
import { getUnique } from '../utilities';
export function createStandardInput(formDefinition, formData, formState, fieldName, onChange, InputControl) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    return [
        InputControl(props),
        isValid
    ];
}
export function createOptionInput(formDefinition, formData, formState, fieldName, onChange, OptionControl) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName);
    return [
        _jsx(OptionControl, __assign({}, props, { selectOptions: selectOptions })),
        isValid
    ];
}
export function createTextSelect(formDefinition, formData, formState, fieldName, onChange) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName);
    return [
        _jsx(TextSelect, __assign({}, props, { selectOptions: selectOptions })),
        isValid
    ];
}
export function createNumberSelect(formDefinition, formData, formState, fieldName, onChange) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange), props = _a[0], isValid = _a[1];
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName);
    return [
        _jsx(NumberSelect, __assign({}, props, { selectOptions: selectOptions })),
        isValid
    ];
}
function getInputProps(formDefinition, formData, formState, fieldName, onFormChange) {
    var _a, _b, _c;
    var fieldDef = formDefinition[fieldName];
    var fieldValue = formData[fieldName];
    // id defaults to fieldname if not provided
    var id = (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.id) || fieldName.toString();
    // label is titleized fieldName if not provided
    var label = fieldName.toString();
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.label) == 'string')
        label = fieldDef.label;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.label) == 'function')
        label = fieldDef.label(fieldValue, fieldName, formData, formDefinition);
    // fields aren't required unless they're specified as such with a boolean or a function
    var fieldRequired = false;
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isRequired) == 'boolean')
        fieldRequired = fieldDef.isRequired;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isRequired) == 'function')
        fieldRequired = fieldDef.isRequired(fieldValue, fieldName, formData, formDefinition);
    var errors = [];
    var errorMessage = undefined;
    if (fieldRequired) {
        errors.push.apply(errors, requiredFieldValidator(fieldValue, fieldName, formData, formDefinition));
    }
    if (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validators) {
        if (typeof fieldDef.validators === 'function') {
            errors.push.apply(errors, (_a = fieldDef.validators) === null || _a === void 0 ? void 0 : _a.call(fieldDef, fieldValue, fieldName, formData, formDefinition));
        }
        else if (Array.isArray(fieldDef.validators)) {
            errors.push.apply(errors, fieldDef.validators.flatMap(function (err) { return err(fieldValue, fieldName, formData, formDefinition); }));
        }
        else {
            switch (typeof fieldValue) {
                case 'string':
                    if (fieldDef.validators.max)
                        errors.push.apply(errors, getMaxLengthValidator(fieldDef.validators.max, label)(fieldValue, fieldName, formData, formDefinition));
                    if (fieldDef.validators.min)
                        errors.push.apply(errors, getMinLengthValidator(fieldDef.validators.min, label)(fieldValue, fieldName, formData, formDefinition));
                    break;
                case 'number':
                    if (fieldDef.validators.max)
                        errors.push.apply(errors, getMaxValidator(fieldDef.validators.max, label)(fieldValue, fieldName, formData, formDefinition));
                    if (fieldDef.validators.min)
                        errors.push.apply(errors, getMinValidator(fieldDef.validators.min, label)(fieldValue, fieldName, formData, formDefinition));
                    break;
            }
        }
    }
    if (errors.length > 0)
        errorMessage = getUnique(errors).join(" | ");
    var disabled = (_b = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isDisabled) === null || _b === void 0 ? void 0 : _b.call(fieldDef, fieldValue, fieldName, formData, formDefinition);
    var hidden = (_c = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isHidden) === null || _c === void 0 ? void 0 : _c.call(fieldDef, fieldValue, fieldName, formData, formDefinition);
    var isValid = !errorMessage;
    // error message is only shown if 
    // 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
    // 2. Form has been validated (give user feedback only after submit attempt)
    if (((fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validateImmediately) && formState.fieldsTouched[fieldName]) || formState.hasBeenValidated) { /* errorMessage already initiated */ }
    else {
        errorMessage = undefined;
    }
    var onChange = function (newFieldValue) {
        var _a;
        // some type hacks here... TODO: look into how to do this properly
        var coercedFieldValue = newFieldValue;
        // first we check if we should even perform the change
        if ((_a = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.disallowChange) === null || _a === void 0 ? void 0 : _a.call(fieldDef, coercedFieldValue, fieldName, formData, formDefinition)) {
            return;
        }
        else {
            formData[fieldName] = coercedFieldValue;
            if (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.onChange) {
                formData = fieldDef.onChange(formData[fieldName], fieldName, formData, formDefinition);
            }
            onFormChange(formData);
        }
    };
    var props = { id: id, value: formData[fieldName], label: label, onChange: onChange, errorMessage: errorMessage, hidden: hidden, disabled: disabled, required: fieldRequired };
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
            selectOptions = fieldDef.selectOptions(fieldValue, fieldName, formData, formDefinition);
        }
    }
    return selectOptions;
}
