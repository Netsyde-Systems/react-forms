import { FormDefinition, FormFieldState, FormState } from "./FormBuilderTypes"

// initFormFieldState takes form data and maps it to an untouched FormFieldState
export function initFormFieldState<FormT>(formData: FormT): FormFieldState<FormT> {
	let formFieldState: FormFieldState<FormT> = (Object.keys(formData) as Array<keyof FormT>).reduce((formFieldState, key) => {
		formFieldState[key] = { isTouched: false, value: formData[key] } 

		return formFieldState
	}, {} as FormFieldState<FormT>)

	return formFieldState
}

// getFormData essentially inverts the above:  pulls current form field values from the form field state and returns the form data object
function getFormData<FormT>(formFieldState: FormFieldState<FormT>): FormT {
	let formData: FormT = (Object.keys(formFieldState) as Array<keyof FormT>).reduce((formData, key) => {
		formData[key] = formFieldState[key].value

		return formData
	}, {} as FormT)

	return formData
}

// The FormBuilder class links form data to actual form fields that we can render in react.
export class FormBuilder<FormT> {

	constructor(
		private formDefinition: FormDefinition<FormT>,
		private formState: FormState,
		private formFieldState: FormFieldState<FormT>,
		private setFormState: React.Dispatch<React.SetStateAction<FormState>>, 
		private setFormFieldState: React.Dispatch<React.SetStateAction<FormFieldState<FormT>>>, 
	) {
	}

	get formData(): FormT {
		return getFormData(this.formFieldState)
	}

	get isValid(): boolean {
		return false
	}

	validate(): boolean {
		return false
	}
}

export default FormBuilder