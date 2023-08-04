import { Locale } from 'date-fns';
import { HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react';
export interface Activatable {
    disabled?: boolean;
}
export interface ReadonlyProps<ValueT, ControlAttributesT extends HTMLAttributes<ValueT> = InputHTMLAttributes<any>> extends Activatable {
    id: string;
    value: ValueT | undefined;
    label?: string | false;
    errorMessage?: string | false;
    hasError?: boolean;
    required?: boolean;
    hidden?: boolean;
    placeholder?: string;
    locale?: Locale;
    readOnly?: boolean;
    disallowBlank?: boolean;
    className?: string;
    controlProps?: Omit<ControlAttributesT, keyof InputProps<ValueT>>;
}
export interface InputProps<ValueT, ControlAttributesT extends HTMLAttributes<ValueT> = InputHTMLAttributes<any>> extends ReadonlyProps<ValueT, ControlAttributesT> {
    onChange: (val?: ValueT, rawValue?: string) => void;
}
export interface SelectOption<T> {
    value: T;
    text: string;
}
export interface SelectProps<T extends string | number> extends InputProps<T, SelectHTMLAttributes<any>> {
    selectOptions: Array<SelectOption<T>>;
}
export declare function getInputEnvelopeClass(props: ReadonlyProps<any, any>, ...args: Array<string>): string;
