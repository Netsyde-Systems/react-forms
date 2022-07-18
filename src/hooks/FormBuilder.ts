import TextInput from "../inputs/TextInput"
import NumberInput from "../inputs/NumberInput"
import TextArea from "../inputs/TextArea"
import DateInput from "../inputs/DateInput"
import CheckBox from "../inputs/CheckBox"
import TextSelect from "../inputs/TextSelect"
import NumberSelect from "../inputs/NumberSelect"
import PostalCode from "../inputs/PostalCode"
import PhoneNumber from "../inputs/PhoneNumber"
import { createOptionInput, createStandardInput, ReactFormsInputControl, ReactFormsOptionControl } from "./FormBuilderInputs"
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
	private linkStandardControl<FieldT>(fieldName: string & OnlyKeysOfType<FormT, FieldT>, InputControl: ReactFormsInputControl<FieldT>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createStandardInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange, InputControl)

		this.updateValidity(isValid)

		return inputControl
	}

	private linkOptionControl<FieldT extends string | number>(fieldName: string & OnlyKeysOfType<FormT, FieldT>, OptionControl: ReactFormsOptionControl<FieldT>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormT) => {
			newFormState.fieldsTouched[fieldName] = true
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createOptionInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange, OptionControl)

		this.updateValidity(isValid)

		return inputControl
	}

	public textInput = (fieldName: string & OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, TextInput)
	// TODO: Find out how to get around input losing focus issue
	public TextInput = (props: FieldNameProps<FormT, string>) => this.linkStandardControl(props.field, TextInput)

	public textArea = (fieldName: string & OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, TextArea)

	public numberInput = (fieldName: string & OnlyKeysOfType<FormT, number>) => this.linkStandardControl<number>(fieldName, NumberInput)
	
	public dateInput = (fieldName: string & OnlyKeysOfType<FormT, Date>) => this.linkStandardControl(fieldName, DateInput)

	public postalCode = (fieldName: string & OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, PostalCode)

	public phoneNumber = (fieldName: string & OnlyKeysOfType<FormT, number>) => this.linkStandardControl(fieldName, PhoneNumber)

	public textSelect = (fieldName: string & OnlyKeysOfType<FormT, string>) => this.linkOptionControl<string>(fieldName, TextSelect)

	public numberSelect = (fieldName: string & OnlyKeysOfType<FormT, number>) => this.linkOptionControl<number>(fieldName, NumberSelect)

	public checkbox = (fieldName: string & OnlyKeysOfType<FormT, boolean>) => this.linkStandardControl(fieldName, CheckBox)

	public validate() {
		if (!this.formState.hasBeenValidated) {
			let newFormState = Object.assign({}, this.formState)
			newFormState.hasBeenValidated = true
		}
	}

	public get isValid() { return this._isValid }
}

export default FormBuilder