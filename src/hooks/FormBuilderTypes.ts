import { SelectOption } from '../inputs/inputs'
import { ValidatorFunction, ValidatorSpecification } from '../validation/validation'

// From https://stackoverflow.com/questions/63447660/typescript-remove-all-properties-with-particular-type
type ExcludeKeysWithTypeOf<T, V> = {
  [K in keyof T]: Exclude<T[K], undefined> extends V ? never : K 
}[keyof T]

// inspired by the above
export type OnlyKeysOfType<T, V> = {
  [K in keyof T]: Exclude<T[K], undefined> extends V ? K : never
}[keyof T]

export interface FormShape {
	[field: string]: any
}

export type FormData<T extends FormShape> = Partial<T>

// Field specifier functions take as arguments the form data, the field value and name, and returns a value
export interface FieldSpecifierFunction<FormT extends FormShape, OutputT> {
	(fieldValue: FormT[typeof fieldName] | undefined, fieldName: keyof FormT, formData: FormData<FormT>): OutputT
}

// Select Options Specifier can be static list of select options, or can depend on state of form
export type SelectOptionsSpecifier<FormT extends FormShape, FieldT extends string | number> =
 	Array<SelectOption<FieldT>> | 
	FieldSpecifierFunction<FormT, Array<SelectOption<FieldT>>>

// FieldDefinition is an object where we can define the field's behaviour
export interface FieldDefinition<FormT extends FormShape, FieldT> {
	id?: string

	// labels, placeholders, and required state can be defined as static, or can depend on form and field values
	label?: string | FieldSpecifierFunction<FormT, string>
	isRequired?: boolean | FieldSpecifierFunction<FormT, boolean>
	// TODO: add placeholder support in form builder
	// placeholder?: string | FieldSpecifierFunction<FormT, string>

	// having onChange, errorMessage, or disabled state as static would make no sense... 
	// they always depend on current form state
	onChange?: FieldSpecifierFunction<FormT, FormData<FormT>>
	validators?: ValidatorFunction<FormT> | Array<ValidatorFunction<FormT>> | ValidatorSpecification<FieldT>
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
export type FormDefinition<FormT extends FormShape> = {
	[Property in keyof FormT]?: FieldDefinition<FormT, FormT[Property]>
}

export type FormFieldTouchState<FormT extends FormShape> = {
	[key in keyof FormT]?: boolean
} 

// FormState is used by the form builder to determine state of the form overall
// We separate it from FormFieldState because adding fields to the mapped FormFieldState makes later type logic tricky
export interface FormState<FormT extends FormShape> {
	fieldsTouched: FormFieldTouchState<FormT>
	hasBeenValidated: boolean
}

export function initFormState<FormT extends FormShape>(formData: FormT): FormState<FormT> {
	return {hasBeenValidated: false, fieldsTouched: {}}
}
