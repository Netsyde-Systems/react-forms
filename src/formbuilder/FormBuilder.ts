import { ReactElement } from "react"

import TextInput from "../inputs/TextInput"
import NumberInput from "../inputs/NumberInput"
import TextArea from "../inputs/TextArea"
import DateInput from "../inputs/DateInput"
import LocalizedDateInput from "../inputs/LocalizedDateInput"
import CheckBox from "../inputs/CheckBox"
import TextSelect from "../inputs/TextSelect"
import NumberSelect from "../inputs/NumberSelect"
import TextRadio from "../inputs/TextRadio"
import NumberRadio from "../inputs/NumberRadio"
import PostalCode from "../inputs/PostalCode"
import PhoneNumber from "../inputs/PhoneNumber"
import EmailAddress from "../inputs/EmailAddress"
import FileInput from "../inputs/FileInput"
import Currency from "../inputs/Currency"

import { createOptionInput, createStandardInput, ReactFormsInputControl, ReactFormsOptionControl } from "./FormBuilderInputs"
import { ExtractLanguage, FormData, FormDefinition, FormFieldTouchState, FormState, LocalizedString, OnlyKeysOfType } from "./FormBuilderTypes"

export type FieldNameProps<FormT, FieldT> = {
	field: OnlyKeysOfType<FormT, FieldT>
}

export interface SubFormLoopController {
	subFormIndex: number
	deleteInstance: () => void
}

export interface SubFormLoopConstructor<SubFormT, LanguageT extends string | undefined> {
	(builder: FormBuilder<SubFormT, LanguageT>, controller: SubFormLoopController): ReactElement 
}

export interface SubFormPanelController {
	addInstance: () => void
}

export interface SubFormPanelConstructor {
	(controller: SubFormPanelController): ReactElement 
}

// The FormBuilder class links form data to actual form fields that we can render in react.
export class FormBuilder<FormT, LanguageT extends string | undefined = undefined> {

	private _isValid: boolean | undefined 

	constructor(
		private formDefinition: FormDefinition<FormT, LanguageT>,
		public formData: FormData<FormT>,
		public formState: FormState<FormT, LanguageT>,
		private onFormDataUpdate?: (formData: FormData<FormT>) => void, 
		private onFormStateUpdate?: (formState: FormState<FormT, LanguageT>) => void, 
		private subFormIndex?: number, 
		private rootFormData?: FormData<any>
	) {
		this._isValid = undefined
	}

	private updateValidity(isValid: boolean) {
		// form is set to field validity if this is the first control rendered
		if (this._isValid === undefined) this._isValid = isValid
		// otherwise we or it with the validity of all other fields rendered to see if form as a whole is valid
		else this._isValid = this._isValid && isValid
	}

	public setLanguage = (language?: LanguageT) => {
		this.formState = Object.assign({}, this.formState, { language })
		this.onFormStateUpdate?.(this.formState)
	}

	public setReadOnly = (isReadOnly = true) => {
		this.formState = Object.assign({}, this.formState, { isReadOnly })
		this.onFormStateUpdate?.(this.formState)
	}

	public setDisabled = (isDisabled = true) => {
		this.formState = Object.assign({}, this.formState, { isDisabled })
		this.onFormStateUpdate?.(this.formState)
	}

	public setData = (formData: FormData<FormT>, formState?: FormState<FormT, LanguageT>, fieldName?: keyof FormT) => {
		this.formData = formData
		this.formState = formState ?? this.formState

		if (fieldName) this.formState.fieldsTouched[fieldName] = true

		this.onFormDataUpdate?.(this.formData)
		this.onFormStateUpdate?.(this.formState)
	}

	public setField = (fieldName: keyof FormT, fieldValue: FormData<FormT>[typeof fieldName]) => {
		let newFormData = Object.assign({}, this.formData)
		let newFormState = Object.assign({}, this.formState)

		newFormData[fieldName] = fieldValue
		newFormState.fieldsTouched[fieldName] = true

		this.setData(newFormData, newFormState)
	}

	// We've factored out what needs to be done for every control type here
	private linkStandardControl<FieldT>(fieldName: OnlyKeysOfType<FormT, FieldT>, InputControl: ReactFormsInputControl<FieldT>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormData<FormT>) => {
			// can't use setfield, because formData may have been altered by a changehandler
			// this.setField(fieldName, formData[fieldName])
			this.setData(formData, newFormState, fieldName)
		}

		const [inputControl, isValid] = createStandardInput(this.formDefinition.fields || {}, newFormData, newFormState, fieldName, handleChange, InputControl, this.subFormIndex, this.rootFormData)

		this.updateValidity(isValid)

