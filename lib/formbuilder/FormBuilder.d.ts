import { FormShape, FormData, FormDefinition, FormState, OnlyStringKeysOfType } from "./FormBuilderTypes";
import React from "react";
export declare type FieldNameProps<FormT, FieldT> = {
    field: OnlyStringKeysOfType<FormT, FieldT>;
};
export declare class FormBuilder<FormT extends FormShape, LanguageT extends string | undefined = undefined> {
    private formDefinition;
    formData: FormData<FormT>;
    formState: FormState<FormT>;
    language?: LanguageT | undefined;
    private onFormDataUpdate?;
    private onFormStateUpdate?;
    private onLanguageUpdate?;
    private _isValid;
    constructor(formDefinition: FormDefinition<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT>, language?: LanguageT | undefined, onFormDataUpdate?: React.Dispatch<React.SetStateAction<Partial<FormT>>> | undefined, onFormStateUpdate?: React.Dispatch<React.SetStateAction<FormState<FormT>>> | undefined, onLanguageUpdate?: React.Dispatch<React.SetStateAction<LanguageT | undefined>> | undefined);
    private updateValidity;
    setLanguage: (language?: LanguageT) => void;
    setData: (formData: FormData<FormT>, formState?: FormState<FormT>) => void;
    setField: (fieldName: keyof FormT, fieldValue: Partial<FormT>[keyof FormT]) => void;
    private linkStandardControl;
    private linkOptionControl;
    textInput: (fieldName: OnlyStringKeysOfType<FormT, string>) => JSX.Element;
    TextInputElementTest: (props: FieldNameProps<FormT, string>) => JSX.Element;
    textArea: (fieldName: OnlyStringKeysOfType<FormT, string>) => JSX.Element;
    numberInput: (fieldName: OnlyStringKeysOfType<FormT, number>) => JSX.Element;
    dateInput: (fieldName: OnlyStringKeysOfType<FormT, Date>) => JSX.Element;
    postalCode: (fieldName: OnlyStringKeysOfType<FormT, string>) => JSX.Element;
    phoneNumber: (fieldName: OnlyStringKeysOfType<FormT, number>) => JSX.Element;
    emailAddress: (fieldName: OnlyStringKeysOfType<FormT, string>) => JSX.Element;
    textSelect: (fieldName: OnlyStringKeysOfType<FormT, string>) => JSX.Element;
    numberSelect: (fieldName: OnlyStringKeysOfType<FormT, number>) => JSX.Element;
    textRadio: (fieldName: OnlyStringKeysOfType<FormT, string>) => JSX.Element;
    numberRadio: (fieldName: OnlyStringKeysOfType<FormT, number>) => JSX.Element;
    checkbox: (fieldName: OnlyStringKeysOfType<FormT, boolean>) => JSX.Element;
    validate(): void;
    get isValid(): boolean | undefined;
}
export default FormBuilder;
