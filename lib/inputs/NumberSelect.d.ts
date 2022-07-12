/// <reference types="react" />
import { InputProps, SelectOption } from './inputs';
import './Inputs.scss';
export interface NumberSelectProps extends InputProps<number | null> {
    placeholder?: string;
    selectOptions: Array<SelectOption<number>>;
}
export declare function NumberSelect(props: NumberSelectProps): JSX.Element;
export default NumberSelect;
