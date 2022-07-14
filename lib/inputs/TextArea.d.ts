/// <reference types="react" />
import { InputProps } from './inputs';
import './Inputs.scss';
export interface TextAreaProps extends InputProps<string> {
    rows?: number;
    cols?: number;
    placeholder?: string;
}
export declare function TextArea(props: TextAreaProps): JSX.Element;
export default TextArea;
