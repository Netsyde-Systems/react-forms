import { SelectOption } from '../inputs/inputs';
import { ValidatorFunction, ValidatorSpecification } from '../validation/validation';
export declare type OnlyKeysOfType<T, V> = {
    [K in keyof T]: Exclude<T[K], undefined> extends V ? K : never;
}[keyof T];
export declare type FormData<T> = Partial<T>;
export interface FieldSpecifierFunction<FormT, OutputT, LanguageT extends string | undefined = undefined> {
    (fieldValue: FormT[typeof fieldName] | undefined, fieldName: keyof FormT, formData: FormData<FormT>, formDefinition: FormDefinition<FormT, LanguageT>, language?: LanguageT): OutputT;
}
export declare type SelectOptionsSpecifier<FormT, FieldT extends string | number> = Array<SelectOption<FieldT>> | FieldSpecifierFunction<FormT, Array<SelectOption<FieldT>>>;
export interface MaxLengthDisallowSpecification {
    maxLength: number;
}
export declare type DisallowSpecification<FieldT> = FieldT extends string | number ? MaxLengthDisallowSpecification : never;
export declare type LocalizedString<LanguageT extends string> = {
    [lang in LanguageT]: string;
};
export declare type ExtractLanguage<LanguageT extends string | undefined> = LanguageT extends string ? LanguageT : never;
export declare type LangSpec<LanguageT extends string | undefined> = LanguageT extends string ? LocalizedString<LanguageT> : string;
export declare function isLocalizedString<LanguageT extends string>(langSpec: any): langSpec is LocalizedString<LanguageT>;
export declare function getString<LanguageT extends string | undefined>(langSpec: LangSpec<LanguageT>, language?: LanguageT): string | undefined;
export interface FieldDefinition<FormT, FieldT, LanguageT extends string | undefined> {
    id?: string;
    label?: LangSpec<LanguageT> | FieldSpecifierFunction<FormT, LangSpec<LanguageT>, LanguageT>;
    isRequired?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>;
    isDisabled?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>;
    onChange?: FieldSpecifierFunction<FormT, FormData<FormT>, LanguageT>;
    isHidden?: FieldSpecifierFunction<FormT, boolean, LanguageT>;
    disallowChange?: FieldSpecifierFunction<FormT, boolean | undefined, LanguageT> | DisallowSpecification<FieldT>;
    validators?: ValidatorFunction<FormT, any> | Array<ValidatorFunction<FormT, any>> | ValidatorSpecification<FieldT>;
    validateImmediately?: boolean;
    selectOptions?: FieldT extends string | number ? SelectOptionsSpecifier<FormT, FieldT> : never;
}
export declare type FormDefinition<FormT, LanguageT extends string | undefined = undefined> = {
    [Property in keyof FormT]?: FieldDefinition<FormT, FormT[Property], LanguageT>;
};
export declare type FormFieldTouchState<FormT> = {
    [key in keyof FormT]?: boolean;
};
export interface FormState<FormT> {
    fieldsTouched: FormFieldTouchState<FormT>;
    hasBeenValidated: boolean;
}
export declare function initFormState<FormT>(formData: FormT): FormState<FormT>;
