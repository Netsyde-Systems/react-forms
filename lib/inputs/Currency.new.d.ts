/// <reference types="react" />
import { InputProps } from './inputs';
export declare function Currency(props: InputProps<number>): JSX.Element;
export default Currency;
export interface CurrencyType {
    numberValue: number;
    displayString: string;
}
export declare function getCurrency(dirtyString: string): CurrencyType;
