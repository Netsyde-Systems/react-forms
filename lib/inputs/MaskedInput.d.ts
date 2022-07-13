/// <reference types="react" />
import { InputProps } from './inputs';
import './Inputs.scss';
export interface MaskTestFunction {
    (val: string): boolean;
}
export interface MaskedInputProps extends InputProps<string> {
    placeholder?: string;
    mask: string | RegExp | MaskTestFunction;
}
export declare function MaskedInput(props: MaskedInputProps): JSX.Element;
