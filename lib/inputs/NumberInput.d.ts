/// <reference types="react" />
import { InputProps } from './inputs';
import './Inputs.scss';
export interface NumberInputProps extends InputProps<number> {
    placeholder?: string;
}
export declare function NumberInput(props: NumberInputProps): JSX.Element;
