import { InputHTMLAttributes, ReactElement, SelectHTMLAttributes, TextareaHTMLAttributes } from "react"
import deepEqual from 'deep-equal'
import { AnyMaskedOptions } from 'imask'

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

import { createMaskedInput, createOptionInput, createStandardInput, getInputProps, ReactFormsInputControl, ReactFormsOptionControl } from "./FormBuilderInputs"
import { ExtractLanguage, FieldSpecifierArgument, FormData, FormDefinition, FormFieldErrors, FormFieldMap, FormState, LangSpec, LocalizedString, OnlyKeysOfType, SubFormDefinition } from "./FormBuilderTypes"
import { ElementBuilder } from "./ElementBuilder"
import { ReadonlyField } from "../inputs/ReadonlyField"
import { MinMaxValidatorSpecification } from "../validation/validation"

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

	public ElementBuilder: ElementBuilder<FormT, LanguageT>

	constructor(
		private formDefinition: FormDefinition<FormT, LanguageT>,
		public formData: FormData<FormT>,
		public formState: FormState<FormT, LanguageT>,
		private onFormDataUpdate?: (formData: FormData<FormT>) => void, 
		private onFormStateUpdate?: (formState: FormState<FormT, LanguageT>) => void, 
		private subFormName?: string,
		private subFormIndex?: number, 
		private rootFormData?: FormData<any>, 
		private originalFormData?: FormData<FormT>,

		// quick hack job to support external data.
		// TODO: make this typed in the form definition, and extract type from there
		public externalData?: any
	) {
		this.ElementBuilder = new ElementBuilder(this)

		if (!this.originalFormData) this.originalFormData = structuredClone(formData)

		// do an initial round of getting form props so that any error conditions are found immediately to hydrate validation state
		formDefinition.fields && Object.entries(formDefinition.fields).forEach(([fieldName, fieldDef]) => {
			getInputProps(formDefinition.fields!, formData, formState, fieldName as any, () => null, undefined, undefined, undefined, externalData)
		})

		// TODO: this is ugly; we need to refactor this so that formbuilder is truly recursive
		this.validateSubForms()
	}

	// TODO: this is ugly; we need to refactor this so that formbuilder is truly recursive
	private validateSubForms() {
		const {formDefinition, formData, formState } = this

		formDefinition.subForms && Object.entries(formDefinition.subForms).forEach(([subFormName, subFormDefinition]) => {
			const typedSubFormName = subFormName as keyof FormT
			const typedSubFormDefinition = subFormDefinition as SubFormDefinition<FormT, any, LanguageT>

			const fieldSpecArg: FieldSpecifierArgument<FormT, keyof FormT, LanguageT> = {
				fieldValue: formData[typedSubFormName], 
				fieldName: typedSubFormName,
				formData,
				formDefinition,
				language: formState.language, 
			}

			if (typedSubFormDefinition.validators) {
				const errorConditions = typedSubFormDefinition.validators(fieldSpecArg)
				const errorMessage = errorConditions.join(' | ')
				this.formState.fieldErrorConditions ??= {}
				this.formState.fieldErrorConditions[typedSubFormName] = errorMessage
			}
		})
	}

	// almost never used.  Useful for demos where we want to show variations on a form
	public setFormDefinition = (formDefinition: FormDefinition<FormT, LanguageT>) => {
		this.formDefinition = formDefinition
	}

	public setLanguage = (language?: LanguageT) => {
		if (language !== this.formState.language) {
			this.formState = Object.assign({}, this.formState, { language })
			this.onFormStateUpdate?.(this.formState)
		}
	}

	public setReadOnly = (isReadOnly = true) => {
		if (isReadOnly !== this.formState.isReadonly) {
			this.formState = Object.assign({}, this.formState, { isReadOnly })
			this.onFormStateUpdate?.(this.formState)
		}
	}

	public setDisabled = (isDisabled = true) => {
		if (isDisabled !== this.formState.isDisabled) {
			this.formState = Object.assign({}, this.formState, { isDisabled })
			this.onFormStateUpdate?.(this.formState)
		}
	}

	public setData = (formData: FormData<FormT>, formState?: FormState<FormT, LanguageT>, fieldName?: keyof FormT) => {
		this.formData = formData
		this.formState = formState ?? this.formState

		if (fieldName) {
			this.formState.fieldsTouched ??= {}
			this.formState.fieldsTouched[fieldName] = true
		}

		this.onFormDataUpdate?.(this.formData)
		this.onFormStateUpdate?.(this.formState)
	}

	// quick hack job to support external data.
	// TODO: make this typed in the form definition, and extract type from there
	public setExternalData = (data: any) => {
		this.externalData = data
	}

	public clearExternalErrors = () => {
		this.setExternalErrors({})
	}

	public setExternalErrors = (errors: FormFieldErrors<FormT, LanguageT>) => {
		let newFormState = Object.assign({}, this.formState)
		newFormState.externalErrorConditions = errors
		this.formState = newFormState
		this.onFormStateUpdate?.(newFormState)
	}

	public addExternalError(fieldName: keyof FormT, fieldValue: FormT[typeof fieldName], errorMessage: LangSpec<LanguageT>) {
		let newFormState = Object.assign({}, this.formState)

		newFormState.externalErrorConditions ??= {}
		newFormState.externalErrorConditions[fieldName] ??= new Map()

		newFormState.externalErrorConditions[fieldName]!.set(fieldValue, errorMessage)

		this.formState = newFormState
		this.onFormStateUpdate?.(newFormState)
	}

	public setField = (fieldName: keyof FormT, fieldValue: FormData<FormT>[typeof fieldName]) => {
		let newFormData = Object.assign({}, this.formData)
		let newFormState = Object.assign({}, this.formState)

		newFormData[fieldName] = fieldValue
		newFormState.fieldsTouched ??= {}
		newFormState.fieldsTouched[fieldName] = true

		this.setData(newFormData, newFormState)
	}

	// We've factored out what needs to be done for every control type here
	private linkStandardControl<FieldT>(fieldName: OnlyKeysOfType<FormT, FieldT>, InputControl: ReactFormsInputControl<FieldT>, customInputProps: any, controlProps: InputHTMLAttributes<any>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormData<FormT>) => {
			// can't use setfield, because formData may have been altered by a changehandler
			// this.setField(fieldName, formData[fieldName])
			this.setData(formData, newFormState, fieldName)
		}

		const inputControl = createStandardInput(this.formDefinition.fields || {}, newFormData, newFormState, fieldName, handleChange, InputControl, customInputProps, this.subFormName, this.subFormIndex, this.rootFormData, controlProps ?? {}, this.externalData)

		return inputControl
	}

	private linkOptionControl<FieldT extends string | number>(fieldName: OnlyKeysOfType<FormT, FieldT>, OptionControl: ReactFormsOptionControl<FieldT>, controlProps?: InputHTMLAttributes<any>) {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormData<FormT>) => {
			// can't use setfield, because formData may have been altered by a changehandler
			// this.setField(fieldName, formData[fieldName])
			this.setData(formData, newFormState, fieldName)
		}

		const inputControl = createOptionInput(this.formDefinition.fields || {}, newFormData, newFormState, fieldName, handleChange, OptionControl, this.subFormName, this.subFormIndex, this.rootFormData, controlProps ?? {}, this.externalData)

		return inputControl
	}

	public textInput = (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkStandardControl(fieldName, TextInput, {}, controlProps ?? {})

	public textArea = (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: TextareaHTMLAttributes<HTMLTextAreaElement>) => this.linkStandardControl(fieldName, TextArea, {}, controlProps ?? {})

	public numberInput = (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkStandardControl<number>(fieldName, NumberInput, {}, controlProps ?? {})

	public integerInput = (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => {
		const nonIntegerNumericChars = ['.', 'e', 'E', '+', '-']

		const newControlProps = Object.assign({}, controlProps)

		const { onKeyDown, onPaste } = newControlProps

		newControlProps.onKeyDown ??= (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (nonIntegerNumericChars.includes(e.key)) e.preventDefault()
			onKeyDown?.(e)
		}

		newControlProps.onPaste ??= (e: React.ClipboardEvent<HTMLInputElement>) => {
			const clipBoardText = e.clipboardData.getData('text')
			if (nonIntegerNumericChars.some(ninc => clipBoardText.includes(ninc))) e.preventDefault()
			onPaste?.(e)
		}

		return this.linkStandardControl<number>(fieldName, NumberInput, {}, newControlProps)
	}

	public maskedInput = (fieldName: OnlyKeysOfType<FormT, string>, mask: string | AnyMaskedOptions, controlProps?: InputHTMLAttributes<HTMLInputElement>) => {
		let newFormState = Object.assign({}, this.formState)
		let newFormData = Object.assign({}, this.formData)

		const handleChange = (formData: FormData<FormT>) => {
			// can't use setfield, because formData may have been altered by a changehandler
			// this.setField(fieldName, formData[fieldName])
			this.setData(formData, newFormState, fieldName)
		}

		const inputControl = createMaskedInput(this.formDefinition.fields || {}, newFormData, newFormState, fieldName, handleChange, this.subFormName, this.subFormIndex, this.rootFormData, mask, controlProps ?? {}, this.externalData)

		return inputControl
	}
	
	public dateInput = (fieldName: OnlyKeysOfType<FormT, Date>, minMax?: MinMaxValidatorSpecification<Date>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => {
		return this.linkStandardControl(fieldName, DateInput, minMax, controlProps ?? {})
	}

	// Note: Localized Date Input does not support standard controlProps like the other inputs do (at this time)
	public localizedDateInput = (fieldName: OnlyKeysOfType<FormT, Date>) => this.linkStandardControl(fieldName, LocalizedDateInput, {}, {})

	public postalCode = (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkStandardControl(fieldName, PostalCode, {}, controlProps ?? {})

	public phoneNumber = (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkStandardControl(fieldName, PhoneNumber, {}, controlProps ?? {})

	public emailAddress = (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkStandardControl(fieldName, EmailAddress, {}, controlProps ?? {})

	public currency = (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkStandardControl(fieldName, Currency, {}, controlProps ?? {})

	public textSelect = (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: SelectHTMLAttributes<HTMLSelectElement>) => this.linkOptionControl<string>(fieldName, TextSelect, controlProps)

	public numberSelect = (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: SelectHTMLAttributes<HTMLSelectElement>) => this.linkOptionControl<number>(fieldName, NumberSelect, controlProps)

	public textRadio = (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkOptionControl<string>(fieldName, TextRadio, controlProps)

	public numberRadio = (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkOptionControl<number>(fieldName, NumberRadio, controlProps)

	public checkbox = (fieldName: OnlyKeysOfType<FormT, boolean>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => this.linkStandardControl(fieldName, CheckBox, {}, controlProps ?? {})

	public readonlyField = (label: string, text: string) => ReadonlyField({ label, value: text, id: 'test' })

	// Note: File Input does not support standard controlProps like the other inputs do (at this time)
	public files = (fieldName: OnlyKeysOfType<FormT, Array<File>>) => this.linkStandardControl(fieldName, FileInput, {}, {})

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
			const fieldsTouched = (this.formState.fieldsTouched?.[fieldName] ?? []) as Array<FormFieldMap<SubFormT, boolean>>
			// const fieldErrorConditions = (this.formState.fieldErrorConditions?.[fieldName] ?? []) as Array<FormFieldMap<SubFormT, string>>

			const { hasBeenValidated, language, isDisabled, isReadonly } = this.formState

			const subFormState: FormState<SubFormT, LanguageT> = {
				fieldsTouched: fieldsTouched[rowIndex] ?? {}, 
				// fieldErrorConditions: fieldErrorConditions[rowIndex ?? {}],  
				hasBeenValidated,
				isDisabled, 
				isReadonly,
				language, 
			}

			const handleFormDataUpdate = (newSubFormDatum: FormData<SubFormT>) => {
				const newSubFormData = subFormData.slice()
				newSubFormData[rowIndex] = newSubFormDatum
				this.setField(fieldName, newSubFormData as any)
				this.validateSubForms()
			}

			const subFormBuilder = new FormBuilder<SubFormT, LanguageT>(subFormDef.formDefinition, subFormDatum, subFormState, handleFormDataUpdate, undefined, fieldName?.toString(), rowIndex, this.formData)

			const subFormController: SubFormLoopController = {
				subFormIndex: rowIndex, 
				deleteInstance: () => {
					const newSubFormData = subFormData.slice()
					newSubFormData.splice(rowIndex, 1)
					this.setField(fieldName, newSubFormData as any)
					this.validateSubForms()
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
				this.validateSubForms()
			},
		}

		return subFormPanelConstructor(subFormController) 
	}

	public get isValid() { 
		this.formState.fieldErrorConditions ??= {}

		this.validateSubForms()
		const isValid = !(Object.values(this.formState.fieldErrorConditions) as Array<string>).some(Boolean)
		return isValid
	}

	public get hasChanges(): boolean {
		return !deepEqual(this.formData, this.originalFormData)
	}

	public localize<LT extends ExtractLanguage<LanguageT>>(localizedString: LocalizedString<LT>, defaultLocalization?: string): string {
		const { language } = this.formState
		return language ? 
			localizedString[language as LT] : 
			(defaultLocalization ?? '')
	}
}

export default FormBuilder