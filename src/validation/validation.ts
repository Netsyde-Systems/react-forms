import EmailValidator from 'email-validator'
import { getLabel } from '../formbuilder/FormBuilderInputs'
import { FieldSpecifierFunction } from '../formbuilder/FormBuilderTypes'

export type ValidatorFunction<FormT, LanguageT extends string | undefined = undefined> = FieldSpecifierFunction<FormT, Array<string>, LanguageT>

export interface MinMaxValidatorSpecification<T> {
	min?: T
	max?: T
}

export type ValidatorSpecification<FieldT> = FieldT extends string | number | Array<any> ? MinMaxValidatorSpecification<number> : never // | AddOtherSpecifierHere

export const isValidEmail = function (fieldValue?: string) {
	return !!fieldValue && EmailValidator.validate(fieldValue)
}

export const isValueProvided = function (fieldValue?: any) {
	switch (typeof fieldValue) {
		// case 'boolean': return true // booleans are present whether true of false
		case 'boolean': return fieldValue // required booleans now must be true
		case 'number': return true // numbers are present whether 0 (falsy) or numeric (truthy)
		case 'string': return !!fieldValue.trim() // strings are not present when empty or whitespace
		case 'object': return true // objects such as dates and possibly files are present
		default: return false
	}
}

export const requiredFieldValidator: ValidatorFunction<any, any> = function ({ fieldValue, fieldName, formData, formDefinition, language }) {
	const label = getLabel(formDefinition, formData, fieldName.toString(), language)
	return isValueProvided(fieldValue) ? 
		[] : 
		[`${label} is required`]
}

export const emailValidator: ValidatorFunction<any> = function ({ fieldValue }) {
	return isValidEmail(fieldValue) ? [] : ['Invalid email']
}

export function getMinValidator<T>(minValue: T, errorLabel: string): ValidatorFunction<any, any> {
	return function ({ fieldValue }) {
		return fieldValue >= minValue ? [] : [`${errorLabel} must be greater than or equal to ${minValue}`]
	}
}

export function getMaxValidator<T>(maxValue: T, errorLabel: string): ValidatorFunction<any, any> {
	return function ({ fieldValue }) {
		return fieldValue <= maxValue ? [] : [`${errorLabel} must be less than or equal to ${maxValue}`]
	}
}

export function getMinLengthValidator(minLength: number, errorLabel: string): ValidatorFunction<any, any> {
	return function ({ fieldValue }) {
		return (!fieldValue || fieldValue.length >= minLength) ? [] : [`${errorLabel} must be at least ${minLength} characters`]
	}
}

export function getMaxLengthValidator(maxLength: number, errorLabel: string): ValidatorFunction<any, any> {
	return function ({ fieldValue }) {
		return (!fieldValue || fieldValue.length <= maxLength) ? [] : [`${errorLabel} must be at most ${maxLength} characters`]
	}
}
