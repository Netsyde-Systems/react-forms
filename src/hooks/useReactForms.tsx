import React from 'react'
import { FormShape, FormData, FormDefinition, FormState, initFormState } from './FormBuilderTypes'
import { FormBuilder } from './FormBuilder'

export function useReactForms<FormT extends FormShape>(formDefinition: FormDefinition<FormT>, initialFormData: FormData<FormT>): FormBuilder<FormT> {
	const [formData, setFormData] = React.useState(initialFormData)
	const [formState, setFormState] = React.useState<FormState<FormT>>(initFormState(initialFormData))

	const formBuilder = new FormBuilder(formDefinition, formData, formState, setFormData, setFormState)

	return formBuilder
}

export default useReactForms
