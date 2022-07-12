import { createCheckbox, createDateInput, createNumberInput, createNumberSelect, createTextSelect, createTextInput, InputCreationFunction, InputCreationFunction2, createTextInput2 } from "./FormBuilderInputs"
import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes"

export type FieldNameProps<FormT, FieldT> = {
	field: string & OnlyKeysOfType<FormT, FieldT>
}

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

	// We've factored out what needs to be done for every control type here
	private linkControl<FieldT>(fieldName: string & OnlyKeysOfType<FormT, FieldT>, inputCreationFnc: InputCreationFunction<FormT, FieldT>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = inputCreationFnc(this.formDefinition, newFormData, newFormState, fieldName, handleChange)

		this.updateValidity(isValid)

		return inputControl
	}

	public textInput = (fieldName: string & OnlyKeysOfType<FormT, string>) => this.linkControl<string>(fieldName, createTextInput)

	// TODO: Find out how to get around input losing focus issue
	public TextInput = (props: FieldNameProps<FormT, string>) => this.linkControl<string>(props.field, createTextInput)

	public numberInput = (fieldName: string & OnlyKeysOfType<FormT, number>) => this.linkControl<number>(fieldName, createNumberInput)
	
	public dateInput = (fieldName: string & OnlyKeysOfType<FormT, Date>) => this.linkControl<Date>(fieldName, createDateInput)

	public textSelect = (fieldName: string & OnlyKeysOfType<FormT, string>) => this.linkControl<string>(fieldName, createTextSelect)

	public numberSelect = (fieldName: string & OnlyKeysOfType<FormT, number>) => this.linkControl<number>(fieldName, createNumberSelect)

	public checkbox = (fieldName: string & OnlyKeysOfType<FormT, boolean>) => this.linkControl<boolean>(fieldName, createCheckbox)

	public validate() {
		if (!this.formState.hasBeenValidated) {
			let newFormState = Object.assign({}, this.formState)
			newFormState.hasBeenValidated = true
		}
	}

	public get isValid() { return this._isValid }
}

export default FormBuilder