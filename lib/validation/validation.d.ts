import { FieldSpecifierFunction } from '../formbuilder/FormBuilderTypes';
export declare type ValidatorFunction<FormT, LanguageT extends string | undefined = undefined> = FieldSpecifierFunction<FormT, Array<string>, LanguageT>;
export interface MinMaxValidatorSpecification {
    min?: number;
    max?: number;
}
export declare type ValidatorSpecification<FieldT> = FieldT extends string | number | Date ? MinMaxValidatorSpecification : never;
export declare const isValidEmail: (fieldValue?: string) => boolean;
export declare const isValueProvided: (fieldValue?: any) => boolean;
export declare const requiredFieldValidator: ValidatorFunction<any, any>;
export declare const emailValidator: ValidatorFunction<any>;
export declare function getMinValidator<T>(minValue: T, errorLabel: string): ValidatorFunction<any, any>;
export declare function getMaxValidator<T>(maxValue: T, errorLabel: string): ValidatorFunction<any, any>;
export declare function getMinLengthValidator(minLength: number, errorLabel: string): ValidatorFunction<any, any>;
export declare function getMaxLengthValidator(maxLength: number, errorLabel: string): ValidatorFunction<any, any>;
