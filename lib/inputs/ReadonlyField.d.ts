/// <reference types="react" />
import { InputProps } from './inputs';
import './Inputs.scss';
export interface ReadonlyFieldProps extends InputProps<string, any> {
}
export declare function ReadonlyField(props: ReadonlyFieldProps): JSX.Element;
export default ReadonlyField;
