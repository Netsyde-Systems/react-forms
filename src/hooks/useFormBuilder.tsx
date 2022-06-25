import React from 'react'
import { SelectOption } from '../inputs/inputs'
import FormTests from '../pages/FormTests'

export interface FieldDefinition<FormT, FieldT> {
	id?: string
	label?: string
	onChange?: (field: FieldT, form: FormT) => FormT
	isRequired?: (field: FieldT, form: FormT) => boolean
	errorMessage?: (field: FieldT, form: FormT) => string
	isDisabled?: (field: FieldT, form: FormT) => boolean
	selectOptions?: (field: FieldT, form: FormT) => FieldT extends string | number ? Array<SelectOption<FieldT>> : never
}

export type FormDefinition<FormT> = {
	[Property in keyof FormT]: FieldDefinition<FormT, FormT[Property]>
}

export type FormState<FormT> = {
	[key in keyof FormT]: {
		value?: FormT[key]
		isTouched: boolean
	}
} 

function createFormState<FormT>(formData: FormT): FormState<FormT> {
	let formState: FormState<FormT> = (Object.keys(formData) as Array<keyof FormT>).reduce((formState, key) => {

		formState[key] = { isTouched: false, value: formData[key] } 

		return formState
	}, {} as FormState<FormT>)

	return formState
}

export class FormBuilder<FormT> {
	constructor(
		private formData: FormT,
		private formDefinition: FormDefinition<FormT>,
		private setFormData: React.Dispatch<React.SetStateAction<FormT>>
	) {

	}

	getFormData(): FormT {
		return this.formData
	}

	isValid(): boolean {
		return false
	}
}

export function useFormBuilder<FormT>(initialFormData: FormT, formDefinition: FormDefinition<FormT>): FormBuilder<FormT> {
	const [formData, setFormData] = React.useState(initialFormData)

	const formBuilder = new FormBuilder(formData, formDefinition, setFormData)

	return formBuilder
}

export default useFormBuilder