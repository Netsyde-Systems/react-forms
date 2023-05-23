import { Locale } from 'date-fns';
import { HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react';
export interface Activatable {
    disabled?: boolean;
}
export interface InputProps<ValueT, ControlAttributesT extends HTMLAttributes<ValueT> = InputHTMLAttributes<any>> extends Activatable {
    id: string;
    value: ValueT | undefined;
    onChange: (val?: ValueT) => void;
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
export interface SelectOption<T extends string | number> {
    value: T;
    text: string;
}
export interface SelectProps<T extends string | number> extends InputProps<T, SelectHTMLAttributes<any>> {
    selectOptions: Array<SelectOption<T>>;
}
export declare function getInputEnvelopeClass(props: InputProps<any, any>, ...args: Array<string>): string;