		return inputControl
	}

	private linkOptionControl<FieldT extends string | number>(fieldName: OnlyKeysOfType<FormT, FieldT>, OptionControl: ReactFormsOptionControl<FieldT>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormData<FormT>) => {
			// can't use setfield, because formData may have been altered by a changehandler
			// this.setField(fieldName, formData[fieldName])
			this.setData(formData, newFormState, fieldName)
		}

		const [inputControl, isValid] = createOptionInput(this.formDefinition.fields || {}, newFormData, newFormState, fieldName, handleChange, OptionControl, this.subFormIndex, this.rootFormData)

		this.updateValidity(isValid)

		return inputControl
	}

	public textInput = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, TextInput)
	// TODO: Find out how to get around input losing focus issue
	public TextInputElementTest = (props: FieldNameProps<FormT, string>) => this.linkStandardControl(props.field, TextInput)

	public textArea = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, TextArea)

	public numberInput = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkStandardControl<number>(fieldName, NumberInput)
	
	public dateInput = (fieldName: OnlyKeysOfType<FormT, Date>) => this.linkStandardControl(fieldName, DateInput)

	public localizedDateInput = (fieldName: OnlyKeysOfType<FormT, Date>) => this.linkStandardControl(fieldName, LocalizedDateInput)

	public postalCode = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, PostalCode)

	public phoneNumber = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkStandardControl(fieldName, PhoneNumber)

	public emailAddress = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkStandardControl(fieldName, EmailAddress)

	public currency = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkStandardControl(fieldName, Currency)

	public textSelect = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkOptionControl<string>(fieldName, TextSelect)

	public numberSelect = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkOptionControl<number>(fieldName, NumberSelect)

	public textRadio = (fieldName: OnlyKeysOfType<FormT, string>) => this.linkOptionControl<string>(fieldName, TextRadio)

	public numberRadio = (fieldName: OnlyKeysOfType<FormT, number>) => this.linkOptionControl<number>(fieldName, NumberRadio)

	public checkbox = (fieldName: OnlyKeysOfType<FormT, boolean>) => this.linkStandardControl(fieldName, CheckBox)

	public files = (fieldName: OnlyKeysOfType<FormT, Array<File>>) => this.linkStandardControl(fieldName, FileInput)

	public validate() {
		if (!this.formState.hasBeenValidated) {
			let newFormState = Object.assign({}, this.formState)
			newFormState.hasBeenValidated = true
			this.formState = newFormState
			this.onFormStateUpdate?.(newFormState)
		}
	}

	public subFormLoop<SubFormT>(fieldName: OnlyKeysOfType<FormT, Array<SubFormT>>, subFormConstructor: SubFormLoopConstructor<SubFormT, LanguageT>): Array<ReactElement> {
		const subFormDef = this.formDefinition.subForms![fieldName]!
		const subFormData = (this.formData[fieldName] ?? []) as Array<FormData<SubFormT>>

		const elements = subFormData?.map((subFormDatum, rowIndex) => {
			const fieldsTouched = (this.formState.fieldsTouched[fieldName] ?? []) as Array<FormFieldTouchState<SubFormT>>

			const { hasBeenValidated, language, isDisabled, isReadonly } = this.formState

			const subFormState: FormState<SubFormT, LanguageT> = {
				fieldsTouched: fieldsTouched[rowIndex] ?? {}, 
				hasBeenValidated,
				isDisabled, 
				isReadonly,
				language, 
			}

			const handleFormDataUpdate = (newSubFormDatum: FormData<SubFormT>) => {
				const newSubFormData = subFormData.slice()
				newSubFormData[rowIndex] = newSubFormDatum
				this.setField(fieldName, newSubFormData as any)
			}

			const subFormBuilder = new FormBuilder<SubFormT, LanguageT>(subFormDef.formDefinition, subFormDatum, subFormState, handleFormDataUpdate, undefined, rowIndex, this.formData)

			const subFormController: SubFormLoopController = {
				subFormIndex: rowIndex, 
				deleteInstance: () => {
					const newSubFormData = subFormData.slice()
					newSubFormData.splice(rowIndex, 1)
					this.setField(fieldName, newSubFormData as any)
				},
			}

			return subFormConstructor(subFormBuilder, subFormController) 
		})

		// return elements
		return elements
	}

	public subFormPanel<SubFormT>(fieldName: OnlyKeysOfType<FormT, Array<SubFormT>>, subFormPanelConstructor: SubFormPanelConstructor): ReactElement {

		const subFormController: SubFormPanelController = {
			addInstance: () => {
				const subFormDefinition = this.formDefinition.subForms?.[fieldName]
				const newSubFormData = ((this.formData[fieldName] ?? []) as Array<FormData<SubFormT>>).slice()

				let newSubForm: FormData<SubFormT> = {}
				if (subFormDefinition?.newSubForm) {
					newSubForm = subFormDefinition.newSubForm({ fieldValue: this.formData[fieldName], fieldName, formData: this.formData, formDefinition: this.formDefinition, language: this.formState.language })
				}

				newSubFormData.push(newSubForm)

				this.setField(fieldName, newSubFormData as any)
			},
		}

		return subFormPanelConstructor(subFormController) 
	}

	public get isValid() { return this._isValid }

	public localize<LT extends ExtractLanguage<LanguageT>>(localizedString: LocalizedString<LT>, defaultLocalization?: string): string {
		const { language } = this.formState
		return language ? 
			localizedString[language as LT] : 
			(defaultLocalization ?? '')
	}
}

export default FormBuilder