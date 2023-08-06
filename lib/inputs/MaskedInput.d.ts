/// <reference types="react" />
import { AnyMaskedOptions } from 'imask';
import { InputProps } from './inputs';
export declare type Mask = string | AnyMaskedOptions;
export interface MaskedInputProps extends InputProps<string> {
    mask: Mask;
}
export declare function MaskedInput(props: MaskedInputProps): JSX.Element;
export default MaskedInput;
