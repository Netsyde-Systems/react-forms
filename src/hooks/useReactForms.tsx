import React, { useRef } from 'react'
import { FormShape, FormData, FormDefinition, FormState, initFormState } from '../formbuilder/FormBuilderTypes'
import { FormBuilder } from '../formbuilder/FormBuilder'

export function useReactForms<FormT extends FormShape>(formDefinition: FormDefinition<FormT>, initialFormData: FormData<FormT> = {}): FormBuilder<FormT> {
	const [formData, setFormData] = React.useState(initialFormData)
	const [formState, setFormState] = React.useState<FormState<FormT>>(initFormState(initialFormData))

	const formBuilderRef = useRef(new FormBuilder(formDefinition, formData, formState, setFormData, setFormState))

	return formBuilderRef.current
}

export default useReactForms
