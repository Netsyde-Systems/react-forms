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
