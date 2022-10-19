import EmailValidator from 'email-validator';
export var isValidEmail = function (fieldValue) {
    return !!fieldValue && EmailValidator.validate(fieldValue);
};
export var isValueProvided = function (fieldValue) {
    switch (typeof fieldValue) {
        case 'boolean': return true; // booleans are present whether true of false
        case 'number': return true; // numbers are present whether 0 (falsy) or numeric (truthy)
        case 'string': return !!fieldValue; // strings are not present when empty
        default: return false;
    }
};
export var requiredFieldValidator = function (fieldValue, fieldName) {
    return isValueProvided(fieldValue) ?
        [] :
        ["".concat(fieldName.toString(), " is required")];
};
export var emailValidator = function (fieldValue) {
    return isValidEmail(fieldValue) ? [] : ['Invalid email'];
};
export function getMinValidator(minValue) {
    return function (fieldValue, fieldName) {
        return fieldValue >= minValue ? [] : ["".concat(fieldName.toString(), " must be greater than or equal to ").concat(minValue)];
    };
}
export function getMaxValidator(maxValue) {
    return function (fieldValue, fieldName) {
        return fieldValue <= maxValue ? [] : ["".concat(fieldName.toString(), " must be less than or equal to ").concat(maxValue)];
    };
}
export function getMinLengthValidator(minLength) {
    return function (fieldValue, fieldName, formData) {
        return (!fieldValue || fieldValue.length >= minLength) ? [] : ["".concat(fieldName.toString(), " must be at least ").concat(minLength, " characters")];
    };
}
export function getMaxLengthValidator(maxLength) {
    return function (fieldValue, fieldName, formData) {
        return (!fieldValue || fieldValue.length <= maxLength) ? [] : ["".concat(fieldName.toString(), " must be at most ").concat(maxLength, " characters")];
    };
}
