import { TextareaHTMLAttributes } from 'react';
import { InputProps } from './inputs';
import './Inputs.scss';
export interface TextAreaProps extends InputProps<string, TextareaHTMLAttributes<any>> {
}
export declare function TextArea(props: TextAreaProps): JSX.Element;
export default TextArea;
