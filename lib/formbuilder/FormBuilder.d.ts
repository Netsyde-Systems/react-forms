import { InputHTMLAttributes, ReactElement, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { AnyMaskedOptions } from 'imask';
import { FileInputConfig } from "../inputs/FileInput";
import { ExtractLanguage, FormData, FormDefinition, FormFieldErrors, FormState, LangSpec, LocalizedString, OnlyKeysOfType } from "./FormBuilderTypes";
import { ElementBuilder } from "./ElementBuilder";
import { MinMaxValidatorSpecification } from "../validation/validation";
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
    formState: FormState<FormT, LanguageT>;
    private onFormDataUpdate?;
    private onFormStateUpdate?;
    private subFormName?;
    private subFormIndex?;
    private rootFormData?;
    private originalFormData?;
    externalData?: any;
    ElementBuilder: ElementBuilder<FormT, LanguageT>;
    constructor(formDefinition: FormDefinition<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT, LanguageT>, onFormDataUpdate?: ((formData: FormData<FormT>) => void) | undefined, onFormStateUpdate?: ((formState: FormState<FormT, LanguageT>) => void) | undefined, subFormName?: string | undefined, subFormIndex?: number | undefined, rootFormData?: FormData<any> | undefined, originalFormData?: FormData<FormT> | undefined, externalData?: any);
    private validateSubForms;
    setFormDefinition: (formDefinition: FormDefinition<FormT, LanguageT>) => void;
    setLanguage: (language?: LanguageT) => void;
    setReadOnly: (isReadOnly?: boolean) => void;
    setDisabled: (isDisabled?: boolean) => void;
    setData: (formData: FormData<FormT>, formState?: FormState<FormT, LanguageT>, fieldName?: keyof FormT) => void;
    setExternalData: (data: any) => void;
    clearExternalErrors: () => void;
    setExternalErrors: (errors: FormFieldErrors<FormT, LanguageT>) => void;
    addExternalError(fieldName: keyof FormT, fieldValue: FormT[typeof fieldName], errorMessage: LangSpec<LanguageT>): void;
    setField: (fieldName: keyof FormT, fieldValue: FormData<FormT>[keyof FormT]) => void;
    private linkStandardControl;
    private linkOptionControl;
    textInput: (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    textArea: (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: TextareaHTMLAttributes<HTMLTextAreaElement>) => JSX.Element;
    numberInput: (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    integerInput: (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    maskedInput: (fieldName: OnlyKeysOfType<FormT, string>, mask: string | AnyMaskedOptions, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    dateInput: (fieldName: OnlyKeysOfType<FormT, Date>, minMax?: MinMaxValidatorSpecification<Date>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    localizedDateInput: (fieldName: OnlyKeysOfType<FormT, Date>, minMax?: MinMaxValidatorSpecification<Date>) => JSX.Element;
    postalCode: (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    phoneNumber: (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    emailAddress: (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    currency: (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    currencyString: (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    textSelect: (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: SelectHTMLAttributes<HTMLSelectElement>) => JSX.Element;
    numberSelect: (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: SelectHTMLAttributes<HTMLSelectElement>) => JSX.Element;
    textRadio: (fieldName: OnlyKeysOfType<FormT, string>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    numberRadio: (fieldName: OnlyKeysOfType<FormT, number>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    checkbox: (fieldName: OnlyKeysOfType<FormT, boolean>, controlProps?: InputHTMLAttributes<HTMLInputElement>) => JSX.Element;
    readonlyField: (label: string, text: string) => JSX.Element;
    files: (fieldName: OnlyKeysOfType<FormT, Array<File>>, fileInputConfig?: FileInputConfig) => JSX.Element;
    validate(): void;
    subFormLoop<SubFormT>(fieldName: OnlyKeysOfType<FormT, Array<SubFormT>>, subFormConstructor: SubFormLoopConstructor<SubFormT, LanguageT>): Array<ReactElement>;
    subFormPanel<SubFormT>(fieldName: OnlyKeysOfType<FormT, Array<SubFormT>>, subFormPanelConstructor: SubFormPanelConstructor): ReactElement;
    get isValid(): boolean;
    get hasInternalErrors(): boolean;
    get hasExternalErrors(): boolean;
    get hasChanges(): boolean;
    localize<LT extends ExtractLanguage<LanguageT>>(localizedString: LocalizedString<LT>, defaultLocalization?: string): string;
}
export default FormBuilder;
