import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react"
import { Mask } from '../inputs/MaskedInput'
import FormBuilder, { FieldNameProps } from "./FormBuilder"
import { MinMaxValidatorSpecification } from "../validation/validation"

export class ElementBuilder<FormT, LanguageT extends string | undefined = undefined> {
	constructor(private formBuilder: FormBuilder<FormT, LanguageT>) { }

	public TextInput = (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => this.formBuilder.textInput(props.field, props)
	public TextArea = (props: FieldNameProps<FormT, string> & TextareaHTMLAttributes<any>) => this.formBuilder.textArea(props.field, props)
	public NumberInput = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.numberInput(props.field, props)
	public IntegerInput = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.integerInput(props.field, props)
	public MaskedInput = (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any> & { mask: Mask }) => this.formBuilder.maskedInput(props.field, props.mask, props)
	public DateInput = (props:FieldNameProps<FormT, Date> & MinMaxValidatorSpecification<Date> & InputHTMLAttributes<any>) => this.formBuilder.dateInput(props.field, props, props)
	// Note: Localized Date Input does not support standard controlProps like the other inputs do (at this time)
	public LocalizedDateInput = (props:FieldNameProps<FormT, Date> & MinMaxValidatorSpecification<Date>) => this.formBuilder.localizedDateInput(props.field, props)
	public PostalCode = (props:FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => this.formBuilder.postalCode(props.field, props)
	public PhoneNumber = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.phoneNumber(props.field, props)
	public EmailAddress = (props:FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => this.formBuilder.emailAddress(props.field, props)
	public Currency = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.currency(props.field, props)
	public TextSelect = (props:FieldNameProps<FormT, string> & SelectHTMLAttributes<any>) => this.formBuilder.textSelect(props.field, props)
	public NumberSelect = (props:FieldNameProps<FormT, number> & SelectHTMLAttributes<any>) => this.formBuilder.numberSelect(props.field, props)
	public TextRadio = (props:FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => this.formBuilder.textRadio(props.field, props)
	public NumberRadio = (props:FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => this.formBuilder.numberRadio(props.field, props)
	public CheckBox = (props:FieldNameProps<FormT, boolean> & InputHTMLAttributes<any>) => this.formBuilder.checkbox(props.field, props)
	// Note: File Input does not support standard controlProps like the other inputs do (at this time)
	public Files = (props:FieldNameProps<FormT, Array<File>>) => this.formBuilder.files(props.field)
}