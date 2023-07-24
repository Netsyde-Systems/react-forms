import { InputProps, ReadonlyProps } from './inputs';
export interface ReadonlyFieldProps extends Omit<InputProps<string, any>, 'onChange'> {
}
export declare function ReadonlyField(props: ReadonlyProps<string>): import("react/jsx-runtime").JSX.Element;
export default ReadonlyField;
