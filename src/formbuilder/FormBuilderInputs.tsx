import React from 'react'

import { SelectOption, SelectProps } from '../inputs/inputs'
import { FormDefinition, FormState, OnlyKeysOfType, FormData, isLocalizedString, getString } from "./FormBuilderTypes"

import { InputProps } from '../inputs/inputs'
import { NumberSelect } from '../inputs/NumberSelect'
import { TextSelect } from '../inputs/TextSelect'
import { getMaxLengthValidator, getMaxValidator, getMinLengthValidator, getMinValidator, requiredFieldValidator } from '../validation/validation'
import { getUnique } from '../utilities'

export interface ReactFormsInputControl<FieldType> {
	(inputProps: InputProps<FieldType>): JSX.Element
}

export interface ReactFormsOptionControl<FieldType extends string | number> {
	(selectProps: SelectProps<FieldType>): JSX.Element
}

export function createStandardInput<FormT, FieldType, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldType>,
	onChange: (data: FormData<FormT>) => void, 
	InputControl: ReactFormsInputControl<FieldType>, 
	language?: LanguageT
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	let [props, isValid] = getInputProps<FormT, FieldType, LanguageT>(formDefinition, formData, formState, fieldName, onChange, language)

	return [
		InputControl(props),
		isValid
	]
}

