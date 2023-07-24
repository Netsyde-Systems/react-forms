import { TextareaHTMLAttributes } from 'react';
import { InputProps } from './inputs';
export interface TextAreaProps extends InputProps<string, TextareaHTMLAttributes<any>> {
}
export declare function TextArea(props: TextAreaProps): import("react/jsx-runtime").JSX.Element;
export default TextArea;
