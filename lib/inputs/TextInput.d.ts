/// <reference types="react" />
import { InputProps } from './inputs';
import './Inputs.scss';
export interface TextInputProps extends InputProps<string> {
    placeholder?: string;
}
export declare function TextInput(props: TextInputProps): JSX.Element;
export default TextInput;
