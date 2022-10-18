import { FieldSpecifierFunction, ValidatorFunction } from '../hooks/FormBuilderTypes';
export declare const isValidEmail: (fieldValue?: string) => boolean;
export declare const isValueProvided: FieldSpecifierFunction<any, boolean>;
export declare const requiredFieldValidator: ValidatorFunction<any>;
export declare const emailValidator: ValidatorFunction<any>;
