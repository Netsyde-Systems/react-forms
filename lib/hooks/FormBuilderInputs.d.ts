/// <reference types="react" />
import { SelectProps } from '../inputs/inputs';
import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes";
import { InputProps } from '../inputs/inputs';
export interface ReactFormsInputControl<FieldType> {
    (inputProps: InputProps<FieldType>): JSX.Element;
}
export interface ReactFormsOptionControl<FieldType extends string | number> {
    (selectProps: SelectProps<FieldType>): JSX.Element;
}
export declare function createStandardInput<FormT extends {
    [key: string]: any;
}, FieldType>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, FieldType>, onChange: (formData: FormT) => void, InputControl: ReactFormsInputControl<FieldType>): [JSX.Element, boolean];
export declare function createOptionInput<FormT extends {
    [key: string]: any;
}, FieldType extends string | number>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, FieldType>, onChange: (formData: FormT) => void, OptionControl: ReactFormsOptionControl<FieldType>): [JSX.Element, boolean];
export declare function createTextSelect<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, string>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createNumberSelect<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, number>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
