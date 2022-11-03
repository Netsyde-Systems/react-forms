// Based on widget described here: https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8

import React from 'react'
import { getInputEnvelopeClass, InputProps } from './inputs'
import { ErrorMessage } from './ErrorMessage'
import { InputLabel } from './InputLabel'

import './Inputs.scss'

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

export interface FileInputProps extends InputProps<any> {
	multiple?: boolean
	maxFileSizeInBytes?: number
}

export const FileInput: React.FC<FileInputProps> = (props) => {
	let inputRef = React.useRef<HTMLInputElement>(null)
	const [files, setFiles] = React.useState<any>({})

	const className = getInputEnvelopeClass(props, 'file', 'input')

	const { id, disabled, required, multiple = false, maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES } = props

	const KILO_BYTES_PER_BYTE = 1000

	const convertNestedObjectToArray = (nestedObj: any) =>
		Object.keys(nestedObj).map((key) => nestedObj[key])

	const convertBytesToKB = (bytes: number) =>
		Math.round(bytes / KILO_BYTES_PER_BYTE)

	const handleUploadClick = () => {
		inputRef.current?.click()
	}

	const callUpdateFilesCb = (files: any) => {
		const filesAsArray = convertNestedObjectToArray(files);
		props.onChange(filesAsArray)
	}

	const addNewFiles = (newFiles: any) => {
		for (let file of newFiles) {
			if (file.size < maxFileSizeInBytes) {
				if (props.multiple) {
					return { file }
				}
				files[file.name] = file
			}
		}
		return { ...files }
	}

	const handleNewFileUpload: React.ChangeEventHandler<HTMLInputElement> = (e: any) => {
		const { files: newFiles } = e.target
		if (newFiles.length) {
			let updatedFiles = addNewFiles(newFiles)
			setFiles(updatedFiles)
			callUpdateFilesCb(updatedFiles)
		}
	}

	return (
		<>
			<section>
				<InputLabel {...props} />
				<p>Drag and drop your files anywhere or</p>
				<button type="button" onClick={handleUploadClick}>
					<i className="fas fa-file-upload" />
					<span> Upload {props.multiple ? "files" : "a file"}</span>
				</button>
				<div className={className}>
					<input ref={inputRef} type='file' value={props.value ?? ''} onChange={handleNewFileUpload} multiple={multiple} {...{ id, disabled, required }} />
					<ErrorMessage {...props} />
				</div>
			</section>
			<article>
				<span>To Upload</span>
				<section>
					{Object.keys(files).map((fileName, index) => {
						let file = files[fileName];
						let isImageFile = file.type.split("/")[0] === "image";
						return (
							<section key={fileName}>
								<div>
									{isImageFile && (
										<img
											src={URL.createObjectURL(file)}
											alt={`file preview ${index}`}
										/>
									)}
									<div data-isImageFile={isImageFile}>
										<span>{file.name}</span>
										<aside>
											<span>{convertBytesToKB(file.size)} kb</span>
											<i className="fas fa-trash-alt" />
										</aside>
									</div>
								</div>
							</section>
						);
					})}
				</section>
			</article>
		</>
	)
}

export default FileInput
