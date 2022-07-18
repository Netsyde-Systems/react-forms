/// <reference types="react" />
import { SelectProps } from './inputs';
import './Inputs.scss';
export interface TextSelectProps extends SelectProps<string> {
    placeholder?: string;
}
export declare function TextSelect(props: TextSelectProps): JSX.Element;
export default TextSelect;
