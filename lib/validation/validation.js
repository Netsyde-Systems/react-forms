import EmailValidator from 'email-validator';
// export const isValidEmail: ValidatorFunction<any> = function (fieldValue, fieldName, formData) {
export var isValidEmail = function (fieldValue) {
    if (!fieldValue)
        return true; // empty string is a valid email (required check is separate)
    else
        return EmailValidator.validate(fieldValue);
};
export var isValueProvided = function (fieldValue, fieldName, formData) {
    switch (typeof fieldValue) {
        case 'boolean': return true; // booleans are present whether true of false
        case 'number': return true; // numbers are present whether 0 (falsy) or numeric (truthy)
        case 'string': return !!fieldValue; // strings are not present when empty
        default: return false;
    }
};
export var requiredFieldError = function (fieldValue, fieldName, formData) {
    if (!isValueProvided(fieldValue, fieldName, formData))
        return "".concat(fieldName.toString(), " is required.");
};
// export const invalidEmailError: ErrorMessageFunction<any> = function (fieldValue, fieldName, formData) {
export var invalidEmailError = function (fieldValue) {
    // if (!isValidEmail(fieldValue, fieldName, formData)) return `Invalid email.`
    if (!isValidEmail(fieldValue))
        return "Invalid email.";
};
