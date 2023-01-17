import { Locale } from 'date-fns';
export interface Activatable {
    disabled?: boolean;
}
export interface InputProps<T> extends Activatable {
    id: string;
    value: T | undefined;
    onChange: (val?: T) => void;
    label?: string | false;
    errorMessage?: string | false;
    hasError?: boolean;
    required?: boolean;
    hidden?: boolean;
    placeholder?: string;
    locale?: Locale;
    readOnly?: boolean;
}
export interface SelectOption<T extends string | number> {
    value: T;
    text: string;
}
export interface SelectProps<T extends string | number> extends InputProps<T> {
    selectOptions: Array<SelectOption<T>>;
}
export declare function getInputEnvelopeClass(props: InputProps<any>, ...args: Array<string>): string;
