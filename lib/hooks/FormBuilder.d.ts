/// <reference types="react" />
import { FormShape, FormData, FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes";
export declare type FieldNameProps<FormT, FieldT> = {
    field: OnlyKeysOfType<FormT, FieldT>;
};
export declare class FormBuilder<FormT extends FormShape> {
    private formDefinition;
    formData: FormData<FormT>;
    private formState;
    private setFormData;
    private setFormState;
    private _isValid;
    constructor(formDefinition: FormDefinition<FormT>, formData: FormData<FormT>, formState: FormState<FormT>, setFormData: React.Dispatch<React.SetStateAction<FormData<FormT>>>, setFormState: React.Dispatch<React.SetStateAction<FormState<FormT>>>);
    private updateValidity;
    private linkStandardControl;
    private linkOptionControl;
    textInput: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    TextInputElementTest: (props: FieldNameProps<FormT, string>) => JSX.Element;
    textArea: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    numberInput: (fieldName: OnlyKeysOfType<FormT, number>) => JSX.Element;
    dateInput: (fieldName: OnlyKeysOfType<FormT, Date>) => JSX.Element;
    postalCode: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    phoneNumber: (fieldName: OnlyKeysOfType<FormT, number>) => JSX.Element;
    email: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    textSelect: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    numberSelect: (fieldName: OnlyKeysOfType<FormT, number>) => JSX.Element;
    textRadio: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    numberRadio: (fieldName: OnlyKeysOfType<FormT, number>) => JSX.Element;
    checkbox: (fieldName: OnlyKeysOfType<FormT, boolean>) => JSX.Element;
    validate(): void;
    get isValid(): boolean | undefined;
}
export default FormBuilder;
