import React from 'react'

import { iterateObject } from "../utilities"
import { FormDefinition, FormFieldState, FormState } from "./FormBuilderTypes"

import { TextInput } from '../inputs/TextInput'

function createTextInput<FormT>(formDefinition: FormDefinition<FormT>, fieldName: keyof FormT) {

	if (formDefinition[fieldName]) {

		const { id, label } = formDefinition[fieldName]!

	}
}
