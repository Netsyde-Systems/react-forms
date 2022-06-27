import { SelectOption } from '../inputs/inputs'

// Field specifier functions take as arguments the form data, the field value and name, and returns a value
export interface FieldSpecifierFunction<FormT, FieldT, OutputT> {
	(formData: FormT, fieldValue: FieldT, fieldName: string ): OutputT
}

// Select Options Specifier can be static list of select options, or can depend on state of form
export type SelectOptionsSpecifier<FormT, FieldT extends string | number> =
 	Array<SelectOption<FieldT>> | 
	FieldSpecifierFunction<FormT, FieldT, Array<FieldT>>

// FieldDefinition is an object where we can defined the field's behaviour
export interface FieldDefinition<FormT, FieldT> {
	id?: string

	// labels and required state can be defined as static, or can depend on form and field values
	label?: string | FieldSpecifierFunction<FormT, FieldT, string>
	isRequired?: boolean | FieldSpecifierFunction<FormT, FieldT, boolean>

	// having onChange, errorMessage, or disabled state as static would make no sense... 
	// they always depend on current form state
	onChange?: FieldSpecifierFunction<FormT, FieldT, FormT>
	errorMessage?: FieldSpecifierFunction<FormT, FieldT, string>
	isDisabled?: FieldSpecifierFunction<FormT, FieldT, boolean>

	// select options can only be specified for fields that are strings or numbers
	selectOptions?: FieldT extends string | number ? SelectOptionsSpecifier<FormT, FieldT> : never
}

// A form definition maps the form's fields into their definitions
// This is the object with which we define the form's behaviour
export type FormDefinition<FormT> = {
	[Property in keyof FormT]?: FieldDefinition<FormT, FormT[Property]>
}

// FormFieldState is used by the form builder to determine the current state of the form's fields
// it maps each form field to it's value and a flag to determine if the user has interacted with it yet
export type FormFieldState<FormT> = {
	[key in keyof FormT]: {
		value: FormT[key]
		isTouched: boolean
	}
} 

// FormState is used by the form builder to determine state of the form overall
// We separate it from FormFieldState because adding fields to the mapped FormFieldState makes later type logic tricky
export interface FormState {
	hasBeenValidated: boolean
}
