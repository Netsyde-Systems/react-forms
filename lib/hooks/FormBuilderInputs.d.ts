/// <reference types="react" />
import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes";
export declare function createTextInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, string>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createNumberInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, number>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createDateInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, Date>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createSelectTextInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, string>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createSelectNumberInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, number>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createCheckboxInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, boolean>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
