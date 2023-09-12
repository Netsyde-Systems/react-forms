import EmailValidator from 'email-validator'
import { getLabel } from '../formbuilder/FormBuilderInputs'
import { FieldSpecifierFunction, LangSpec } from '../formbuilder/FormBuilderTypes'

export type ValidatorFunction<FormT, LanguageT extends string | undefined = undefined> = FieldSpecifierFunction<FormT, Array<LangSpec<LanguageT>>, LanguageT>

export type GetValidatorFunction<FormT, LanguageT extends string | undefined = undefined> = (value: any, errorLabel: string) =>  FieldSpecifierFunction<FormT, Array<LangSpec<LanguageT>>, LanguageT>

export interface MinMaxValidatorSpecification<T> {
	min?: T
	max?: T
}

export type ValidatorSpecification<FieldT> = FieldT extends string | number | Array<any> ? MinMaxValidatorSpecification<number> : never // | AddOtherSpecifierHere

export const isValidEmail = function (fieldValue?: string) {
	return !!fieldValue && EmailValidator.validate(fieldValue)
}

export const isValueProvided = function (fieldValue?: any) {
	// special edge case for null, which is typeof 'object'
	if (fieldValue === null) return false

	switch (typeof fieldValue) {
		// case 'boolean': return true // booleans are present whether true of false
		case 'boolean': return fieldValue // required booleans now must be true
		case 'number': return true // numbers are present whether 0 (falsy) or numeric (truthy)
		case 'string': return !!fieldValue.trim() // strings are not present when empty or whitespace
		case 'object': return true // objects such as dates and possibly files are present
		default: return false
	}
}

export const defaultRequiredFieldValidator: ValidatorFunction<any, any> = function ({ fieldValue, fieldName, formData, formState, formDefinition, language }) {
	const label = getLabel(formDefinition, formData, formState, fieldName.toString(), language)
	return isValueProvided(fieldValue) ? 
		[] : 
		[`${label} is required`]
}

export const defaultEmailValidator: ValidatorFunction<any, any> = function ({ fieldValue }) {
	return isValidEmail(fieldValue) ? [] : ['Invalid email']
}

export function getDefaultMinValidator(minValue: any, errorLabel: string): ValidatorFunction<any, any> {
	return function ({ fieldValue }) {
		return fieldValue >= minValue ? [] : [`${errorLabel} must be greater than or equal to ${minValue}`]
	}
}

export function getDefaultMaxValidator(maxValue: any, errorLabel: string): ValidatorFunction<any, any> {
	return function ({ fieldValue }) {
		return fieldValue <= maxValue ? [] : [`${errorLabel} must be less than or equal to ${maxValue}`]
	}
}

export function getDefaultMinLengthValidator(minLength: number, errorLabel: string): ValidatorFunction<any, any> {
	return function ({ fieldValue }) {
		return (!fieldValue || fieldValue.length >= minLength) ? [] : [`${errorLabel} must be at least ${minLength} characters`]
	}
}

export function getDefaultMaxLengthValidator(maxLength: number, errorLabel: string): ValidatorFunction<any, any> {
	return function ({ fieldValue }) {
		return (!fieldValue || fieldValue.length <= maxLength) ? [] : [`${errorLabel} must be at most ${maxLength} characters`]
	}
}

export interface DefaultValidators<FormT, LanguageT extends string | undefined> {
	requiredFieldValidator?: ValidatorFunction<FormT, LanguageT> 
	emailValidator?: ValidatorFunction<FormT, LanguageT> 
	getMinValidator?: {(minValue: Date | number, errorLabel: string): ValidatorFunction<FormT, LanguageT>}
	getMaxValidator?: {(minValue: Date | number, errorLabel: string): ValidatorFunction<FormT, LanguageT>}
	getMinLengthValidator?: {(minLength: number, errorLabel: string): ValidatorFunction<FormT, LanguageT> }
	getMaxLengthValidator?: {(maxLength: number, errorLabel: string): ValidatorFunction<FormT, LanguageT> }
}