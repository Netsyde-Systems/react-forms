import { SelectOption } from '../inputs/inputs'

// From https://stackoverflow.com/questions/63447660/typescript-remove-all-properties-with-particular-type
type ExcludeKeysWithTypeOf<T, V> = {
  [K in keyof T]: Exclude<T[K], undefined> extends V ? never : K 
}[keyof T]

type Without<T, V> = Pick<T, ExcludeKeysWithTypeOf<T, V>>;

// inspired by the above
export type OnlyKeysOfType<T, V> = {
  [K in keyof T]: Exclude<T[K], undefined> extends V ? K : never
}[keyof T]

interface MixedType {
	aString1: string
	aNumber: number
	aString2: string
}

type StringKeys = OnlyKeysOfType<MixedType, string>

// Field specifier functions take as arguments the form data, the field value and name, and returns a value
export interface FieldSpecifierFunction<FormT, OutputT> {
	(fieldValue: FormT[typeof fieldName], fieldName: keyof FormT, formData: FormT, ): OutputT
}

// Select Options Specifier can be static list of select options, or can depend on state of form
export type SelectOptionsSpecifier<FormT, FieldT extends string | number> =
 	Array<SelectOption<FieldT>> | 
	FieldSpecifierFunction<FormT, Array<FieldT>>

// FieldDefinition is an object where we can defined the field's behaviour
export interface FieldDefinition<FormT, FieldT> {
	id?: string

	// labels and required state can be defined as static, or can depend on form and field values
	label?: string | FieldSpecifierFunction<FormT, string>
	isRequired?: boolean | FieldSpecifierFunction<FormT, boolean>

	// having onChange, errorMessage, or disabled state as static would make no sense... 
	// they always depend on current form state
	onChange?: FieldSpecifierFunction<FormT, FormT>
	errorMessage?: FieldSpecifierFunction<FormT, string>
	isDisabled?: FieldSpecifierFunction<FormT, boolean>
	isHidden?: FieldSpecifierFunction<FormT, boolean>

	disallowChange?: FieldSpecifierFunction<FormT, boolean>

	// select options can only be specified for fields that are strings or numbers
	selectOptions?: FieldT extends string | number ? SelectOptionsSpecifier<FormT, FieldT> : never

	// can specify that field should show errors as soon as a user begins typing
	validateImmediately?: boolean
}

// A form definition maps the form's fields into their definitions
// This is the object with which we define the form's behaviour
export type FormDefinition<FormT> = {
	[Property in keyof FormT]?: FieldDefinition<FormT, FormT[Property]>
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
