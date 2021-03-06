import React from 'react'

import { SelectOption, SelectProps } from '../inputs/inputs'
import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes"

import { InputProps } from '../inputs/inputs'
import { NumberSelect } from '../inputs/NumberSelect'
import { TextSelect } from '../inputs/TextSelect'

export interface ReactFormsInputControl<FieldType> {
	(inputProps: InputProps<FieldType>): JSX.Element
}

export interface ReactFormsOptionControl<FieldType extends string | number> {
	(selectProps: SelectProps<FieldType>): JSX.Element
}

export function createStandardInput<FormT extends { [key: string]: any }, FieldType>(
	formDefinition: FormDefinition<FormT>,
	formData: FormT,
	formState: FormState<FormT>,
	fieldName: string & OnlyKeysOfType<FormT, FieldType>,
	onChange: (formData: FormT) => void, 
	InputControl: ReactFormsInputControl<FieldType>
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	let [props, isValid] = getInputProps<FormT, FieldType>(formDefinition, formData, formState, fieldName, onChange)

	return [
		InputControl(props),
		isValid
	]
}

export function createOptionInput<FormT extends { [key: string]: any }, FieldType extends string | number>(
	formDefinition: FormDefinition<FormT>,
	formData: FormT,
	formState: FormState<FormT>,
	fieldName: string & OnlyKeysOfType<FormT, FieldType>,
	onChange: (formData: FormT) => void, 
	OptionControl: ReactFormsOptionControl<FieldType>
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, FieldType>(formDefinition, formData, formState, fieldName, onChange)

	const selectOptions = getSelectOptions<FormT, FieldType>(formDefinition, formData, fieldName)

	return [
		<OptionControl {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function createTextSelect<FormT extends { [key: string]: any }>(
	formDefinition: FormDefinition<FormT>,
	formData: FormT,
	formState: FormState<FormT>,
	fieldName: string & OnlyKeysOfType<FormT, string>,
	onChange: (formData: FormT) => void
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, string>(formDefinition, formData, formState, fieldName, onChange)

	const selectOptions = getSelectOptions<FormT, string>(formDefinition, formData, fieldName)

	return [
		<TextSelect {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function createNumberSelect<FormT extends { [key: string]: any }>(
	formDefinition: FormDefinition<FormT>,
	formData: FormT,
	formState: FormState<FormT>,
	fieldName: string & OnlyKeysOfType<FormT, number>,
	onChange: (formData: FormT) => void
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, number>(formDefinition, formData, formState, fieldName, onChange)

	const selectOptions = getSelectOptions<FormT, number>(formDefinition, formData, fieldName)

	return [
		<NumberSelect {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

function getInputProps<FormT extends { [key: string]: any }, FieldT>(
	formDefinition: FormDefinition<FormT>,
	formData: FormT,
	formState: FormState<FormT>,
	fieldName: string & OnlyKeysOfType<FormT, FieldT>,
	onFormChange: (formData: FormT) => void
): [InputProps<FieldT>, boolean] { // returns the input props, as well as whether or not the field is valid

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName]

	// id defaults to fieldname if not provided
	const id = fieldDef?.id || fieldName

	// label is titleized fieldName if not provided
	let label: string = fieldName
	if (typeof fieldDef?.label == 'string') label = fieldDef.label
	else if (typeof fieldDef?.label == 'function') label = fieldDef.label(fieldValue, fieldName, formData)

	// fields aren't required unless they're specified as such with a boolean or a function
	let required = false
	if (typeof fieldDef?.isRequired == 'boolean') required = fieldDef.isRequired
	else if (typeof fieldDef?.isRequired == 'function') required = fieldDef.isRequired(fieldValue, fieldName, formData)

	let errorMessage = fieldDef?.errorMessage?.(fieldValue, fieldName, formData)
	const disabled = fieldDef?.isDisabled?.(fieldValue, fieldName, formData)
	const hidden = fieldDef?.isHidden?.(fieldValue, fieldName, formData)

	let isValid = !errorMessage

	// error message is only shown if 
	// 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
	// 2. Form has been validated (give user feedback only after submit attempt)
	if (fieldDef?.validateImmediately && formState.fieldsTouched[fieldName] || formState.hasBeenValidated) { /* errorMessage already initiated */ }
	else {
		errorMessage = ''
	}

	const onChange = (newFieldValue: FieldT | null) => {
		// some type hacks here... TODO: look into how to do this properly
		const coercedFieldValue = newFieldValue as any

		// first we check if we should even perform the change
		if (fieldDef?.disallowChange?.(coercedFieldValue, fieldName, formData)) {
			return
		}
		else {
			formData[fieldName] = coercedFieldValue

			if (fieldDef?.onChange) {
				formData = fieldDef.onChange(formData[fieldName], fieldName, formData)
			}

			onFormChange(formData)
		}
	}

	const props: InputProps<FieldT> = { id, value: formData[fieldName], label, onChange, errorMessage, hidden, disabled, required }

	return [props, isValid]
}


function getSelectOptions<FormT extends { [key: string]: any }, FieldT extends string | number>(
	formDefinition: FormDefinition<FormT>,
	formData: FormT,
	fieldName: string & OnlyKeysOfType<FormT, FieldT>,
): Array<SelectOption<FieldT>> { // returns the input props, as well as whether or not the field is valid

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName]

	let selectOptions: Array<SelectOption<FieldT>> = []

	if (fieldDef) {
		if (typeof fieldDef.selectOptions == 'object') {
			selectOptions = fieldDef.selectOptions
		}
		else if (typeof fieldDef.selectOptions == 'function') {
			selectOptions = fieldDef.selectOptions(fieldValue, fieldName, formData)
		}
	}

	return selectOptions
}
