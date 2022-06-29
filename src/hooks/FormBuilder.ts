import { iterateObject } from "../utilities"
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

function validateFormFieldState<FormT>(formDefinition: FormDefinition<FormT>, formState: FormState, formFieldState: FormFieldState<FormT>): [boolean, FormFieldState<FormT>] {
	let newFormFieldState = Object.assign({}, formFieldState)
	let formIsValid = true

	let formData = getFormData(formFieldState)

	iterateObject(formDefinition, (fieldName, fieldDefinition) => {
		if (fieldDefinition?.errorMessage) {
			let errorMessage = fieldDefinition.errorMessage(formData[fieldName], fieldName, formData)
			formIsValid = formIsValid && !errorMessage

			// we only update error message if we want to update the field immediately, or if the form has already been validated
			if (fieldDefinition.validateImmediately || formState.hasBeenValidated) {
				newFormFieldState[fieldName] = Object.assign({}, newFormFieldState[fieldName])
				newFormFieldState[fieldName].errorMessage = errorMessage
			}
		}
	})

	return [formIsValid, newFormFieldState]
}

// The FormBuilder class links form data to actual form fields that we can render in react.
export class FormBuilder<FormT> {

	constructor(
		private formDefinition: FormDefinition<FormT>,
		private formState: FormState,
		public formFieldState: FormFieldState<FormT>,
		private setFormState: React.Dispatch<React.SetStateAction<FormState>>, 
		private setFormFieldState: React.Dispatch<React.SetStateAction<FormFieldState<FormT>>>, 
	) {
	}

	get formData(): FormT {
		return getFormData(this.formFieldState)
	}

	get isValid(): boolean | undefined {
		return this.formState.isValid
	}

	validate(): boolean {
		const [isValid, newFormFieldState] = validateFormFieldState(this.formDefinition, this.formState, this.formFieldState)
		this.setFormState({hasBeenValidated: true, isValid})
		this.setFormFieldState(newFormFieldState)
		return isValid
	}
}

export default FormBuilder