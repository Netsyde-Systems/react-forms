import { FieldSpecifierFunction } from '../hooks/FormBuilderTypes';
export interface ValidatorFunction<FormT> extends FieldSpecifierFunction<FormT, boolean> {
}
export interface ErrorMessageFunction<FormT> extends FieldSpecifierFunction<FormT, string | undefined> {
}
export declare const isValidEmail: ValidatorFunction<any>;
export declare const isValueProvided: ValidatorFunction<any>;
export declare const requiredFieldError: ErrorMessageFunction<any>;
export declare const invalidEmailError: ErrorMessageFunction<any>;
