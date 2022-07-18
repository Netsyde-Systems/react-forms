/// <reference types="react" />
import { SelectProps } from './inputs';
import './Inputs.scss';
export interface NumberSelectProps extends SelectProps<number> {
    placeholder?: string;
}
export declare function NumberSelect(props: NumberSelectProps): JSX.Element;
export default NumberSelect;
