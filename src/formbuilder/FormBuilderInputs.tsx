import { convertToSelectOption, FieldSpecifierArgument, FormDefinition, isLocaleLookup, LangSpec, LocaleLookup, LocalizedOption } from './FormBuilderTypes'
import { SelectOption, SelectProps } from '../inputs/inputs'
import { FormState, OnlyKeysOfType, FormData, isLocalizedString, getString } from "./FormBuilderTypes"

import { InputProps } from '../inputs/inputs'
import { NumberSelect } from '../inputs/NumberSelect'
import { TextSelect } from '../inputs/TextSelect'
import { MaskedInput, MaskedInputProps, Mask } from '../inputs/MaskedInput'
import { FileInput, FileInputConfig, FileInputProps } from '../inputs/FileInput'
import { getDefaultMaxLengthValidator, getDefaultMaxValidator, getDefaultMinLengthValidator, getDefaultMinValidator, defaultRequiredFieldValidator, ValidatorFunction, GetValidatorFunction } from '../validation/validation'
import { getUnique } from '../utilities'
import { InputHTMLAttributes } from 'react'

export interface ReactFormsInputControl<FieldType> {
	(inputProps: InputProps<FieldType>): JSX.Element
}

export interface ReactFormsOptionControl<FieldType extends string | number> {
	(selectProps: SelectProps<FieldType>): JSX.Element
}

export function createStandardInput<FormT, FieldType, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, FieldType>,
	onChange: (data: FormData<FormT>) => void, 
	InputControl: ReactFormsInputControl<FieldType>, 
	customInputProps: any,
	subFormName: string | undefined,
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined, 
	controlProps: InputHTMLAttributes<any>,
	externalData: any,
): JSX.Element { 

	let props = getInputProps<FormT, FieldType, LanguageT>(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData)
	props = Object.assign({}, props, customInputProps)
	props.controlProps = Object.assign({}, controlProps)

	return InputControl(props)
}

export function createMaskedInput<FormT, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, string>,
	onChange: (data: FormData<FormT>) => void, 
	subFormName: string | undefined,
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined, 
	mask: Mask,
	controlProps: InputHTMLAttributes<any>,
	externalData: any
): JSX.Element { 

	let props = getInputProps<FormT, string, LanguageT>(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData)
	props.controlProps = controlProps

	const maskedProps: MaskedInputProps = { ...props, ...{ mask } }

	return MaskedInput(maskedProps)
}

export function createFileInput<FormT, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, File[]>,
	onChange: (data: FormData<FormT>) => void, 
	subFormName: string | undefined,
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined, 
	fileInputConfig: FileInputConfig,
	externalData: any,
): JSX.Element { 

	let props = getInputProps<FormT, File[], LanguageT>(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData)

	const fileProps: FileInputProps = { ...props, ...fileInputConfig }

	return FileInput(fileProps)
}

export function createOptionInput<FormT, FieldType extends string | number, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, FieldType>,
	onChange: (formData: FormData<FormT>) => void, 
	OptionControl: ReactFormsOptionControl<FieldType>, 
	subFormName: string | undefined,
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined, 
	controlProps: InputHTMLAttributes<any>, 
	externalData: any
): JSX.Element { 

	const props = getInputProps<FormT, FieldType, LanguageT>(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData)
	props.controlProps = controlProps

	const selectOptions = getSelectOptions<FormT, FieldType, LanguageT>(formDefinition, formData, formState, fieldName, formState.language as LanguageT, externalData)

	return <OptionControl {...props} selectOptions={selectOptions} />
}

export function createTextSelect<FormT, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, string>,
	onChange: (formData: FormData<FormT>) => void,
	language: LanguageT, 
	subFormName: string | undefined,
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined,
	externalData: any
): JSX.Element { 

	const props = getInputProps<FormT, string, LanguageT>(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData)

	const selectOptions = getSelectOptions<FormT, string, LanguageT>(formDefinition, formData, formState, fieldName, language, externalData)

	return <TextSelect {...props} selectOptions={selectOptions} />
}

export function createNumberSelect<FormT, LanguageT extends string | undefined = undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, number>,
	onChange: (formData: FormData<FormT>) => void, 
	language: LanguageT, 
	subFormName: string | undefined,
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined,
	externalData: any
): JSX.Element { 

	const props = getInputProps<FormT, number, LanguageT>(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData)

	const selectOptions = getSelectOptions<FormT, number, LanguageT>(formDefinition, formData, formState, fieldName, language, externalData)

	return <NumberSelect {...props} selectOptions={selectOptions} />
}

export function getLabel<FormT, FieldT, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
	language?: LanguageT
): string { 

	const fieldDefinitions = formDefinition.fields 
	const fieldDef = fieldDefinitions[fieldName]
	const fieldValue = formData[fieldName]

	// label is titleized fieldName if not provided
	let label: string = fieldName.toString()

	if (fieldDef) {
		if (typeof fieldDef.label == 'string') label = fieldDef.label
		else if (typeof language === 'string' && isLocalizedString(fieldDef.label)) label = fieldDef.label[language]
		else if (typeof fieldDef?.label == 'function') {
			const langSpec = fieldDef.label({ fieldValue, fieldName, formData, formState, formDefinition })
			label = getString(langSpec, language) ?? label
		}
	}

	return label
}

