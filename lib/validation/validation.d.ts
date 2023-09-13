import { FieldSpecifierFunction, LangSpec } from '../formbuilder/FormBuilderTypes';
export declare type ValidatorFunction<FormT, LanguageT extends string | undefined = undefined> = FieldSpecifierFunction<FormT, Array<LangSpec<LanguageT>>, LanguageT>;
export declare type GetValidatorFunction<FormT, LanguageT extends string | undefined = undefined> = (value: any, errorLabel: string) => FieldSpecifierFunction<FormT, Array<LangSpec<LanguageT>>, LanguageT>;
export interface MinMaxValidatorSpecification<T> {
    min?: T;
    max?: T;
}
export declare type ValidatorSpecification<FieldT> = FieldT extends string | number | Array<any> ? MinMaxValidatorSpecification<number> : never;
export declare const isValidEmail: (fieldValue?: string) => boolean;
export declare const isValueProvided: (fieldValue?: any) => boolean;
export declare const defaultRequiredFieldValidator: ValidatorFunction<any, any>;
export declare const defaultEmailValidator: ValidatorFunction<any, any>;
export declare function getDefaultMinValidator(minValue: any, errorLabel: string): ValidatorFunction<any, any>;
export declare function getDefaultMaxValidator(maxValue: any, errorLabel: string): ValidatorFunction<any, any>;
export declare function getDefaultMinLengthValidator(minLength: number, errorLabel: string): ValidatorFunction<any, any>;
export declare function getDefaultMaxLengthValidator(maxLength: number, errorLabel: string): ValidatorFunction<any, any>;
export interface DefaultValidators<FormT, LanguageT extends string | undefined> {
    requiredFieldValidator?: ValidatorFunction<FormT, LanguageT>;
    emailValidator?: ValidatorFunction<FormT, LanguageT>;
    getMinValidator?: {
        (minValue: Date | number, errorLabel: string): ValidatorFunction<FormT, LanguageT>;
    };
    getMaxValidator?: {
        (minValue: Date | number, errorLabel: string): ValidatorFunction<FormT, LanguageT>;
    };
    getMinLengthValidator?: {
        (minLength: number, errorLabel: string): ValidatorFunction<FormT, LanguageT>;
    };
    getMaxLengthValidator?: {
        (maxLength: number, errorLabel: string): ValidatorFunction<FormT, LanguageT>;
    };
}