export function createOptionInput<FormT, FieldType extends string | number, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldType>,
	onChange: (formData: FormData<FormT>) => void, 
	OptionControl: ReactFormsOptionControl<FieldType>, 
	language?: LanguageT
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, FieldType, LanguageT>(formDefinition, formData, formState, fieldName, onChange, language)

	const selectOptions = getSelectOptions<FormT, FieldType>(formDefinition, formData, fieldName)

	return [
		<OptionControl {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function createTextSelect<FormT, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, string>,
	onChange: (formData: FormData<FormT>) => void,
	language?: LanguageT
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, string, LanguageT>(formDefinition, formData, formState, fieldName, onChange, language)

	const selectOptions = getSelectOptions<FormT, string>(formDefinition, formData, fieldName)

	return [
		<TextSelect {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function createNumberSelect<FormT, LanguageT extends string | undefined = undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, number>,
	onChange: (formData: FormData<FormT>) => void, 
	language?: LanguageT
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, number, LanguageT>(formDefinition, formData, formState, fieldName, onChange, language)

	const selectOptions = getSelectOptions<FormT, number>(formDefinition, formData, fieldName)

	return [
		<NumberSelect {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function getLabel<FormT, FieldT, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
	language?: LanguageT
): string { 

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName]

	// label is titleized fieldName if not provided
	let label: string = fieldName.toString()

	if (fieldDef) {
		if (typeof fieldDef.label == 'string') label = fieldDef.label
		else if (typeof language === 'string' && isLocalizedString(fieldDef.label)) label = fieldDef.label[language]
		else if (typeof fieldDef?.label == 'function') {
			const langSpec = fieldDef.label(fieldValue, fieldName, formData, formDefinition)
			label = getString(langSpec, language) ?? label
		}
	}

	return label
}

function getInputProps<FormT, FieldT, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
	onFormChange: (formData: FormData<FormT>) => void, 
	language?: LanguageT
): [InputProps<FieldT>, boolean] { // returns the input props, as well as whether or not the field is valid

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName]

	// id defaults to fieldname if not provided
	const id = fieldDef?.id || fieldName.toString()

	let label = getLabel(formDefinition, formData, fieldName, language)

	// fields aren't required unless they're specified as such with a boolean or a function
	let required = false
	if (typeof fieldDef?.isRequired == 'boolean') required = fieldDef.isRequired
	else if (typeof fieldDef?.isRequired == 'function') required = fieldDef.isRequired(fieldValue, fieldName, formData, formDefinition)

	// fields aren't disabled unless they're specified as such with a boolean or a function
	let disabled = false
	if (typeof fieldDef?.isDisabled == 'boolean') disabled = fieldDef.isDisabled
	else if (typeof fieldDef?.isDisabled == 'function') disabled = fieldDef?.isDisabled?.(fieldValue, fieldName, formData, formDefinition)

	// let's check for validation messsages
	let errors: Array<string> = []
	let errorMessage: string | undefined = undefined

	if (required) {
		errors.push(...requiredFieldValidator(fieldValue, fieldName, formData, formDefinition))
	}

	if (fieldDef?.validators) {
		// validators can be a single function
		if (typeof fieldDef.validators === 'function') {
			errors.push(...fieldDef.validators?.(fieldValue, fieldName, formData, formDefinition))
		}
		// or an array of functions
		else if (Array.isArray(fieldDef.validators)) {
			errors.push(...fieldDef.validators.flatMap(err => err(fieldValue, fieldName, formData, formDefinition)))
		}
		// or a simple object specifier (for min/max and possible other things)
		else {
			switch (typeof fieldValue) {
				case 'string': 
					if (fieldDef.validators.max) errors.push(...getMaxLengthValidator(fieldDef.validators.max, label)(fieldValue, fieldName, formData, formDefinition))
					if (fieldDef.validators.min) errors.push(...getMinLengthValidator(fieldDef.validators.min, label)(fieldValue, fieldName, formData, formDefinition))
					break
				case 'number': 
					if (fieldDef.validators.max) errors.push(...getMaxValidator(fieldDef.validators.max, label)(fieldValue, fieldName, formData, formDefinition))
					if (fieldDef.validators.min) errors.push(...getMinValidator(fieldDef.validators.min, label)(fieldValue, fieldName, formData, formDefinition))
					break
				case undefined: 
					// put in this dummy case to resolve the typing issue with isHidden, below
					// not sure why this works
			}
		}
	}

	if (errors.length > 0) errorMessage = getUnique(errors).join(" | ")

	const hidden = fieldDef?.isHidden?.(fieldValue, fieldName, formData, formDefinition)

	let isValid = !errorMessage

	// error message is only shown if 
	// 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
	// 2. Form has been validated (give user feedback only after submit attempt)
	if ((fieldDef?.validateImmediately && formState.fieldsTouched[fieldName]) || formState.hasBeenValidated) { /* errorMessage already initiated */ }
	else {
		errorMessage = undefined
	}

	const onChange = (newFieldValue?: FieldT) => {
		// some type hacks here... TODO: look into how to do this properly
		const coercedFieldValue = newFieldValue as any

		// first we check if we should even perform the change
		if (typeof fieldDef?.disallowChange === 'object' && coercedFieldValue.toString().length > fieldDef.disallowChange.maxLength) {
			return // don't perform change because we've exceeded max length
		}
		else if (typeof fieldDef?.disallowChange === 'function' && fieldDef.disallowChange(coercedFieldValue, fieldName, formData, formDefinition)) {
			return // don't perform change because custom disallow function has told us to
		}
		else {
			formData[fieldName] = coercedFieldValue

			if (fieldDef?.onChange) {
				formData = fieldDef.onChange(formData[fieldName], fieldName, formData, formDefinition)
			}

			onFormChange(formData)
		}
	}

	const props: InputProps<FieldT> = { id, value: formData[fieldName] as any as FieldT, label, onChange, errorMessage, hidden, disabled, required }

	return [props, isValid]
}


function getSelectOptions<FormT, FieldT extends string | number>(
	formDefinition: FormDefinition<FormT, any>,
	formData: FormData<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
): Array<SelectOption<FieldT>> { // returns the input props, as well as whether or not the field is valid

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName] 

	let selectOptions: Array<SelectOption<FieldT>> = []

	if (fieldDef) {
		if (typeof fieldDef.selectOptions == 'object') {
			// Type HACK.  TODO: investigate
			selectOptions = fieldDef.selectOptions as any as Array<SelectOption<FieldT>>
		}
		else if (typeof fieldDef.selectOptions == 'function') {
			// Type HACK.  TODO: investigate
			selectOptions = fieldDef.selectOptions(fieldValue, fieldName, formData, formDefinition) as any as Array<SelectOption<FieldT>>
		}
	}

	return selectOptions
}
