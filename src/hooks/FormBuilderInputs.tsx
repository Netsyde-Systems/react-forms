import React from 'react'

import { iterateObject } from "../utilities"
import { FormDefinition, FormFieldState, FormState } from "./FormBuilderTypes"

import { TextInput } from '../inputs/TextInput'

function createTextInput<FormT>(formDefinition: FormDefinition<FormT>, formData: FormT, fieldName: keyof FormT & string) {

	if (formDefinition[fieldName]) {

		const { errorMessage, id, isDisabled, isHidden, isRequired, label, onChange, selectOptions, validateImmediately } = formDefinition[fieldName]!

		// id defaults to fieldname if not provided
		const idValue = id || fieldName

		// label is titleized fieldName if not provided
		let labelValue: string = fieldName
		if (typeof label == 'string') labelValue = label
		else if (typeof label == 'function') labelValue = label(formData, formData[fieldName], fieldName)

		let isRequiredValue = false
		if (typeof isRequired == 'boolean') isRequiredValue = isRequired
		else if (typeof isRequired == 'function') isRequiredValue = isRequired(formData, formData[fieldName], fieldName)



	}
}
