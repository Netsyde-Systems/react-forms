import { SelectOption } from '../inputs/inputs'
import { ValidatorFunction, ValidatorSpecification } from '../validation/validation'

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

export type FormData<T> = {
	[K in keyof T]?: T[K] extends Array<infer A> ? Array<FormData<A>> : T[K]
}

export interface FieldSpecifierArgument<FormT, PropT extends keyof FormT, LanguageT extends string | undefined = undefined> {
	fieldValue: FormData<FormT>[PropT]
	rawValue?: string
	fieldName: PropT
	formData: FormData<FormT>
	formState: FormState<FormT, LanguageT>
	formDefinition: FormDefinition<FormT, LanguageT>
	language?: LanguageT
	subFormIndex?: number
	rootFormData?: FormData<any>
	externalData?: any
}

// Field specifier functions take as arguments the form data, the field value and name, and return a value
export interface FieldSpecifierFunction<FormT, OutputT, LanguageT extends string | undefined = undefined> {
	(arg: FieldSpecifierArgument<FormT, keyof FormT, LanguageT>): OutputT
}

export type LocalizedOption<ValueT extends string | number, LanguageT extends string | undefined = undefined> = {
	value: ValueT
	text: LangSpec<LanguageT>
}

export function convertToSelectOption<ValueT extends string | number, LanguageT extends string | undefined = undefined>(localizedOption: LocalizedOption<ValueT, LanguageT>, language?: LanguageT): SelectOption<ValueT> {
	let { text: localizedText, value } = localizedOption

	const text = getString(localizedText, language) ?? ''

	return { value, text }
}

// Select Options Specifier can be static list of select options, or can depend on state of form
export type SelectOptionsSpecifier<FormT, FieldT extends string | number, LanguageT extends string | undefined = undefined> =
 	Array<LocalizedOption<FieldT, LanguageT>> | 
	FieldSpecifierFunction<FormT, Array<LocalizedOption<FieldT, LanguageT>>, LanguageT>

export interface MaxLengthDisallowSpecification {
	maxLength: number
}

export type DisallowSpecification<FieldT> = FieldT extends string | number ? MaxLengthDisallowSpecification : never // | AddOtherSpecifierHere

export type LocalizedString<LanguageT extends string> = {
	[lang in LanguageT]: string
}

export type LocaleLookup<LanguageT extends string> = {
	[lang in LanguageT]: Locale
}

export function isLocaleLookup<LanguageT extends string>(locales?: LocaleLookup<LanguageT>): locales is LocaleLookup<LanguageT> {
	return typeof locales === 'object'
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

	// ids, labels and required/disabled states can be defined as static, or can depend on form and field values
	id?: string | FieldSpecifierFunction<FormT, string, LanguageT>
	label?: LangSpec<LanguageT> | FieldSpecifierFunction<FormT, LangSpec<LanguageT>, LanguageT>
	isRequired?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT> | ValidatorFunction<FormT, LanguageT>
	isDisabled?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>
	isReadOnly?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>
	// TODO: add placeholder support in form builder
	// placeholder?: string | FieldSpecifierFunction<FormT, string>

	// having onChange, errorMessage, or disabled state as static would make no sense... 
	// onChange & isHidden always depend on current form state as accessible via specifier functions
	onChange?: FieldSpecifierFunction<FormT, FormData<FormT> | Promise<FormData<FormT>>, LanguageT>
	isHidden?: FieldSpecifierFunction<FormT, boolean, LanguageT>

	disallowChange?: FieldSpecifierFunction<FormT, boolean | undefined, LanguageT> | DisallowSpecification<FieldT>

	// Can have one, or multiple custom validator functions, or a specifier for straightforward cases (min/max/etc)
	validators?: ValidatorFunction<FormT, LanguageT> | Array<ValidatorFunction<FormT, LanguageT>> | ValidatorSpecification<FieldT>

	// can specify that field should show errors as soon as a user begins typing
	validateImmediately?: boolean

	// select options can only be specified for fields that are strings or numbers
	selectOptions?: FieldT extends string | number ? SelectOptionsSpecifier<FormT, FieldT, LanguageT> : never

	locales?: LanguageT extends string ? LocaleLookup<LanguageT> : never

	collapseLabels?: boolean
}

// SubFormDefinition is an object where we can define the subform's behaviour
export interface SubFormDefinition<FormT, SubFormT, LanguageT extends string | undefined> {

	// having onChange, errorMessage, or disabled state as static would make no sense... 
	// onChange & isHidden always depend on current form state as accessible via specifier functions
	onChange?: FieldSpecifierFunction<FormT, FormData<FormT>, LanguageT>
	isHidden?: FieldSpecifierFunction<FormT, boolean, LanguageT>

	// We only support a single validator function (for now)
	// TODO: allow full validation suite 
	validators?: ValidatorFunction<FormT, LanguageT> // | Array<ValidatorFunction<FormT, LanguageT>> | ValidatorSpecification<Array<SubFormT>>

	formDefinition: FormDefinition<SubFormT, LanguageT>

	newSubForm?: FieldSpecifierFunction<FormT, FormData<SubFormT>, LanguageT>
}


// A form definition maps the form's fields into their definitions
// This is the object with which we define the form's behaviour
export type FieldDefinitions<FormT, LanguageT extends string | undefined = undefined> = {
	// [Property in keyof FormT]?: FormT[Property] extends Array<any> ? never : FieldDefinition<FormT, FormT[Property], LanguageT>
	[Property in keyof FormT]?: 
		FormT[Property] extends Array<File> ? FieldDefinition<FormT, FormT[Property], LanguageT> : 
		FormT[Property] extends Array<any> ? never : 
		FieldDefinition<FormT, FormT[Property], LanguageT>
}

// A form definition maps the form's fields into their definitions
// This is the object with which we define the form's behaviour
export type SubFormDefinitions<FormT, LanguageT extends string | undefined = undefined> = {
	// [Property in keyof FormT]?: FormT[Property] extends Array<infer SubFormT> ? SubFormDefinition<FormT, SubFormT, LanguageT> : never
	[Property in keyof FormT]?: 
		FormT[Property] extends Array<File> ? never : 
		FormT[Property] extends Array<infer SubFormT> ? SubFormDefinition<FormT, SubFormT, LanguageT> : 
		never
}

// TODO: add external data type to form definition
// make all form builder structs get formbuilder types from form definition
export type FormDefinition<FormT, LanguageT extends string | undefined = undefined> = {
	fields?: FieldDefinitions<FormT, LanguageT>
	subForms?: SubFormDefinitions<FormT, LanguageT>
}

export type FormFieldMap<FormT, DataT> = {
	[key in keyof FormT]?: DataT
} 

export type FormFieldErrors<FormT, LanguageT extends string | undefined = undefined> = {
	[key in keyof FormT]?: Map<FormT[key], LangSpec<LanguageT>>
} 

// FormState is used by the form builder to determine state of the form overall
// We separate it from FormFieldState because adding fields to the mapped FormFieldState makes later type logic tricky
export interface FormState<FormT, LanguageT extends string | undefined = undefined> {
	// TODO: make fieldsTouched & fieldsValid required, and allow assigning by partial in formbuilder
	// will make code much cleaner and avoid repetitive existence checks
	fieldsTouched?: FormFieldMap<FormT, boolean>
	// todo: make match external form field errors I think
	fieldErrorConditions?: FormFieldMap<FormT, string>
	externalErrorConditions?: FormFieldErrors<FormT, LanguageT>
	hasBeenValidated?: boolean
	language?: LanguageT
	isDisabled?: boolean
	isReadOnly?: boolean
}