export function getInputProps<FormT, FieldT, LanguageT extends string | undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
	onFormChange: (formData: FormData<FormT>) => void, 
	subFormName: string | undefined, 
	subFormIndex: number | undefined, 
	rootFormData: FormData<any> | undefined, 
	externalData: any
): InputProps<FieldT> { 
	const fieldDefinitions = formDefinition.fields 

	const fieldDef = fieldDefinitions[fieldName]
	const fieldValue = formData[fieldName]
	const { language } = formState

	let label = getLabel(formDefinition, formData, formState, fieldName, language)

	function getFieldSpecArgs(): FieldSpecifierArgument<FormT, keyof FormT, LanguageT> {
		return { fieldValue, fieldName, formData, formState, formDefinition, language, subFormIndex, rootFormData, externalData }
	}

	// id defaults to fieldname if not provided
	let id = fieldName.toString()
	if (typeof fieldDef?.id == 'string') id = fieldDef.id
	else if (typeof fieldDef?.id == 'function') id = fieldDef.id(getFieldSpecArgs())

	// fields aren't required unless they're specified as such with a boolean or a function
	let required = false
	if (typeof fieldDef?.isRequired == 'boolean') required = fieldDef.isRequired
	else if (typeof fieldDef?.isRequired == 'function') required = fieldDef.isRequired(getFieldSpecArgs())

	// fields aren't disabled unless they're specified as such with a boolean or a function
	let disabled = false
	if (formState.isDisabled) disabled = true
	else if (typeof fieldDef?.isDisabled == 'boolean') disabled = fieldDef.isDisabled
	else if (typeof fieldDef?.isDisabled == 'function') disabled = fieldDef?.isDisabled?.(getFieldSpecArgs())

	// fields aren't readOnly unless they're specified as such with a boolean or a function
	let readOnly = false
	if (formState.isReadOnly) readOnly = true
	else if (typeof fieldDef?.isReadOnly == 'boolean') readOnly = fieldDef.isReadOnly
	else if (typeof fieldDef?.isReadOnly == 'function') readOnly = fieldDef?.isReadOnly?.(getFieldSpecArgs())

	let placeholder: string | undefined 
	if (typeof fieldDef?.placeholder == 'string') placeholder = fieldDef.placeholder
	else if (typeof language === 'string' && isLocalizedString(fieldDef?.placeholder)) placeholder = fieldDef?.placeholder[language]
	else if (typeof fieldDef?.placeholder == 'function') {
		const langSpec = fieldDef.placeholder(getFieldSpecArgs())
		placeholder = getString(langSpec, language) ?? placeholder
	}

	let locale: Locale | undefined = undefined
	if (language && isLocaleLookup(fieldDef?.locales)) {
		// type hack; only seems to be necessary for babel runtime.  
		// TODO: Investigate
		locale = (fieldDef?.locales as LocaleLookup<any>)[language]
	}

	// let's check for validation messsages
	let externalErrorMap = formState.externalErrorConditions?.[fieldName]
	let externalError = externalErrorMap?.get(fieldValue as any)

	let errors: Array<LangSpec<LanguageT>> = externalError ? [externalError] : []

	if (required) {
		const requiredFieldValidator = fieldDef?.defaultValidators?.requiredFieldValidator ?? formDefinition.defaultValidators?.requiredFieldValidator ?? (defaultRequiredFieldValidator as ValidatorFunction<FormT, LanguageT>)
		// if (requiredMessages.length > 0) errors.push(...requiredMessages)
		errors.push(...requiredFieldValidator(getFieldSpecArgs()))
	}

	if (fieldDef?.validators) {
		// validators can be a single function
		if (typeof fieldDef.validators === 'function') {
			errors.push(...fieldDef.validators?.(getFieldSpecArgs()))
		}
		// or an array of functions
		else if (Array.isArray(fieldDef.validators)) {
			errors.push(...fieldDef.validators.flatMap(err => err(getFieldSpecArgs())))
		}
		// or a simple object specifier (for min/max and possible other things)
		else {
			switch (typeof fieldValue) {
				case 'string': 
					const getMaxLengthValidator = fieldDef?.defaultValidators?.getMaxLengthValidator ?? formDefinition.defaultValidators?.getMaxLengthValidator ?? (getDefaultMaxLengthValidator as GetValidatorFunction<FormT, LanguageT>)
					const getMinLengthValidator = fieldDef?.defaultValidators?.getMinLengthValidator ?? formDefinition.defaultValidators?.getMinLengthValidator ?? (getDefaultMinLengthValidator as GetValidatorFunction<FormT, LanguageT>)

					if (fieldDef.validators.max) errors.push(...getMaxLengthValidator(fieldDef.validators.max, label || ' ')(getFieldSpecArgs()))
					if (fieldDef.validators.min) errors.push(...getMinLengthValidator(fieldDef.validators.min, label || ' ')(getFieldSpecArgs()))
					break
				case 'number': 
					const getMaxValidator = fieldDef?.defaultValidators?.getMaxValidator ?? formDefinition.defaultValidators?.getMaxValidator ?? (getDefaultMaxValidator as GetValidatorFunction<FormT, LanguageT>)
					const getMinValidator = fieldDef?.defaultValidators?.getMinValidator ?? formDefinition.defaultValidators?.getMinValidator ?? (getDefaultMinValidator as GetValidatorFunction<FormT, LanguageT>)


					if (fieldDef.validators.max) errors.push(...getMaxValidator(fieldDef.validators.max, label || ' ')(getFieldSpecArgs()))
					if (fieldDef.validators.min) errors.push(...getMinValidator(fieldDef.validators.min, label || ' ')(getFieldSpecArgs()))
					break
				case undefined: 
					// put in this dummy case to resolve the typing issue with isHidden, below
					// not sure why this works
			}
		}
	}

	let errorCondition: string | undefined = undefined

	if (errors.length > 0) {
		const localizedErrors = errors.map(err => getString(err, language)).filter(err => !!err)
		errorCondition = getUnique(localizedErrors).join(" | ")
	}

	const hidden = fieldDef?.isHidden?.(getFieldSpecArgs())

	// error message is only shown if 
	// 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
	// 2. Form has been validated (give user feedback only after submit attempt)
	let errorMessage = errorCondition
	let hasError = !!errorCondition
	if ((fieldDef?.validateImmediately && formState.fieldsTouched?.[fieldName]) || formState.hasBeenValidated || externalError) { 
		/* errorMessage already initiated at this point */ 
	}
	else {
		errorMessage = undefined
		hasError = false
	}

	const onChange = async (newFieldValue?: FieldT, rawValue?: string) => {
		// some type hacks here... TODO: look into how to do this properly
		const coercedFieldValue = newFieldValue as any

		// first we check if we should even perform the change
		if (typeof fieldDef?.disallowChange === 'object' && coercedFieldValue?.toString().length > fieldDef.disallowChange.maxLength) {
			return // don't perform change because we've exceeded max length
		}
		else if (typeof fieldDef?.disallowChange === 'function' && fieldDef.disallowChange({ fieldValue: coercedFieldValue, rawValue, fieldName, formData, formState, formDefinition, language, subFormIndex, rootFormData, externalData })) {
			return // don't perform change because custom disallow function has told us to
		}
		else {
			formData[fieldName] = coercedFieldValue

			if (fieldDef?.onChange) {
				formData = await fieldDef.onChange({ fieldValue: formData[fieldName], rawValue, fieldName, formData, formState, formDefinition, language, subFormIndex, rootFormData, externalData })
			}

			onFormChange(formData)
		}
	}

	const props: InputProps<FieldT> = { 
		id, 
		value: formData[fieldName] as any as FieldT, 
		label: fieldDef?.collapseLabels ? false : label, 
		placeholder,
		errorMessage: fieldDef?.collapseLabels ? false : errorMessage, 
		hasError, 
		onChange, 
		hidden, 
		disabled, 
		readOnly, 
		required, 
		locale
	}

	formState.fieldErrorConditions ??= {}
	formState.fieldErrorConditions[fieldName] = errorCondition

	/*
	formState.fieldErrorConditions ??= {}
	if (subFormName === undefined) {
		formState.fieldErrorConditions[fieldName] = errorCondition
	}
	else {
		(formState.fieldErrorConditions as any)[subFormName] = errorCondition
	}
	*/

	return props
}


