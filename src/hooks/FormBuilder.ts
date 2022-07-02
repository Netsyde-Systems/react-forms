import { createCheckboxInput, createDateInput, createNumberInput, createSelectNumberInput, createSelectTextInput, createTextInput } from "./FormBuilderInputs"
import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes"

// The FormBuilder class links form data to actual form fields that we can render in react.
export class FormBuilder<FormT> {

	private _isValid: boolean | undefined 

	constructor(
		private formDefinition: FormDefinition<FormT>,
		public formData: FormT,
		private formState: FormState<FormT>,
		private setFormData: React.Dispatch<React.SetStateAction<FormT>>, 
		private setFormState: React.Dispatch<React.SetStateAction<FormState<FormT>>>, 
	) {
		this._isValid = undefined
	}

	private updateValidity(isValid: boolean) {
		// form is set to field validity if this is the first control rendered
		if (this._isValid === undefined) this._isValid = isValid
		// otherwise we or it with the validity of all other fields rendered to see if form as a whole is valid
		else this._isValid = this._isValid && isValid
	}

	public textInput(fieldName: string & OnlyKeysOfType<FormT, string>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createTextInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange)

		this.updateValidity(isValid)

		return inputControl
	}

	public numberInput(fieldName: string & OnlyKeysOfType<FormT, number>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createNumberInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange)

		this.updateValidity(isValid)

		return inputControl
	}

	public dateInput(fieldName: string & OnlyKeysOfType<FormT, Date>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createDateInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange)

		this.updateValidity(isValid)

		return inputControl
	}

	public selectTextInput(fieldName: string & OnlyKeysOfType<FormT, string>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createSelectTextInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange)

		this.updateValidity(isValid)

		return inputControl
	}

	public selectNumberInput(fieldName: string & OnlyKeysOfType<FormT, number>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createSelectNumberInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange)

		this.updateValidity(isValid)

		return inputControl
	}

	public checkboxInput(fieldName: string & OnlyKeysOfType<FormT, boolean>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createCheckboxInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange)

		this.updateValidity(isValid)

		return inputControl
	}


	public validate() {
		if (!this.formState.hasBeenValidated) {
			let newFormState = Object.assign({}, this.formState)
			newFormState.hasBeenValidated = true
		}
	}

	public get isValid() { return this._isValid }
}

export default FormBuilder