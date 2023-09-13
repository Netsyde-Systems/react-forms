import EmailValidator from 'email-validator';
import { getLabel } from '../formbuilder/FormBuilderInputs';
export var isValidEmail = function (fieldValue) {
    return !!fieldValue && EmailValidator.validate(fieldValue);
};
export var isValueProvided = function (fieldValue) {
    // special edge case for null, which is typeof 'object'
    if (fieldValue === null)
        return false;
    switch (typeof fieldValue) {
        // case 'boolean': return true // booleans are present whether true of false
        case 'boolean': return fieldValue; // required booleans now must be true
        case 'number': return true; // numbers are present whether 0 (falsy) or numeric (truthy)
        case 'string': return !!fieldValue.trim(); // strings are not present when empty or whitespace
        case 'object': return true; // objects such as dates and possibly files are present
        default: return false;
    }
};
export var defaultRequiredFieldValidator = function (_a) {
    var fieldValue = _a.fieldValue, fieldName = _a.fieldName, formData = _a.formData, formState = _a.formState, formDefinition = _a.formDefinition, language = _a.language;
    var label = getLabel(formDefinition, formData, formState, fieldName.toString(), language);
    return isValueProvided(fieldValue) ?
        [] :
        ["".concat(label, " is required")];
};
export var defaultEmailValidator = function (_a) {
    var fieldValue = _a.fieldValue;
    return isValidEmail(fieldValue) ? [] : ['Invalid email'];
};
export function getDefaultMinValidator(minValue, errorLabel) {
    return function (_a) {
        var fieldValue = _a.fieldValue;
        return fieldValue >= minValue ? [] : ["".concat(errorLabel, " must be greater than or equal to ").concat(minValue)];
    };
}
export function getDefaultMaxValidator(maxValue, errorLabel) {
    return function (_a) {
        var fieldValue = _a.fieldValue;
        return fieldValue <= maxValue ? [] : ["".concat(errorLabel, " must be less than or equal to ").concat(maxValue)];
    };
}
export function getDefaultMinLengthValidator(minLength, errorLabel) {
    return function (_a) {
        var fieldValue = _a.fieldValue;
        return (!fieldValue || fieldValue.length >= minLength) ? [] : ["".concat(errorLabel, " must be at least ").concat(minLength, " characters")];
    };
}
export function getDefaultMaxLengthValidator(maxLength, errorLabel) {
    return function (_a) {
        var fieldValue = _a.fieldValue;
        return (!fieldValue || fieldValue.length <= maxLength) ? [] : ["".concat(errorLabel, " must be at most ").concat(maxLength, " characters")];
    };
}
