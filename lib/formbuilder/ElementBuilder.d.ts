import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Mask } from '../inputs/MaskedInput';
import FormBuilder, { FieldNameProps } from "./FormBuilder";
import { MinMaxValidatorSpecification } from "../validation/validation";
import { FileInputConfig } from '../inputs/FileInput';
export declare class ElementBuilder<FormT, LanguageT extends string | undefined = undefined> {
    private formBuilder;
    constructor(formBuilder: FormBuilder<FormT, LanguageT>);
    TextInput: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    TextArea: (props: FieldNameProps<FormT, string> & TextareaHTMLAttributes<any>) => JSX.Element;
    NumberInput: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    IntegerInput: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    MaskedInput: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any> & {
        mask: Mask;
    }) => JSX.Element;
    DateInput: (props: FieldNameProps<FormT, Date> & MinMaxValidatorSpecification<Date> & InputHTMLAttributes<any>) => JSX.Element;
    LocalizedDateInput: (props: FieldNameProps<FormT, Date> & MinMaxValidatorSpecification<Date>) => JSX.Element;
    PostalCode: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    PhoneNumber: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    EmailAddress: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    Currency: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    CurrencyString: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    TextSelect: (props: FieldNameProps<FormT, string> & SelectHTMLAttributes<any>) => JSX.Element;
    NumberSelect: (props: FieldNameProps<FormT, number> & SelectHTMLAttributes<any>) => JSX.Element;
    TextRadio: (props: FieldNameProps<FormT, string> & InputHTMLAttributes<any>) => JSX.Element;
    NumberRadio: (props: FieldNameProps<FormT, number> & InputHTMLAttributes<any>) => JSX.Element;
    CheckBox: (props: FieldNameProps<FormT, boolean> & InputHTMLAttributes<any>) => JSX.Element;
    Files: (props: FieldNameProps<FormT, Array<File>> & FileInputConfig) => JSX.Element;
}
