/// <reference types="react" />
import { InputProps, SelectOption } from './inputs';
import './Inputs.scss';
export interface TextSelectProps extends InputProps<string | null> {
    placeholder?: string;
    selectOptions: Array<SelectOption<string>>;
}
export declare function TextSelect(props: TextSelectProps): JSX.Element;
export default TextSelect;
