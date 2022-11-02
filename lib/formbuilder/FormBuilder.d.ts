import { ReactElement } from "react";
import { ExtractLanguage, FormData, FormDefinition, FormState, LocalizedString, OnlyKeysOfType } from "./FormBuilderTypes";
export declare type FieldNameProps<FormT, FieldT> = {
    field: OnlyKeysOfType<FormT, FieldT>;
};
export interface SubFormLoopController {
    subFormIndex: number;
    deleteInstance: () => void;
}
export interface SubFormLoopConstructor<SubFormT, LanguageT extends string | undefined> {
    (builder: FormBuilder<SubFormT, LanguageT>, controller: SubFormLoopController): ReactElement;
}
export interface SubFormPanelController {
    addInstance: () => void;
}
export interface SubFormPanelConstructor {
    (controller: SubFormPanelController): ReactElement;
}
export declare class FormBuilder<FormT, LanguageT extends string | undefined = undefined> {
    private formDefinition;
    formData: FormData<FormT>;
    formState: FormState<FormT>;
    language?: LanguageT | undefined;
    private onFormDataUpdate?;
    private onFormStateUpdate?;
    private onLanguageUpdate?;
    private rowIndex?;
    private _isValid;
    constructor(formDefinition: FormDefinition<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT>, language?: LanguageT | undefined, onFormDataUpdate?: ((formData: FormData<FormT>) => void) | undefined, onFormStateUpdate?: ((formState: FormState<FormT>) => void) | undefined, onLanguageUpdate?: ((language: LanguageT | undefined) => void) | undefined, rowIndex?: number | undefined);
    private updateValidity;
    setLanguage: (language?: LanguageT) => void;
    setData: (formData: FormData<FormT>, formState?: FormState<FormT>) => void;
    setField: (fieldName: keyof FormT, fieldValue: FormData<FormT>[keyof FormT]) => void;
    private linkStandardControl;
    private linkOptionControl;
    textInput: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    TextInputElementTest: (props: FieldNameProps<FormT, string>) => JSX.Element;
    textArea: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    numberInput: (fieldName: OnlyKeysOfType<FormT, number>) => JSX.Element;
    dateInput: (fieldName: OnlyKeysOfType<FormT, Date>) => JSX.Element;
    postalCode: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    phoneNumber: (fieldName: OnlyKeysOfType<FormT, number>) => JSX.Element;
    emailAddress: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    textSelect: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    numberSelect: (fieldName: OnlyKeysOfType<FormT, number>) => JSX.Element;
    textRadio: (fieldName: OnlyKeysOfType<FormT, string>) => JSX.Element;
    numberRadio: (fieldName: OnlyKeysOfType<FormT, number>) => JSX.Element;
    checkbox: (fieldName: OnlyKeysOfType<FormT, boolean>) => JSX.Element;
    validate(): void;
    subFormLoop<SubFormT>(fieldName: OnlyKeysOfType<FormT, Array<SubFormT>>, subFormConstructor: SubFormLoopConstructor<SubFormT, LanguageT>): Array<ReactElement>;
    subFormPanel<SubFormT>(fieldName: OnlyKeysOfType<FormT, Array<SubFormT>>, subFormPanelConstructor: SubFormPanelConstructor): ReactElement;
    get isValid(): boolean | undefined;
    localize<LT extends ExtractLanguage<LanguageT>>(localizedString: LocalizedString<LT>, defaultLocalization?: string): string;
}
export default FormBuilder;
