/// <reference types="react" />
import { InputProps } from './inputs';
import './Inputs.scss';
import 'react-datepicker/dist/react-datepicker.css';
export interface LocalizedDateInputProps extends InputProps<Date> {
}
export declare function LocalizedDateInput(props: LocalizedDateInputProps): JSX.Element;
export default LocalizedDateInput;
