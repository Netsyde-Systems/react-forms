/// <reference types="react" />
import { InputProps } from './inputs';
import './FileInput.scss';
declare const DefaultFileInputTextResources: {
    dragAndDropOr: string;
    uploadAFile: string;
    uploadFiles: string;
};
export interface FileInputProps extends InputProps<Array<File>> {
    multiple?: boolean;
    maxFileSizeInBytes?: number;
    textResources?: Partial<typeof DefaultFileInputTextResources>;
}
export declare function FileInput(props: FileInputProps): JSX.Element;
export default FileInput;
