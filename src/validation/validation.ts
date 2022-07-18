import EmailValidator from 'email-validator'
import { FieldSpecifierFunction } from '../hooks/FormBuilderTypes'

export interface ValidatorFunction<FormT> extends FieldSpecifierFunction<FormT, boolean> { }

export interface ErrorMessageFunction<FormT> extends FieldSpecifierFunction<FormT, string | undefined> { }

export const isValidEmail: ValidatorFunction<any> = function (fieldValue, fieldName, formData) {
	if (!fieldValue) return true // empty string is a valid email (required check is separate)
	else return EmailValidator.validate(fieldValue)
}

export const isValueProvided: ValidatorFunction<any> = function (fieldValue, fieldName, formData) {
	switch (typeof fieldValue) {
		case 'boolean': return true // booleans are present whether true of false
		case 'number': return true // numbers are present whether 0 (falsy) or numeric (truthy)
		case 'string': return !!fieldValue // strings are not present when empty
		default: return false
	}
}

export const requiredFieldError: ErrorMessageFunction<any> = function (fieldValue, fieldName, formData) {
	if (!isValueProvided(fieldValue, fieldName, formData)) return `${fieldName} is required.`
}

export const invalidEmailError: ErrorMessageFunction<any> = function (fieldValue, fieldName, formData) {
	if (!isValidEmail(fieldValue, fieldName, formData)) return `Invalid email.`
}