/// <reference types="react" />
import { InputProps } from './inputs';
import './Inputs.scss';
export interface PhoneNumberProps extends InputProps<number> {
}
export declare function PhoneNumber(props: PhoneNumberProps): JSX.Element;
export default PhoneNumber;
