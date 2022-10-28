/// <reference types="react" />
import { SelectProps } from '../inputs/inputs';
import { FormDefinition, FormState, OnlyStringKeysOfType, FormShape, FormData } from "./FormBuilderTypes";
import { InputProps } from '../inputs/inputs';
export interface ReactFormsInputControl<FieldType> {
    (inputProps: InputProps<FieldType>): JSX.Element;
}
export interface ReactFormsOptionControl<FieldType extends string | number> {
    (selectProps: SelectProps<FieldType>): JSX.Element;
}
export declare function createStandardInput<FormT extends FormShape, FieldType, LanguageT extends string | undefined>(formDefinition: FormDefinition<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyStringKeysOfType<FormT, FieldType>, onChange: (data: FormData<FormT>) => void, InputControl: ReactFormsInputControl<FieldType>, language?: LanguageT): [JSX.Element, boolean];
export declare function createOptionInput<FormT extends FormShape, FieldType extends string | number, LanguageT extends string | undefined>(formDefinition: FormDefinition<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyStringKeysOfType<FormT, FieldType>, onChange: (formData: FormData<FormT>) => void, OptionControl: ReactFormsOptionControl<FieldType>, language?: LanguageT): [JSX.Element, boolean];
export declare function createTextSelect<FormT extends FormShape, LanguageT extends string | undefined>(formDefinition: FormDefinition<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyStringKeysOfType<FormT, string>, onChange: (formData: FormData<FormT>) => void, language?: LanguageT): [JSX.Element, boolean];
export declare function createNumberSelect<FormT extends FormShape, LanguageT extends string | undefined = undefined>(formDefinition: FormDefinition<FormT, LanguageT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyStringKeysOfType<FormT, number>, onChange: (formData: FormData<FormT>) => void, language?: LanguageT): [JSX.Element, boolean];
