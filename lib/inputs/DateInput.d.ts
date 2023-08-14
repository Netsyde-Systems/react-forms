/// <reference types="react" />
import { InputProps } from './inputs';
import { MinMaxValidatorSpecification } from '../validation/validation';
export interface DateInputProps extends MinMaxValidatorSpecification<Date>, InputProps<Date> {
}
export declare function DateInput(props: DateInputProps): JSX.Element;
export default DateInput;
