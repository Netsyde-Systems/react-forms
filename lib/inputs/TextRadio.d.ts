/// <reference types="react" />
import { InputProps, SelectOption } from './inputs';
import './Inputs.scss';
import './Radio.scss';
export interface TextRadioProps extends InputProps<string> {
    selectOptions: Array<SelectOption<string>>;
}
export declare function TextRadio(props: TextRadioProps): JSX.Element;
export default TextRadio;
