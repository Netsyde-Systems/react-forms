import FormBuilder, { FieldNameProps } from "./FormBuilder"

export class ElementBuilder<FormT, LanguageT extends string | undefined = undefined> {
	constructor(private formBuilder: FormBuilder<FormT, LanguageT>) { }

	public TextInput = (props: FieldNameProps<FormT, string>) => this.formBuilder.textInput(props.field)
	public TextArea = (props: FieldNameProps<FormT, string>) => this.formBuilder.textArea(props.field)
	public NumberInput = (props:FieldNameProps<FormT, number>) => this.formBuilder.numberInput(props.field)
	public DateInput = (props:FieldNameProps<FormT, Date>) => this.formBuilder.dateInput(props.field)
	public LocalizedDateInput = (props:FieldNameProps<FormT, Date>) => this.formBuilder.localizedDateInput(props.field)
	public PostalCode = (props:FieldNameProps<FormT, string>) => this.formBuilder.postalCode(props.field)
	public PhoneNumber = (props:FieldNameProps<FormT, number>) => this.formBuilder.phoneNumber(props.field)
	public EmailAddress = (props:FieldNameProps<FormT, string>) => this.formBuilder.emailAddress(props.field)
	public Currency = (props:FieldNameProps<FormT, number>) => this.formBuilder.currency(props.field)
	public TextSelect = (props:FieldNameProps<FormT, string>) => this.formBuilder.textSelect(props.field)
	public NumberSelect = (props:FieldNameProps<FormT, number>) => this.formBuilder.numberSelect(props.field)
	public TextRadio = (props:FieldNameProps<FormT, string>) => this.formBuilder.textRadio(props.field)
	public NumberRadio = (props:FieldNameProps<FormT, number>) => this.formBuilder.numberRadio(props.field)
	public CheckBox = (props:FieldNameProps<FormT, boolean>) => this.formBuilder.checkbox(props.field)
	public Files = (props:FieldNameProps<FormT, Array<File>>) => this.formBuilder.files(props.field)
}