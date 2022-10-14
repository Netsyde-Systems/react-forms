import { FormShape, FieldSpecifierFunction } from '../hooks/FormBuilderTypes';
export interface ValidatorFunction<FormT extends FormShape> extends FieldSpecifierFunction<FormT, boolean> {
}
export interface ErrorMessageFunction<FormT extends FormShape> extends FieldSpecifierFunction<FormT, string | undefined> {
}
export declare const isValidEmail: (fieldValue?: string) => boolean;
export declare const isValueProvided: ValidatorFunction<any>;
export declare const requiredFieldError: ErrorMessageFunction<any>;
export declare const invalidEmailError: (fieldValue?: string) => "Invalid email." | undefined;
