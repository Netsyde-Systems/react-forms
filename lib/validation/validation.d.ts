import { FieldSpecifierFunction, FormShape } from '../formbuilder/FormBuilderTypes';
export declare type ValidatorFunction<FormT extends FormShape> = FieldSpecifierFunction<FormT, Array<string>>;
export interface MinMaxValidatorSpecification {
    min?: number;
    max?: number;
}
export declare type ValidatorSpecification<FieldT> = FieldT extends string | number | Date ? MinMaxValidatorSpecification : never;
export declare const isValidEmail: (fieldValue?: string) => boolean;
export declare const isValueProvided: (fieldValue?: any) => boolean;
export declare const requiredFieldValidator: ValidatorFunction<any>;
export declare const emailValidator: ValidatorFunction<any>;
export declare function getMinValidator<T>(minValue: T, errorLabel: string): ValidatorFunction<any>;
export declare function getMaxValidator<T>(maxValue: T, errorLabel: string): ValidatorFunction<any>;
export declare function getMinLengthValidator(minLength: number, errorLabel: string): ValidatorFunction<any>;
export declare function getMaxLengthValidator(maxLength: number, errorLabel: string): ValidatorFunction<any>;
