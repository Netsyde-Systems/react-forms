import EmailValidator from 'email-validator'
import { FieldSpecifierFunction, ValidatorFunction } from '../hooks/FormBuilderTypes'

export const isValidEmail = function (fieldValue?: string) {
	return !!fieldValue && EmailValidator.validate(fieldValue)
}

export const isValueProvided = function (fieldValue?: any) {
	switch (typeof fieldValue) {
		case 'boolean': return true // booleans are present whether true of false
		case 'number': return true // numbers are present whether 0 (falsy) or numeric (truthy)
		case 'string': return !!fieldValue // strings are not present when empty
		default: return false
	}
}

export const requiredFieldValidator: ValidatorFunction<any> = function (fieldValue, fieldName) {
	return isValueProvided(fieldValue) ? 
		[] : 
		[`${fieldName.toString()} is required`]
}

export const emailValidator: ValidatorFunction<any> = function (fieldValue: string) {
	return isValidEmail(fieldValue) ? [] : ['Invalid email']
}