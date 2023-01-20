/// <reference types="react" />
import { SelectProps } from '../inputs/inputs';
import { FieldDefinitions, FormState, OnlyKeysOfType, FormData } from "./FormBuilderTypes";
import { InputProps } from '../inputs/inputs';
export interface ReactFormsInputControl<FieldType> {
    (inputProps: InputProps<FieldType>): JSX.Element;
}
export interface ReactFormsOptionControl<FieldType extends string | number> {
    (selectProps: SelectProps<FieldType>): JSX.Element;
}
export declare function createStandardInput<FormT, FieldType, LanguageT extends string | undefined>(fieldDefinitions: FieldDefinitions<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT, LanguageT>, fieldName: OnlyKeysOfType<FormT, FieldType>, onChange: (data: FormData<FormT>) => void, InputControl: ReactFormsInputControl<FieldType>, subFormIndex: number | undefined, rootFormData: FormData<any> | undefined): JSX.Element;
export declare function createOptionInput<FormT, FieldType extends string | number, LanguageT extends string | undefined>(formDefinition: FieldDefinitions<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT, LanguageT>, fieldName: OnlyKeysOfType<FormT, FieldType>, onChange: (formData: FormData<FormT>) => void, OptionControl: ReactFormsOptionControl<FieldType>, subFormIndex: number | undefined, rootFormData: FormData<any> | undefined): JSX.Element;
export declare function createTextSelect<FormT, LanguageT extends string | undefined>(formDefinition: FieldDefinitions<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyKeysOfType<FormT, string>, onChange: (formData: FormData<FormT>) => void, language: LanguageT, subFormIndex: number | undefined, rootFormData: FormData<any> | undefined): JSX.Element;
export declare function createNumberSelect<FormT, LanguageT extends string | undefined = undefined>(formDefinition: FieldDefinitions<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyKeysOfType<FormT, number>, onChange: (formData: FormData<FormT>) => void, language: LanguageT, subFormIndex: number | undefined, rootFormData: FormData<any> | undefined): JSX.Element;
export declare function getLabel<FormT, FieldT, LanguageT extends string | undefined>(formDefinition: FieldDefinitions<FormT, LanguageT>, formData: FormData<FormT>, fieldName: OnlyKeysOfType<FormT, FieldT>, language?: LanguageT): string;
