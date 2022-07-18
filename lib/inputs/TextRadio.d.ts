/// <reference types="react" />
import { SelectProps } from './inputs';
import './Inputs.scss';
import './Radio.scss';
export interface TextRadioProps extends SelectProps<string> {
}
export declare function TextRadio(props: TextRadioProps): JSX.Element;
export default TextRadio;
