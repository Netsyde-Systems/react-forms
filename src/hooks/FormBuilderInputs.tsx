import React from 'react'

import { SelectOption, SelectProps } from '../inputs/inputs'
import { FormDefinition, FormState, OnlyKeysOfType, FormShape, FormData } from "./FormBuilderTypes"

import { InputProps } from '../inputs/inputs'
import { NumberSelect } from '../inputs/NumberSelect'
import { TextSelect } from '../inputs/TextSelect'
import { getMaxLengthValidator, getMaxValidator, getMinLengthValidator, getMinValidator } from '../validation/validation'

export interface ReactFormsInputControl<FieldType> {
	(inputProps: InputProps<FieldType>): JSX.Element
}

export interface ReactFormsOptionControl<FieldType extends string | number> {
	(selectProps: SelectProps<FieldType>): JSX.Element
}

export function createStandardInput<FormT extends FormShape, FieldType>(
	formDefinition: FormDefinition<FormT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldType>,
	onChange: (data: FormData<FormT>) => void, 
	InputControl: ReactFormsInputControl<FieldType>
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	let [props, isValid] = getInputProps<FormT, FieldType>(formDefinition, formData, formState, fieldName, onChange)

	return [
		InputControl(props),
		isValid
	]
}

export function createOptionInput<FormT extends FormShape, FieldType extends string | number>(
	formDefinition: FormDefinition<FormT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldType>,
	onChange: (formData: FormData<FormT>) => void, 
	OptionControl: ReactFormsOptionControl<FieldType>
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, FieldType>(formDefinition, formData, formState, fieldName, onChange)

	const selectOptions = getSelectOptions<FormT, FieldType>(formDefinition, formData, fieldName)

	return [
		<OptionControl {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function createTextSelect<FormT extends FormShape>(
	formDefinition: FormDefinition<FormT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, string>,
	onChange: (formData: FormData<FormT>) => void
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, string>(formDefinition, formData, formState, fieldName, onChange)

	const selectOptions = getSelectOptions<FormT, string>(formDefinition, formData, fieldName)

	return [
		<TextSelect {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

export function createNumberSelect<FormT extends FormShape>(
	formDefinition: FormDefinition<FormT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, number>,
	onChange: (formData: FormData<FormT>) => void
): [JSX.Element, boolean] { // returns the react input, as well as whether or not the field is valid

	const [props, isValid] = getInputProps<FormT, number>(formDefinition, formData, formState, fieldName, onChange)

	const selectOptions = getSelectOptions<FormT, number>(formDefinition, formData, fieldName)

	return [
		<NumberSelect {...props} selectOptions={selectOptions} />, 
		isValid
	]
}

function getInputProps<FormT extends FormShape, FieldT>(
	formDefinition: FormDefinition<FormT>,
	formData: FormData<FormT>,
	formState: FormState<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
	onFormChange: (formData: FormData<FormT>) => void
): [InputProps<FieldT>, boolean] { // returns the input props, as well as whether or not the field is valid

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName]

	// id defaults to fieldname if not provided
	const id = fieldDef?.id || fieldName.toString()

	// label is titleized fieldName if not provided
	let label: string = fieldName.toString()
	if (typeof fieldDef?.label == 'string') label = fieldDef.label
	else if (typeof fieldDef?.label == 'function') label = fieldDef.label(fieldValue, fieldName, formData)

	// fields aren't required unless they're specified as such with a boolean or a function
	let required = false
	if (typeof fieldDef?.isRequired == 'boolean') required = fieldDef.isRequired
	else if (typeof fieldDef?.isRequired == 'function') required = fieldDef.isRequired(fieldValue, fieldName, formData)

	let errors: Array<string> = []
	let errorMessage: string | undefined = undefined

	if (fieldDef?.validators) {
		if (typeof fieldDef.validators === 'function') {
			errors = fieldDef.validators?.(fieldValue, fieldName, formData)
		}
		else if (Array.isArray(fieldDef.validators)) {
			errors = fieldDef.validators.flatMap(err => err(fieldValue, fieldName, formData))
		}
		else {
			switch (typeof fieldValue) {
				case 'string': 
					if (fieldDef.validators.max) errors.concat(getMaxLengthValidator(fieldDef.validators.max)(fieldValue, fieldName, formData))
					if (fieldDef.validators.min) errors.concat(getMinLengthValidator(fieldDef.validators.min)(fieldValue, fieldName, formData))
					break
				case 'number': 
					if (fieldDef.validators.max) errors.concat(getMaxValidator(fieldDef.validators.max)(fieldValue, fieldName, formData))
					if (fieldDef.validators.min) errors.concat(getMinValidator(fieldDef.validators.min)(fieldValue, fieldName, formData))
					break
			}
		}

		if (errors.length > 0) errorMessage = errors.join(" | ")
	}

	const disabled = fieldDef?.isDisabled?.(fieldValue, fieldName, formData)
	const hidden = fieldDef?.isHidden?.(fieldValue, fieldName, formData)

	let isValid = !errorMessage

	// error message is only shown if 
	// 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
	// 2. Form has been validated (give user feedback only after submit attempt)
	if (fieldDef?.validateImmediately && formState.fieldsTouched[fieldName] || formState.hasBeenValidated) { /* errorMessage already initiated */ }
	else {
		errorMessage = undefined
	}

	const onChange = (newFieldValue?: FieldT) => {
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

	const props: InputProps<FieldT> = { id, value: formData[fieldName] as FieldT, label, onChange, errorMessage, hidden, disabled, required }

	return [props, isValid]
}


function getSelectOptions<FormT extends FormShape, FieldT extends string | number>(
	formDefinition: FormDefinition<FormT>,
	formData: FormData<FormT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
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
