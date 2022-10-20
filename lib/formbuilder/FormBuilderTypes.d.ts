import { SelectOption } from '../inputs/inputs';
import { ValidatorFunction, ValidatorSpecification } from '../validation/validation';
export declare type OnlyKeysOfType<T, V> = {
    [K in keyof T]: Exclude<T[K], undefined> extends V ? K : never;
}[keyof T];
export declare type OnlyStringKeysOfType<T, V> = OnlyKeysOfType<T, V> & string;
export interface FormShape {
    [field: string]: any;
}
export declare type FormData<T extends FormShape> = Partial<T>;
export interface FieldSpecifierFunction<FormT extends FormShape, OutputT> {
    (fieldValue: FormT[typeof fieldName] | undefined, fieldName: keyof FormT & string, formData: FormData<FormT>, formDefinition: FormDefinition<FormT>): OutputT;
}
export declare type SelectOptionsSpecifier<FormT extends FormShape, FieldT extends string | number> = Array<SelectOption<FieldT>> | FieldSpecifierFunction<FormT, Array<SelectOption<FieldT>>>;
export interface MaxLengthDisallowSpecification {
    maxLength: number;
}
export declare type DisallowSpecification<FieldT> = FieldT extends string | number ? MaxLengthDisallowSpecification : never;
export interface FieldDefinition<FormT extends FormShape, FieldT> {
    id?: string;
    label?: string | FieldSpecifierFunction<FormT, string>;
    isRequired?: boolean | FieldSpecifierFunction<FormT, boolean>;
    isDisabled?: boolean | FieldSpecifierFunction<FormT, boolean>;
    onChange?: FieldSpecifierFunction<FormT, FormData<FormT>>;
    isHidden?: FieldSpecifierFunction<FormT, boolean>;
    disallowChange?: FieldSpecifierFunction<FormT, boolean | undefined> | DisallowSpecification<FieldT>;
    validators?: ValidatorFunction<FormT> | Array<ValidatorFunction<FormT>> | ValidatorSpecification<FieldT>;
    validateImmediately?: boolean;
    selectOptions?: FieldT extends string | number ? SelectOptionsSpecifier<FormT, FieldT> : never;
}
export declare type FormDefinition<FormT extends FormShape> = {
    [Property in keyof FormT]?: FieldDefinition<FormT, FormT[Property]>;
};
export declare type FormFieldTouchState<FormT extends FormShape> = {
    [key in keyof FormT]?: boolean;
};
export interface FormState<FormT extends FormShape> {
    fieldsTouched: FormFieldTouchState<FormT>;
    hasBeenValidated: boolean;
}
export declare function initFormState<FormT extends FormShape>(formData: FormT): FormState<FormT>;