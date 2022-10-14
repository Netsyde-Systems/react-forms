/// <reference types="react" />
import { InputProps } from './inputs';
export interface EmailInputProps extends InputProps<string> {
    placeholder?: string;
}
export declare function EmailInput(props: EmailInputProps): JSX.Element;
export default EmailInput;
