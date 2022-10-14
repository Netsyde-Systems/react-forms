/// <reference types="react" />
import { InputProps } from './inputs';
export interface EmailAddressProps extends InputProps<string> {
    placeholder?: string;
}
export declare function EmailAddress(props: EmailAddressProps): JSX.Element;
export default EmailAddress;
