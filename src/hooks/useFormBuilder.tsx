import React from 'react'
import { SelectOption } from '../inputs/inputs'
import FormTests from '../pages/FormTests'

export interface FieldDefinition<FormT, FieldT> {
	id?: string
	label?: string
	onChange?: (field: FieldT, form: FormT) => FormT
	errorMessage?: (field: FieldT, form: FormT) => string
	isDisabled?: (field: FieldT, form: FormT) => string
	selectOptions?: (field: FieldT, form: FormT) => FieldT extends string | number ? Array<SelectOption<FieldT>> : never
}

export type FormDefinition<FormT> = {
	[Property in keyof FormT]: FieldDefinition<FormT, FormT[Property]>
}

export type FormState<FormT> = {
	[Property in keyof FormT]: {
		value: FormT[Property]
		isTouchedOrValidated: boolean
	}
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