/// <reference types="react" />
import { InputProps, SelectOption } from './inputs';
import './Inputs.scss';
export interface GenericSelectProps<T> extends InputProps<T> {
    selectOptions: Array<SelectOption<T>>;
    valueToString: (val?: T) => string;
    valueFromString: (stringVal?: string) => T | undefined;
}
export declare function GenericSelect<T>(props: GenericSelectProps<T>): JSX.Element;
export default GenericSelect;
