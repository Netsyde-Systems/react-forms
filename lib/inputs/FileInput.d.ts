/// <reference types="react" />
import { InputProps } from './inputs';
export interface FileInputProps extends InputProps<Array<File>> {
    multiple?: boolean;
    maxFileSizeInBytes?: number;
}
export declare function FileInput(props: FileInputProps): JSX.Element;
export default FileInput;
