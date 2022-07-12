/// <reference types="react" />
import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes";
export declare class FormBuilder<FormT> {
    private formDefinition;
    formData: FormT;
    private formState;
    private setFormData;
    private setFormState;
    private _isValid;
    constructor(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, setFormData: React.Dispatch<React.SetStateAction<FormT>>, setFormState: React.Dispatch<React.SetStateAction<FormState<FormT>>>);
    private updateValidity;
    textInput(fieldName: string & OnlyKeysOfType<FormT, string>): JSX.Element;
    numberInput(fieldName: string & OnlyKeysOfType<FormT, number>): JSX.Element;
    dateInput(fieldName: string & OnlyKeysOfType<FormT, Date>): JSX.Element;
    selectTextInput(fieldName: string & OnlyKeysOfType<FormT, string>): JSX.Element;
    selectNumberInput(fieldName: string & OnlyKeysOfType<FormT, number>): JSX.Element;
    checkboxInput(fieldName: string & OnlyKeysOfType<FormT, boolean>): JSX.Element;
    validate(): void;
    get isValid(): boolean | undefined;
}
export default FormBuilder;
