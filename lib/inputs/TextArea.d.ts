import { TextareaHTMLAttributes } from 'react';
import { InputProps } from './inputs';
export interface TextAreaProps extends InputProps<string, TextareaHTMLAttributes<any>> {
}
export declare function TextArea(props: TextAreaProps): JSX.Element;
export default TextArea;
