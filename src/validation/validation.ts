import EmailValidator from 'email-validator'
import { FieldSpecifierFunction, FormDefinition, FormShape } from '../hooks/FormBuilderTypes'

export type ValidatorFunction<FormT extends FormShape> = FieldSpecifierFunction<FormT, Array<string>>

export interface MinMaxValidatorSpecification {
	min?: number
	max?: number
}

export type ValidatorSpecification<FieldT> = FieldT extends string | number | Date ? MinMaxValidatorSpecification : never // | AddOtherSpecifierHere

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

function getErrorLabel<FormT extends FormShape>(fieldName: string, formDefinition: FormDefinition<FormT>) {
	const label = formDefinition[fieldName]?.label ?? fieldName
	return label
}



export const requiredFieldValidator: ValidatorFunction<any> = function (fieldValue, fieldName, formData, formDefinition) {
	const label = getErrorLabel(fieldName, formDefinition)
	return isValueProvided(fieldValue) ? 
		[] : 
		[`${label} is required`]
}

export const emailValidator: ValidatorFunction<any> = function (fieldValue: string) {
	return isValidEmail(fieldValue) ? [] : ['Invalid email']
}

export function getMinValidator<T>(minValue: T, errorLabel: string): ValidatorFunction<any> {
	return function (fieldValue: T, fieldName) {
		return fieldValue >= minValue ? [] : [`${errorLabel} must be greater than or equal to ${minValue}`]
	}
}

export function getMaxValidator<T>(maxValue: T, errorLabel: string): ValidatorFunction<any> {
	return function (fieldValue: T, fieldName) {
		return fieldValue <= maxValue ? [] : [`${errorLabel} must be less than or equal to ${maxValue}`]
	}
}

export function getMinLengthValidator(minLength: number, errorLabel: string): ValidatorFunction<any> {
	return function (fieldValue: string, fieldName, formData) {
		return (!fieldValue || fieldValue.length >= minLength) ? [] : [`${errorLabel} must be at least ${minLength} characters`]
	}
}

export function getMaxLengthValidator(maxLength: number, errorLabel: string): ValidatorFunction<any> {
	return function (fieldValue: string, fieldName, formData) {
		return (!fieldValue || fieldValue.length <= maxLength) ? [] : [`${errorLabel} must be at most ${maxLength} characters`]
	}
}
