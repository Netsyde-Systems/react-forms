/// <reference types="react" />
import { SelectProps } from './inputs';
import './Inputs.scss';
import './Radio.scss';
export interface NumberRadioProps extends SelectProps<number> {
}
export declare function NumberRadio(props: NumberRadioProps): JSX.Element;
export default NumberRadio;
