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
import { isLocalizedString, getString } from "./FormBuilderTypes";
import { NumberSelect } from '../inputs/NumberSelect';
import { TextSelect } from '../inputs/TextSelect';
import { getMaxLengthValidator, getMaxValidator, getMinLengthValidator, getMinValidator, requiredFieldValidator } from '../validation/validation';
import { getUnique } from '../utilities';
export function createStandardInput(formDefinition, formData, formState, fieldName, onChange, InputControl, language) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange, language), props = _a[0], isValid = _a[1];
    return [
        InputControl(props),
        isValid
    ];
}
export function createOptionInput(formDefinition, formData, formState, fieldName, onChange, OptionControl, language) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange, language), props = _a[0], isValid = _a[1];
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName);
    return [
        _jsx(OptionControl, __assign({}, props, { selectOptions: selectOptions })),
        isValid
    ];
}
export function createTextSelect(formDefinition, formData, formState, fieldName, onChange, language) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange, language), props = _a[0], isValid = _a[1];
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName);
    return [
        _jsx(TextSelect, __assign({}, props, { selectOptions: selectOptions })),
        isValid
    ];
}
export function createNumberSelect(formDefinition, formData, formState, fieldName, onChange, language) {
    var _a = getInputProps(formDefinition, formData, formState, fieldName, onChange, language), props = _a[0], isValid = _a[1];
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName);
    return [
        _jsx(NumberSelect, __assign({}, props, { selectOptions: selectOptions })),
        isValid
    ];
}
function getInputProps(formDefinition, formData, formState, fieldName, onFormChange, language) {
    var _a, _b, _c, _d;
    var fieldDef = formDefinition[fieldName];
    var fieldValue = formData[fieldName];
    // id defaults to fieldname if not provided
    var id = (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.id) || fieldName.toString();
    // label is titleized fieldName if not provided
    var label = fieldName.toString();
    if (fieldDef) {
        if (typeof fieldDef.label == 'string')
            label = fieldDef.label;
        else if (typeof language === 'string' && isLocalizedString(fieldDef.label))
            label = fieldDef.label[language];
        else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.label) == 'function') {
            var langSpec = fieldDef.label(fieldValue, fieldName, formData, formDefinition);
            label = (_a = getString(langSpec, language)) !== null && _a !== void 0 ? _a : label;
        }
    }
    // fields aren't required unless they're specified as such with a boolean or a function
    var required = false;
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isRequired) == 'boolean')
        required = fieldDef.isRequired;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isRequired) == 'function')
        required = fieldDef.isRequired(fieldValue, fieldName, formData, formDefinition);
    // fields aren't disabled unless they're specified as such with a boolean or a function
    var disabled = false;
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isDisabled) == 'boolean')
        disabled = fieldDef.isDisabled;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isDisabled) == 'function')
        disabled = (_b = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isDisabled) === null || _b === void 0 ? void 0 : _b.call(fieldDef, fieldValue, fieldName, formData, formDefinition);
    // let's check for validation messsages
    var errors = [];
    var errorMessage = undefined;
    if (required) {
        errors.push.apply(errors, requiredFieldValidator(fieldValue, fieldName, formData, formDefinition));
    }
    if (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validators) {
        // validators can be a single function
        if (typeof fieldDef.validators === 'function') {
            errors.push.apply(errors, (_c = fieldDef.validators) === null || _c === void 0 ? void 0 : _c.call(fieldDef, fieldValue, fieldName, formData, formDefinition));
        }
        // or an array of functions
        else if (Array.isArray(fieldDef.validators)) {
            errors.push.apply(errors, fieldDef.validators.flatMap(function (err) { return err(fieldValue, fieldName, formData, formDefinition); }));
        }
        // or a simple object specifier (for min/max and possible other things)
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
    var hidden = (_d = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isHidden) === null || _d === void 0 ? void 0 : _d.call(fieldDef, fieldValue, fieldName, formData, formDefinition);
    var isValid = !errorMessage;
    // error message is only shown if 
    // 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
    // 2. Form has been validated (give user feedback only after submit attempt)
    if (((fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validateImmediately) && formState.fieldsTouched[fieldName]) || formState.hasBeenValidated) { /* errorMessage already initiated */ }
    else {
        errorMessage = undefined;
    }
    var onChange = function (newFieldValue) {
        // some type hacks here... TODO: look into how to do this properly
        var coercedFieldValue = newFieldValue;
        // first we check if we should even perform the change
        if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.disallowChange) === 'object' && coercedFieldValue.toString().length > fieldDef.disallowChange.maxLength) {
            return; // don't perform change because we've exceeded max length
        }
        else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.disallowChange) === 'function' && fieldDef.disallowChange(coercedFieldValue, fieldName, formData, formDefinition)) {
            return; // don't perform change because custom disallow function has told us to
        }
        else {
            formData[fieldName] = coercedFieldValue;
            if (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.onChange) {
                formData = fieldDef.onChange(formData[fieldName], fieldName, formData, formDefinition);
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
            selectOptions = fieldDef.selectOptions(fieldValue, fieldName, formData, formDefinition);
        }
    }
    return selectOptions;
}
