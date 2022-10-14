/// <reference types="react" />
import { SelectProps } from '../inputs/inputs';
import { FormDefinition, FormState, OnlyKeysOfType, FormShape, FormData } from "./FormBuilderTypes";
import { InputProps } from '../inputs/inputs';
export interface ReactFormsInputControl<FieldType> {
    (inputProps: InputProps<FieldType>): JSX.Element;
}
export interface ReactFormsOptionControl<FieldType extends string | number> {
    (selectProps: SelectProps<FieldType>): JSX.Element;
}
export declare function createStandardInput<FormT extends FormShape, FieldType>(formDefinition: FormDefinition<FormT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyKeysOfType<FormT, FieldType>, onChange: (data: FormData<FormT>) => void, InputControl: ReactFormsInputControl<FieldType>): [JSX.Element, boolean];
export declare function createOptionInput<FormT extends FormShape, FieldType extends string | number>(formDefinition: FormDefinition<FormT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyKeysOfType<FormT, FieldType>, onChange: (formData: FormData<FormT>) => void, OptionControl: ReactFormsOptionControl<FieldType>): [JSX.Element, boolean];
export declare function createTextSelect<FormT extends FormShape>(formDefinition: FormDefinition<FormT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyKeysOfType<FormT, string>, onChange: (formData: FormData<FormT>) => void): [JSX.Element, boolean];
export declare function createNumberSelect<FormT extends FormShape>(formDefinition: FormDefinition<FormT>, formData: FormData<FormT>, formState: FormState<FormT>, fieldName: OnlyKeysOfType<FormT, number>, onChange: (formData: FormData<FormT>) => void): [JSX.Element, boolean];
