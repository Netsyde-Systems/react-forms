import { Locale } from "../utilities";
export interface Activatable {
    disabled?: boolean;
}
export interface Localizable {
    locale?: Locale;
}
export interface InputProps<T> extends Activatable {
    id: string;
    value: T | undefined | null;
    onChange: (val: T | null) => void;
    label?: string;
    errorMessage?: string;
    required?: boolean;
    hidden?: boolean;
}
export interface SelectOption<T extends string | number> {
    value: T;
    text: string;
}
export interface SelectProps<T extends string | number> extends InputProps<T | null> {
    selectOptions: Array<SelectOption<T>>;
}
export declare function getInputEnvelopeClass(props: InputProps<any>, ...args: Array<string>): string;
