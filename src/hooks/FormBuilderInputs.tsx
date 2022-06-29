import React from 'react'

import { iterateObject } from "../utilities"
import { FormDefinition, FormFieldState, FormState, OnlyKeysOfType } from "./FormBuilderTypes"

import { TextInput } from '../inputs/TextInput'
import { isPropertySignature } from 'typescript'

function createTextInput<FormT extends { [key: string]: any }>(formDefinition: FormDefinition<FormT>, formData: FormT, fieldName: string & OnlyKeysOfType<FormT, string>, onChange: (formData: FormT) => void) {

	const fieldDef = formDefinition[fieldName]
	const fieldValue = formData[fieldName]

	if (fieldDef) {

		// const { errorMessage, id, isDisabled, isHidden, isRequired, label, selectOptions, validateImmediately } = fieldDefinition

		// id defaults to fieldname if not provided
		const id = fieldDef.id || fieldName

		// label is titleized fieldName if not provided
		let label: string = fieldName
		if (typeof fieldDef.label == 'string') label = fieldDef.label
		else if (typeof fieldDef.label == 'function') label = fieldDef.label(fieldValue, fieldName, formData)

		// inputs aren't required unless they're specified as such with a boolean or a function
		let isRequired = false
		if (typeof fieldDef.isRequired == 'boolean') isRequired = fieldDef.isRequired
		else if (typeof fieldDef.isRequired == 'function') isRequired = fieldDef.isRequired(fieldValue, fieldName, formData)

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

		return <TextInput id={id} value={formData[fieldName]} onChange={handleChange} />
	}
}
