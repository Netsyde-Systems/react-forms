/// <reference types="react" />
import { FormDefinition, FormState, OnlyKeysOfType } from "./FormBuilderTypes";
export interface InputCreationFunction<FormT extends {
    [key: string]: any;
}, FieldT> {
    (formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, FieldT>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
}
export interface InputCreationFunction2<FormT extends {
    [key: string]: any;
}, FieldT> {
    (formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, FieldT>, onChange: (formData: FormT) => void): [() => JSX.Element, boolean];
}
export declare function createTextInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, string>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createTextInput2<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, string>, onChange: (formData: FormT) => void): [() => JSX.Element, boolean];
export declare function createNumberInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, number>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createDateInput<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, Date>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createTextSelect<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, string>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createNumberSelect<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, number>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
export declare function createCheckbox<FormT extends {
    [key: string]: any;
}>(formDefinition: FormDefinition<FormT>, formData: FormT, formState: FormState<FormT>, fieldName: string & OnlyKeysOfType<FormT, boolean>, onChange: (formData: FormT) => void): [JSX.Element, boolean];
