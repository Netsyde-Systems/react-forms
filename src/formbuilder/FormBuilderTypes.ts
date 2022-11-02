import { SelectOption } from '../inputs/inputs'
import { MinMaxValidatorSpecification, ValidatorFunction, ValidatorSpecification } from '../validation/validation'

// From https://stackoverflow.com/questions/63447660/typescript-remove-all-properties-with-particular-type
/*
type ExcludeKeysWithTypeOf<T, V> = {
  [K in keyof T]: Exclude<T[K], undefined> extends V ? never : K 
}[keyof T]
*/

// inspired by the above
export type OnlyKeysOfType<T, V> = {
  [K in keyof T]: Exclude<T[K], undefined> extends V ? K : never
}[keyof T]

// export type OnlyStringKeysOfType<T, V> = OnlyKeysOfType<T, V> & string

/*
export interface FormShape {
	[field: string]: any
}
*/

export type FormData<T> = Partial<T>

// Field specifier functions take as arguments the form data, the field value and name, and returns a value
export interface FieldSpecifierFunction<FormT, OutputT, LanguageT extends string | undefined = undefined> {
	(fieldValue: FormData<FormT>[typeof fieldName] | undefined, fieldName: keyof FormT, formData: FormData<FormT>, formDefinition: FormDefinition<FormT, LanguageT>, language?: LanguageT): OutputT
}

// Select Options Specifier can be static list of select options, or can depend on state of form
export type SelectOptionsSpecifier<FormT, FieldT extends string | number> =
 	Array<SelectOption<FieldT>> | 
	FieldSpecifierFunction<FormT, Array<SelectOption<FieldT>>>

export interface MaxLengthDisallowSpecification {
	maxLength: number
}

export type DisallowSpecification<FieldT> = FieldT extends string | number ? MaxLengthDisallowSpecification : never // | AddOtherSpecifierHere

export type LocalizedString<LanguageT extends string> = {
	[lang in LanguageT]: string
}

export type ExtractLanguage<LanguageT extends string | undefined> = LanguageT extends string ? LanguageT : never

export type LangSpec<LanguageT extends string | undefined> = LanguageT extends string ? LocalizedString<LanguageT> : string

// TODO: make this more specific so that only LangSpec can be input?
export function isLocalizedString<LanguageT extends string>(langSpec: any): langSpec is LocalizedString<LanguageT> {
	return typeof langSpec === 'object'
}

export function getString<LanguageT extends string | undefined>(langSpec: LangSpec<LanguageT>, language?: LanguageT): string | undefined {
	if (typeof language === 'string' && isLocalizedString(langSpec)) return langSpec[language]
	else if (typeof langSpec === 'string') return langSpec
}

// FieldDefinition is an object where we can define the field's behaviour
export interface FieldDefinition<FormT, FieldT, LanguageT extends string | undefined> {
	id?: string

	// labels and required/disabled states can be defined as static, or can depend on form and field values
	label?: LangSpec<LanguageT> | FieldSpecifierFunction<FormT, LangSpec<LanguageT>, LanguageT>
	isRequired?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>
	isDisabled?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>
	// TODO: add placeholder support in form builder
	// placeholder?: string | FieldSpecifierFunction<FormT, string>

	// having onChange, errorMessage, or disabled state as static would make no sense... 
	// onChange & isHidden always depend on current form state as accessible via specifier functions
	onChange?: FieldSpecifierFunction<FormT, FormData<FormT>, LanguageT>
	isHidden?: FieldSpecifierFunction<FormT, boolean, LanguageT>

	disallowChange?: FieldSpecifierFunction<FormT, boolean | undefined, LanguageT> | DisallowSpecification<FieldT>

	// Can have one, or multiple custom validator functions, or a specifier for straightforward cases (min/max/etc)
	validators?: ValidatorFunction<FormT, any> | Array<ValidatorFunction<FormT, any>> | ValidatorSpecification<FieldT>

	// can specify that field should show errors as soon as a user begins typing
	validateImmediately?: boolean

	// select options can only be specified for fields that are strings or numbers
	selectOptions?: FieldT extends string | number ? SelectOptionsSpecifier<FormT, FieldT> : never
}

// SubFormDefinition is an object where we can define the subform's behaviour
export interface SubFormDefinition<FormT, SubFormT, LanguageT extends string | undefined> {

	// having onChange, errorMessage, or disabled state as static would make no sense... 
	// onChange & isHidden always depend on current form state as accessible via specifier functions
	onChange?: FieldSpecifierFunction<FormT, FormData<FormT>, LanguageT>
	isHidden?: FieldSpecifierFunction<FormT, boolean, LanguageT>

	rowConstraints?: FieldSpecifierFunction<FormT, MinMaxValidatorSpecification, LanguageT> | MinMaxValidatorSpecification

	formDefinition: FormDefinition<SubFormT, LanguageT>

	newSubForm?: FieldSpecifierFunction<FormT, FormData<SubFormT>, LanguageT>
}


// A form definition maps the form's fields into their definitions
// This is the object with which we define the form's behaviour
export type FieldDefinitions<FormT, LanguageT extends string | undefined = undefined> = {
	[Property in keyof FormT]?: FormT[Property] extends Array<any> ? never : FieldDefinition<FormT, FormT[Property], LanguageT>
}

// A form definition maps the form's fields into their definitions
// This is the object with which we define the form's behaviour
export type SubFormDefinitions<FormT, LanguageT extends string | undefined = undefined> = {
	[Property in keyof FormT]?: FormT[Property] extends Array<infer SubFormT> ? SubFormDefinition<FormT, SubFormT, LanguageT> : never
}

export type FormDefinition<FormT, LanguageT extends string | undefined = undefined> = {
	fields?: FieldDefinitions<FormT, LanguageT>
	subForms?: SubFormDefinitions<FormT, LanguageT>
}

export type FormFieldTouchState<FormT> = {
	[key in keyof FormT]?: boolean
} 

// FormState is used by the form builder to determine state of the form overall
// We separate it from FormFieldState because adding fields to the mapped FormFieldState makes later type logic tricky
export interface FormState<FormT> {
	fieldsTouched: FormFieldTouchState<FormT>
	hasBeenValidated: boolean
}

export function initFormState<FormT>(formData: FormT): FormState<FormT> {
	return {hasBeenValidated: false, fieldsTouched: {}}
}
