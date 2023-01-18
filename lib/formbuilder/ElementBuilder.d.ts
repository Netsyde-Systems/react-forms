/// <reference types="react" />
import FormBuilder, { FieldNameProps } from "./FormBuilder";
export declare class ElementBuilder<FormT, LanguageT extends string | undefined = undefined> {
    private formBuilder;
    constructor(formBuilder: FormBuilder<FormT, LanguageT>);
    TextInput: (props: FieldNameProps<FormT, string>) => JSX.Element;
    TextArea: (props: FieldNameProps<FormT, string>) => JSX.Element;
    NumberInput: (props: FieldNameProps<FormT, number>) => JSX.Element;
    DateInput: (props: FieldNameProps<FormT, Date>) => JSX.Element;
    LocalizedDateInput: (props: FieldNameProps<FormT, Date>) => JSX.Element;
    PostalCode: (props: FieldNameProps<FormT, string>) => JSX.Element;
    PhoneNumber: (props: FieldNameProps<FormT, number>) => JSX.Element;
    EmailAddress: (props: FieldNameProps<FormT, string>) => JSX.Element;
    Currency: (props: FieldNameProps<FormT, number>) => JSX.Element;
    TextSelect: (props: FieldNameProps<FormT, string>) => JSX.Element;
    NumberSelect: (props: FieldNameProps<FormT, number>) => JSX.Element;
    TextRadio: (props: FieldNameProps<FormT, string>) => JSX.Element;
    NumberRadio: (props: FieldNameProps<FormT, number>) => JSX.Element;
    CheckBox: (props: FieldNameProps<FormT, boolean>) => JSX.Element;
    Files: (props: FieldNameProps<FormT, Array<File>>) => JSX.Element;
}
