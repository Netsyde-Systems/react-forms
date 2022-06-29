import React from 'react'

import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes"

import { TextInput } from '../inputs/TextInput'

// returns the react input, as well as whether or not the field is valid
export function createTextInput<FormT extends { [key: string]: any }>(
	formDefinition: FormDefinition<FormT>, 
	formData: FormT, 
	formState: FormState<FormT>,
	fieldName: string & OnlyKeysOfType<FormT, string>, 
	onChange: (formData: FormT) => void
	) : [JSX.Element, boolean] {

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName]

	// id defaults to fieldname if not provided
	const id = fieldDef?.id || fieldName

	// label is titleized fieldName if not provided
	let label: string = fieldName
	if (typeof fieldDef?.label == 'string') label = fieldDef.label
	else if (typeof fieldDef?.label == 'function') label = fieldDef.label(fieldValue, fieldName, formData)

	// fields aren't required unless they're specified as such with a boolean or a function
	let isRequired = false
	if (typeof fieldDef?.isRequired == 'boolean') isRequired = fieldDef.isRequired
	else if (typeof fieldDef?.isRequired == 'function') isRequired = fieldDef.isRequired(fieldValue, fieldName, formData)

	let errorMessage = fieldDef?.errorMessage?.(fieldValue, fieldName, formData)
	const isDisabled = fieldDef?.isDisabled?.(fieldValue, fieldName, formData)
	const isHidden = fieldDef?.isHidden?.(fieldValue, fieldName, formData)

	let isValid = !errorMessage

	// error message is only shown if 
	// 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
	// 2. Form has been validated (give user feedback only after submit attempt)
	if (fieldDef?.validateImmediately && formState.fieldsTouched[fieldName] || formState.hasBeenValidated) { /* errorMessage already initiated */ }
	else {
		errorMessage = ''
	}

	const handleChange = (newFieldValue: string | null) => {
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

			onChange(formData)
		}
	}

	return [
		<TextInput id={id} label={label} value={formData[fieldName]} onChange={handleChange} disabled={isDisabled} required={isRequired} hidden={isHidden} errorMessage={errorMessage} />, 
		isValid
	]
}
