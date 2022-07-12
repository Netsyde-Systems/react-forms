import { SelectOption } from '../inputs/inputs';
export declare type OnlyKeysOfType<T, V> = {
    [K in keyof T]: Exclude<T[K], undefined> extends V ? K : never;
}[keyof T];
export interface FieldSpecifierFunction<FormT, OutputT> {
    (fieldValue: FormT[typeof fieldName], fieldName: keyof FormT, formData: FormT): OutputT;
}
export declare type SelectOptionsSpecifier<FormT, FieldT extends string | number> = Array<SelectOption<FieldT>> | FieldSpecifierFunction<FormT, Array<FieldT>>;
export interface FieldDefinition<FormT, FieldT> {
    id?: string;
    label?: string | FieldSpecifierFunction<FormT, string>;
    isRequired?: boolean | FieldSpecifierFunction<FormT, boolean>;
    onChange?: FieldSpecifierFunction<FormT, FormT>;
    errorMessage?: FieldSpecifierFunction<FormT, string>;
    isDisabled?: FieldSpecifierFunction<FormT, boolean>;
    isHidden?: FieldSpecifierFunction<FormT, boolean>;
    disallowChange?: FieldSpecifierFunction<FormT, boolean>;
    selectOptions?: FieldT extends string | number ? SelectOptionsSpecifier<FormT, FieldT> : never;
    validateImmediately?: boolean;
}
export declare type FormDefinition<FormT> = {
    [Property in keyof FormT]?: FieldDefinition<FormT, FormT[Property]>;
};
export declare type FormFieldTouchState<FormT> = {
    [key in keyof FormT]?: boolean;
};
export interface FormState<FormT> {
    fieldsTouched: FormFieldTouchState<FormT>;
    hasBeenValidated: boolean;
}
export declare function initFormState<FormT>(formData: FormT): FormState<FormT>;
