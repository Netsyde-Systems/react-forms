/// <reference types="react" />
import { InputProps } from './inputs';
import './Inputs.scss';
import './CheckBox.scss';
export interface CheckBoxProps extends InputProps<boolean> {
}
export declare function CheckBox(props: CheckBoxProps): JSX.Element;
