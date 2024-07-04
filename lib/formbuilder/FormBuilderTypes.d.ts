import { SelectOption } from '../inputs/inputs';
import { DefaultValidators, ValidatorFunction, ValidatorSpecification } from '../validation/validation';
export declare type OnlyKeysOfType<T, V> = {
    [K in keyof T]: Exclude<T[K], undefined> extends V ? K : never;
}[keyof T];
export declare type FormData<T> = {
    [K in keyof T]?: T[K] extends Array<infer A> ? Array<FormData<A>> : T[K];
};
export interface FieldSpecifierArgument<FormT, PropT extends keyof FormT, LanguageT extends string | undefined = undefined> {
    fieldValue: FormData<FormT>[PropT];
    rawValue?: string;
    fieldName: PropT;
    formData: FormData<FormT>;
    formState: FormState<FormT, LanguageT>;
    formDefinition: FormDefinition<FormT, LanguageT>;
    language?: LanguageT;
    subFormIndex?: number;
    rootFormData?: FormData<any>;
    externalData?: any;
}
export interface FieldSpecifierFunction<FormT, OutputT, LanguageT extends string | undefined = undefined> {
    (arg: FieldSpecifierArgument<FormT, keyof FormT, LanguageT>): OutputT;
}
export declare type LocalizedOption<ValueT extends string | number, LanguageT extends string | undefined = undefined> = {
    value: ValueT;
    text: LangSpec<LanguageT>;
};
export declare function convertToSelectOption<ValueT extends string | number, LanguageT extends string | undefined = undefined>(localizedOption: LocalizedOption<ValueT, LanguageT>, language?: LanguageT): SelectOption<ValueT>;
export declare type SelectOptionsSpecifier<FormT, FieldT extends string | number, LanguageT extends string | undefined = undefined> = Array<LocalizedOption<FieldT, LanguageT>> | FieldSpecifierFunction<FormT, Array<LocalizedOption<FieldT, LanguageT>>, LanguageT>;
export interface MaxLengthDisallowSpecification {
    maxLength: number;
}
export declare type DisallowSpecification<FieldT> = FieldT extends string | number ? MaxLengthDisallowSpecification : never;
export declare type LocalizedString<LanguageT extends string> = {
    [lang in LanguageT]: string;
};
export declare type LocaleLookup<LanguageT extends string> = {
    [lang in LanguageT]: Locale;
};
export declare function isLocaleLookup<LanguageT extends string>(locales?: LocaleLookup<LanguageT>): locales is LocaleLookup<LanguageT>;
export declare type ExtractLanguage<LanguageT extends string | undefined> = LanguageT extends string ? LanguageT : never;
export declare type LangSpec<LanguageT extends string | undefined = undefined> = ExtractLanguage<LanguageT> extends string ? LocalizedString<ExtractLanguage<LanguageT>> : string;
export declare function isLocalizedString<LanguageT extends string>(langSpec: any): langSpec is LocalizedString<LanguageT>;
export declare function getString<LanguageT extends string | undefined>(langSpec: LangSpec<LanguageT>, language?: LanguageT): string | undefined;
export interface FieldDefinition<FormT, FieldT, LanguageT extends string | undefined> {
    id?: string | FieldSpecifierFunction<FormT, string, LanguageT>;
    label?: LangSpec<LanguageT> | FieldSpecifierFunction<FormT, LangSpec<LanguageT>, LanguageT>;
    isRequired?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>;
    isDisabled?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>;
    isReadOnly?: boolean | FieldSpecifierFunction<FormT, boolean, LanguageT>;
    placeholder?: LangSpec<LanguageT> | FieldSpecifierFunction<FormT, LangSpec<LanguageT>, LanguageT>;
    onChange?: FieldSpecifierFunction<FormT, FormData<FormT> | Promise<FormData<FormT>>, LanguageT>;
    isHidden?: FieldSpecifierFunction<FormT, boolean, LanguageT>;
    disallowChange?: FieldSpecifierFunction<FormT, boolean | undefined, LanguageT> | DisallowSpecification<FieldT>;
    validators?: ValidatorFunction<FormT, LanguageT> | Array<ValidatorFunction<FormT, LanguageT>> | ValidatorSpecification<FieldT>;
    defaultValidators?: DefaultValidators<FormT, LanguageT>;
    validateImmediately?: boolean;
    selectOptions?: FieldT extends string | number ? SelectOptionsSpecifier<FormT, FieldT, LanguageT> : never;
    locales?: LanguageT extends string ? LocaleLookup<LanguageT> : never;
    collapseLabels?: boolean;
}
export interface SubFormDefinition<FormT, SubFormT, LanguageT extends string | undefined> {
    onChange?: FieldSpecifierFunction<FormT, FormData<FormT>, LanguageT>;
    isHidden?: FieldSpecifierFunction<FormT, boolean, LanguageT>;
    validators?: ValidatorFunction<FormT, LanguageT>;
    formDefinition: FormDefinition<SubFormT, LanguageT>;
    newSubForm?: FieldSpecifierFunction<FormT, FormData<SubFormT>, LanguageT>;
}
export declare type FieldDefinitions<FormT, LanguageT extends string | undefined = undefined> = {
    [Property in keyof FormT]?: FormT[Property] extends Array<File> ? FieldDefinition<FormT, FormT[Property], LanguageT> : FormT[Property] extends Array<any> ? never : FieldDefinition<FormT, FormT[Property], LanguageT>;
};
export declare type SubFormDefinitions<FormT, LanguageT extends string | undefined = undefined> = {
    [Property in keyof FormT]?: FormT[Property] extends Array<File> ? never : FormT[Property] extends Array<infer SubFormT> ? SubFormDefinition<FormT, SubFormT, LanguageT> : never;
};
export declare type FormDefinition<FormT, LanguageT extends string | undefined = undefined> = {
    fields: FieldDefinitions<FormT, LanguageT>;
    subForms?: SubFormDefinitions<FormT, LanguageT>;
    defaultValidators?: DefaultValidators<FormT, LanguageT>;
};
export declare type FormFieldMap<FormT, DataT> = {
    [key in keyof FormT]?: DataT;
};
export declare type FormFieldErrors<FormT, LanguageT extends string | undefined = undefined> = {
    [key in keyof FormT]?: Map<FormT[key], LangSpec<LanguageT>>;
};
export interface FormState<FormT, LanguageT extends string | undefined = undefined> {
    fieldsTouched?: FormFieldMap<FormT, boolean>;
    fieldErrorConditions?: FormFieldMap<FormT, string>;
    externalErrorConditions?: FormFieldErrors<FormT, LanguageT>;
    hasBeenValidated?: boolean;
    language?: LanguageT;
    isDisabled?: boolean;
    isReadOnly?: boolean;
}
