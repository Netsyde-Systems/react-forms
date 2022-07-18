/// <reference types="react" />
import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes";
export declare type FieldNameProps<FormT, FieldT> = {
    field: string & OnlyKeysOfType<FormT, FieldT>;
};
export declare class FormBuilder<FormT> {
    private formDefinition;
    formData: FormT;
    private formState;
    private setFormData;
    private setFormState;
    private _isValid;
    constructor(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, setFormData: React.Dispatch<React.SetStateAction<FormT>>, setFormState: React.Dispatch<React.SetStateAction<FormState<FormT>>>);
    private updateValidity;
    private linkStandardControl;
    private linkOptionControl;
    textInput: (fieldName: string & OnlyKeysOfType<FormT, string>) => JSX.Element;
    TextInput: (props: FieldNameProps<FormT, string>) => JSX.Element;
    textArea: (fieldName: string & OnlyKeysOfType<FormT, string>) => JSX.Element;
    numberInput: (fieldName: string & OnlyKeysOfType<FormT, number>) => JSX.Element;
    dateInput: (fieldName: string & OnlyKeysOfType<FormT, Date>) => JSX.Element;
    postalCode: (fieldName: string & OnlyKeysOfType<FormT, string>) => JSX.Element;
    phoneNumber: (fieldName: string & OnlyKeysOfType<FormT, number>) => JSX.Element;
    textSelect: (fieldName: string & OnlyKeysOfType<FormT, string>) => JSX.Element;
    numberSelect: (fieldName: string & OnlyKeysOfType<FormT, number>) => JSX.Element;
    checkbox: (fieldName: string & OnlyKeysOfType<FormT, boolean>) => JSX.Element;
    validate(): void;
    get isValid(): boolean | undefined;
}
export default FormBuilder;
