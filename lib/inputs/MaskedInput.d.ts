/// <reference types="react" />
import { AnyMaskedOptions } from 'imask';
import { InputProps } from './inputs';
import './Inputs.scss';
export interface MaskTestFunction {
    (val: string): boolean;
}
export interface MaskedInputProps extends InputProps<string> {
    mask: string | AnyMaskedOptions;
}
export declare function MaskedInput(props: MaskedInputProps): JSX.Element;
export default MaskedInput;