function getSelectOptions<FormT, FieldT extends string | number, LanguageT extends string | undefined = undefined>(
	formDefinition: FormDefinition<FormT, LanguageT>,
	formData: FormData<FormT>,
	formState: FormState<FormT, LanguageT>,
	fieldName: OnlyKeysOfType<FormT, FieldT>,
	language: LanguageT, 
	externalData: any
): Array<SelectOption<FieldT>> { // returns the input props, as well as whether or not the field is valid

	const fieldDef = formDefinition.fields?.[fieldName]
	const fieldValue = formData[fieldName] 

	let localizedOptions: Array<LocalizedOption<FieldT, LanguageT>> = []

	if (fieldDef) {
		if (typeof fieldDef.selectOptions == 'object') {
			// Type HACK.  TODO: investigate
			localizedOptions = fieldDef.selectOptions as any as Array<LocalizedOption<FieldT, LanguageT>>
		}
		else if (typeof fieldDef.selectOptions == 'function') {
			// Type HACK.  TODO: investigate
			localizedOptions = fieldDef.selectOptions({ fieldValue, fieldName, formData, formState, formDefinition, externalData, language }) as any as Array<LocalizedOption<FieldT, LanguageT>>
		}
	}

	return localizedOptions.map(lo => convertToSelectOption(lo, language))
}
