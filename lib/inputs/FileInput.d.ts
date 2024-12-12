/// <reference types="react" />
import { InputProps } from './inputs';
export interface FileFilter<T> {
    criteria: T;
    onRejected?: (file: File) => void;
}
export interface FileInputConfig {
    multiple?: boolean;
    showFileList?: boolean;
    maxFileSizeInBytes?: FileFilter<number>;
    maxTotalFileSizeInBytes?: FileFilter<number>;
    excludedFileExtensions?: FileFilter<Array<string>>;
    acceptedFileExtensions?: FileFilter<Array<string>>;
}
export interface FileInputProps extends InputProps<Array<File>>, FileInputConfig {
}
export declare function FileInput(props: FileInputProps): JSX.Element;
export default FileInput;
