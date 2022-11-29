import React from 'react'

import { convertToSelectOption, isLocaleLookup, LocaleLookup, LocalizedOption } from './FormBuilderTypes'
import { SelectOption, SelectProps } from '../inputs/inputs'
import { FieldDefinitions, FormState, OnlyKeysOfType, FormData, isLocalizedString, getString } from "./FormBuilderTypes"

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
	fieldDefinitions: FieldDefinitions<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldType>,
	onChange: (data: FormData<FormT>) => void, 
	InputControl: ReactFormsInputControl<FieldType>, 
	language: LanguageT, 
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	let [props, isValid] = getInputProps<FormT, FieldType, LanguageT>(fieldDefinitions, formData, formState, fieldName, onChange, language, subFormIndex, rootFormData)

	return [
		InputControl(props),
		isValid
	]
}

export function createOptionInput<FormT, FieldType extends string | number, LanguageT extends string | undefined>(
	formDefinition: FieldDefinitions<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldType>,
	onChange: (formData: FormData<FormT>) => void, 
	OptionControl: ReactFormsOptionControl<FieldType>, 
	language: LanguageT, 
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, FieldType, LanguageT>(formDefinition, formData, formState, fieldName, onChange, language, subFormIndex, rootFormData)

	const selectOptions = getSelectOptions<FormT, FieldType, LanguageT>(formDefinition, formData, fieldName, language)

	return [
		<OptionControl {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function createTextSelect<FormT, LanguageT extends string | undefined>(
	formDefinition: FieldDefinitions<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, string>,
	onChange: (formData: FormData<FormT>) => void,
	language: LanguageT, 
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, string, LanguageT>(formDefinition, formData, formState, fieldName, onChange, language, subFormIndex, rootFormData)

	const selectOptions = getSelectOptions<FormT, string, LanguageT>(formDefinition, formData, fieldName, language)

	return [
		<TextSelect {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function createNumberSelect<FormT, LanguageT extends string | undefined = undefined>(
	formDefinition: FieldDefinitions<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, number>,
	onChange: (formData: FormData<FormT>) => void, 
	language: LanguageT, 
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, number, LanguageT>(formDefinition, formData, formState, fieldName, onChange, language, subFormIndex, rootFormData)

	const selectOptions = getSelectOptions<FormT, number, LanguageT>(formDefinition, formData, fieldName, language)

	return [
		<NumberSelect {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function getLabel<FormT, FieldT, LanguageT extends string | undefined>(
	formDefinition: FieldDefinitions<FormT, LanguageT>,
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
			const langSpec = fieldDef.label({ fieldValue, fieldName, formData, formDefinition })
			label = getString(langSpec, language) ?? label
		}
	}

	return label
}

function getInputProps<FormT, FieldT, LanguageT extends string | undefined>(
	fieldDefinitions: FieldDefinitions<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
	onFormChange: (formData: FormData<FormT>) => void, 
	language: LanguageT, 
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined
): [InputProps<FieldT>, boolean] { // returns the input props, as well as whether or not the field is valid

	const fieldDef = fieldDefinitions[fieldName]
	const fieldValue = formData[fieldName]

	let label = getLabel(fieldDefinitions, formData, fieldName, language)

	// TODO!!! Figure out why it's permitting us to pass FieldDefinitions in place of a FormDefiniton
	const formDefinition = fieldDefinitions

	// id defaults to fieldname if not provided
	let id = fieldName.toString()
	if (typeof fieldDef?.id == 'string') id = fieldDef.id
	else if (typeof fieldDef?.id == 'function') id = fieldDef.id({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData })

	// fields aren't required unless they're specified as such with a boolean or a function
	let required = false
	if (typeof fieldDef?.isRequired == 'boolean') required = fieldDef.isRequired
	else if (typeof fieldDef?.isRequired == 'function') required = fieldDef.isRequired({fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData})

	// fields aren't disabled unless they're specified as such with a boolean or a function
	let disabled = false
	if (typeof fieldDef?.isDisabled == 'boolean') disabled = fieldDef.isDisabled
	else if (typeof fieldDef?.isDisabled == 'function') disabled = fieldDef?.isDisabled?.({fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData})

	let locale: Locale | undefined = undefined
	if (language && isLocaleLookup(fieldDef?.locales)) {
		// type hack; only seems to be necessary for babel runtime.  
		// TODO: Investigate
		locale = (fieldDef?.locales as LocaleLookup<any>)[language]
	}

	// let's check for validation messsages
	let errors: Array<string> = []
	let errorMessage: string | undefined = undefined

	if (required) {
		errors.push(...requiredFieldValidator({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData }))
	}

	if (fieldDef?.validators) {
		// validators can be a single function
		if (typeof fieldDef.validators === 'function') {
			errors.push(...fieldDef.validators?.({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData }))
		}
		// or an array of functions
		else if (Array.isArray(fieldDef.validators)) {
			errors.push(...fieldDef.validators.flatMap(err => err({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData })))
		}
		// or a simple object specifier (for min/max and possible other things)
		else {
			switch (typeof fieldValue) {
				case 'string': 
					if (fieldDef.validators.max) errors.push(...getMaxLengthValidator(fieldDef.validators.max, label || ' ')({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData }))
					if (fieldDef.validators.min) errors.push(...getMinLengthValidator(fieldDef.validators.min, label || ' ')({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData }))
					break
				case 'number': 
					if (fieldDef.validators.max) errors.push(...getMaxValidator(fieldDef.validators.max, label || ' ')({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData }))
					if (fieldDef.validators.min) errors.push(...getMinValidator(fieldDef.validators.min, label || ' ')({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData }))
					break
				case undefined: 
					// put in this dummy case to resolve the typing issue with isHidden, below
					// not sure why this works
			}
		}
	}

	if (errors.length > 0) errorMessage = getUnique(errors).join(" | ")

	const hidden = fieldDef?.isHidden?.({ fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData })

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
		else if (typeof fieldDef?.disallowChange === 'function' && fieldDef.disallowChange({ fieldValue: coercedFieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData })) {
			return // don't perform change because custom disallow function has told us to
		}
		else {
			formData[fieldName] = coercedFieldValue

			if (fieldDef?.onChange) {
				formData = fieldDef.onChange({ fieldValue: formData[fieldName], fieldName, formData, formDefinition, language, subFormIndex, rootFormData })
			}

			onFormChange(formData)
		}
	}

	const props: InputProps<FieldT> = { 
		id, 
		value: formData[fieldName] as any as FieldT, 
		label: fieldDef?.collapseLabels ? false : label, 
		errorMessage: fieldDef?.collapseLabels ? false : errorMessage, 
		onChange, 
		hidden, 
		disabled, 
		required, 
		locale 
	}

	return [props, isValid]
}


function getSelectOptions<FormT, FieldT extends string | number, LanguageT extends string | undefined = undefined>(
	formDefinition: FieldDefinitions<FormT, any>,
	formData: FormData<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
	language: LanguageT
): Array<SelectOption<FieldT>> { // returns the input props, as well as whether or not the field is valid

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName] 

	let localizedOptions: Array<LocalizedOption<FieldT, LanguageT>> = []

	if (fieldDef) {
		if (typeof fieldDef.selectOptions == 'object') {
			// Type HACK.  TODO: investigate
			localizedOptions = fieldDef.selectOptions as any as Array<LocalizedOption<FieldT, LanguageT>>
		}
		else if (typeof fieldDef.selectOptions == 'function') {
			// Type HACK.  TODO: investigate
			localizedOptions = fieldDef.selectOptions({ fieldValue, fieldName, formData, formDefinition }) as any as Array<LocalizedOption<FieldT, LanguageT>>
		}
	}

	return localizedOptions.map(lo => convertToSelectOption(lo, language))
}
