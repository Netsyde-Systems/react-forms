/// <reference types="react" />
import { Activatable } from '../inputs/inputs';
export declare type ButtonType = 'primary' | 'secondary';
export interface ButtonProps extends Activatable {
    text: string;
    onClick: () => void;
    type?: ButtonType;
    hidden?: boolean;
}
export declare function Button(props: ButtonProps): JSX.Element;
export default Button;
