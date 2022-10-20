/// <reference types="react" />
import { FormShape, FormData, FormDefinition, FormState, OnlyStringKeysOfType } from "./FormBuilderTypes";
export declare type FieldNameProps<FormT, FieldT> = {
    field: OnlyStringKeysOfType<FormT, FieldT>;
};
export declare class FormBuilder<FormT extends FormShape> {
    private formDefinition;
    formData: FormData<FormT>;
    formState: FormState<FormT>;
    private onFormDataUpdate?;
    private onFormStateUpdate?;
    private _isValid;
    constructor(formDefinition: FormDefinition<FormT>, formData: FormData<FormT>, formState: FormState<FormT>, onFormDataUpdate?: import("react").Dispatch<import("react").SetStateAction<Partial<FormT>>> | undefined, onFormStateUpdate?: import("react").Dispatch<import("react").SetStateAction<FormState<FormT>>> | undefined);
    private updateValidity;
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
