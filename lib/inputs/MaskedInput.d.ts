import { AnyMaskedOptions } from 'imask';
import { InputProps } from './inputs';
export interface MaskTestFunction {
    (val: string): boolean;
}
export interface MaskedInputDetailedChangedEvent {
    value?: string;
    typedValue?: string;
}
export interface MaskedInputDetailedChangeEventHandler {
    (e: MaskedInputDetailedChangedEvent): void;
}
export interface MaskedInputProps extends InputProps<string> {
    mask: string | AnyMaskedOptions;
    onChangeDetailed?: MaskedInputDetailedChangeEventHandler;
}
export declare function MaskedInput(props: MaskedInputProps): import("react/jsx-runtime").JSX.Element;
export default MaskedInput;
