import React from 'react'
import { FormDefinition, FormState } from './FormBuilderTypes'
import { FormBuilder, initFormFieldState } from './FormBuilder'

export function useFormBuilder<FormT>(formDefinition: FormDefinition<FormT>, initialFormData: FormT): FormBuilder<FormT> {
	const [formState, setFormState] = React.useState<FormState>({ hasBeenValidated: false })
	const [formFieldState, setFormFieldState] = React.useState(initFormFieldState(initialFormData))

	const formBuilder = new FormBuilder(formDefinition, formState, formFieldState, setFormState, setFormFieldState)

	return formBuilder
}

export default useFormBuilder