import TextInput from "../inputs/TextInput"
import NumberInput from "../inputs/NumberInput"
import TextArea from "../inputs/TextArea"
import DateInput from "../inputs/DateInput"
import CheckBox from "../inputs/CheckBox"
import TextSelect from "../inputs/TextSelect"
import NumberSelect from "../inputs/NumberSelect"
import TextRadio from "../inputs/TextRadio"
import NumberRadio from "../inputs/NumberRadio"
import PostalCode from "../inputs/PostalCode"
import PhoneNumber from "../inputs/PhoneNumber"
import EmailAddress from "../inputs/EmailAddress"

import { createOptionInput, createStandardInput, ReactFormsInputControl, ReactFormsOptionControl } from "./FormBuilderInputs"
import { FormShape, FormData, FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes"

export type FieldNameProps<FormT, FieldT> = {
	field: OnlyKeysOfType<FormT, FieldT>
}

// The FormBuilder class links form data to actual form fields that we can render in react.
export class FormBuilder<FormT extends FormShape> {

	private _isValid: boolean | undefined 

	constructor(
		private formDefinition: FormDefinition<FormT>,
		public formData: FormData<FormT>,
		public formState: FormState<FormT>,
		private setFormData: React.Dispatch<React.SetStateAction<FormData<FormT>>>, 
		private setFormState: React.Dispatch<React.SetStateAction<FormState<FormT>>>, 
	) {
		this._isValid = undefined
	}

	public updateDataAndState(formData: FormData<FormT>, formState: FormState<FormT>) {
		this.formData = formData
		this.formState = formState
	}

	private updateValidity(isValid: boolean) {
		// form is set to field validity if this is the first control rendered
		if (this._isValid === undefined) this._isValid = isValid
		// otherwise we or it with the validity of all other fields rendered to see if form as a whole is valid
		else this._isValid = this._isValid && isValid
	}

	// We've factored out what needs to be done for every control type here
	private linkStandardControl<FieldT>(fieldName: OnlyKeysOfType<FormT, FieldT>, InputControl: ReactFormsInputControl<FieldT>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormData<FormT>) => {
			newFormState.fieldsTouched[fieldName] = true
			this.formData = Object.assign({}, formData)
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createStandardInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange, InputControl)

		this.updateValidity(isValid)

		return inputControl
	}

	private linkOptionControl<FieldT extends string | number>(fieldName: OnlyKeysOfType<FormT, FieldT>, OptionControl: ReactFormsOptionControl<FieldT>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormData<FormT>) => {
			newFormState.fieldsTouched[fieldName] = true
			this.formData = Object.assign({}, formData)
			this.setFormData(formData)
			this.setFormState(newFormState)
		}

		const [inputControl, isValid] = createOptionInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange, OptionControl)

		this.updateValidity(isValid)

		return inputControl
	}

	public textInput = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, TextInput)
	// TODO: Find out how to get around input losing focus issue
	public TextInputElementTest = (props: FieldNameProps<FormT, string>) => this.linkStandardControl(props.field, TextInput)

	public textArea = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, TextArea)

	public numberInput = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkStandardControl<number>(fieldName, NumberInput)
	
	public dateInput = (fieldName: OnlyKeysOfType<FormT, Date>) => this.linkStandardControl(fieldName, DateInput)

	public postalCode = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, PostalCode)

	public phoneNumber = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkStandardControl(fieldName, PhoneNumber)

	public emailAddress = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, EmailAddress)

	public textSelect = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkOptionControl<string>(fieldName, TextSelect)

	public numberSelect = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkOptionControl<number>(fieldName, NumberSelect)

	public textRadio = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkOptionControl<string>(fieldName, TextRadio)

	public numberRadio = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkOptionControl<number>(fieldName, NumberRadio)

	public checkbox = (fieldName: OnlyKeysOfType<FormT, boolean>) => this.linkStandardControl(fieldName, CheckBox)

	public validate() {
		if (!this.formState.hasBeenValidated) {
			let newFormState = Object.assign({}, this.formState)
			newFormState.hasBeenValidated = true
		}
	}

	public get isValid() { return this._isValid }
}

export default FormBuilder