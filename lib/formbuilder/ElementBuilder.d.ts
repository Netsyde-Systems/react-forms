import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import FormBuilder, { FieldNameProps } from "./FormBuilder";
export declare class ElementBuilder<FormT, LanguageT extends string | undefined = undefined> {
    private formBuilder;
    constructor(formBuilder: FormBuilder<FormT, LanguageT>);
    TextInput: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    TextArea: (props: FieldNameProps<FormT, string> & TextareaHTMLAttributes<any>) => JSX.Element;
    NumberInput: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    IntegerInput: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    DateInput: (props: FieldNameProps<FormT, Date> & InputHTMLAttributes<any>) => JSX.Element;
    LocalizedDateInput: (props: FieldNameProps<FormT, Date>) => JSX.Element;
    PostalCode: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    PhoneNumber: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    EmailAddress: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    Currency: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    TextSelect: (props: FieldNameProps<FormT, string> & SelectHTMLAttributes<any>) => JSX.Element;
    NumberSelect: (props: FieldNameProps<FormT, number> & SelectHTMLAttributes<any>) => JSX.Element;
    TextRadio: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    NumberRadio: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    CheckBox: (props: FieldNameProps<FormT, boolean> & InputHTMLAttributes<any>) => JSX.Element;
    Files: (props: FieldNameProps<FormT, Array<File>>) => JSX.Element;
}
