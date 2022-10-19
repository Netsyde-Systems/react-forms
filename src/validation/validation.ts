import EmailValidator from 'email-validator'
import { FieldSpecifierFunction, FormShape } from '../hooks/FormBuilderTypes'

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

export const requiredFieldValidator: ValidatorFunction<any> = function (fieldValue, fieldName) {
	return isValueProvided(fieldValue) ? 
		[] : 
		[`${fieldName.toString()} is required`]
}

export const emailValidator: ValidatorFunction<any> = function (fieldValue: string) {
	return isValidEmail(fieldValue) ? [] : ['Invalid email']
}

export function getMinValidator<T>(minValue: T): ValidatorFunction<any> {
	return function (fieldValue: T, fieldName) {
		return fieldValue >= minValue ? [] : [`${fieldName.toString()} must be greater than or equal to ${minValue}`]
	}
}

export function getMaxValidator<T>(maxValue: T): ValidatorFunction<any> {
	return function (fieldValue: T, fieldName) {
		return fieldValue <= maxValue ? [] : [`${fieldName.toString()} must be less than or equal to ${maxValue}`]
	}
}

export function getMinLengthValidator(minLength: number): ValidatorFunction<any> {
	return function (fieldValue: string, fieldName, formData) {
		return (!fieldValue || fieldValue.length >= minLength) ? [] : [`${fieldName.toString()} must be at least ${minLength} characters`]
	}
}

export function getMaxLengthValidator(maxLength: number): ValidatorFunction<any> {
	return function (fieldValue: string, fieldName, formData) {
		return (!fieldValue || fieldValue.length <= maxLength) ? [] : [`${fieldName.toString()} must be at most ${maxLength} characters`]
	}
}
