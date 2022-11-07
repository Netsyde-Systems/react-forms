// Based on widget described here: https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8

import React from 'react'
import { getInputEnvelopeClass, InputProps } from './inputs'
import { ErrorMessage } from './ErrorMessage'

import './FileInput.scss'

const KILO_BYTES_PER_BYTE = 1000
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000

const convertNestedObjectToArray = (nestedObj: any) =>
	Object.keys(nestedObj).map(key => nestedObj[key])

const convertBytesToKB = (bytes: number) =>
	Math.round(bytes / KILO_BYTES_PER_BYTE)

export interface FileInputProps extends InputProps<any> {
	multiple?: boolean
	maxFileSizeInBytes?: number
}

export const FileInput: React.FC<FileInputProps> = (props) => {
	let fileInputField = React.useRef<HTMLInputElement>(null)
	const [files, setFiles] = React.useState<any>({})

	const className = getInputEnvelopeClass(props, 'file', 'input')

	const { id, disabled, required, multiple = false, maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES } = props

	const handleUploadBtnClick = () => {
		fileInputField.current?.click()
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

	const callUpdateFilesCb = (files: any) => {
		const filesAsArray = convertNestedObjectToArray(files)
		props.onChange(filesAsArray)
	}

	const handleNewFileUpload: React.ChangeEventHandler<HTMLInputElement> = (e: any) => {
		const { files: newFiles } = e.target
		if (newFiles.length) {
			let updatedFiles = addNewFiles(newFiles)
			setFiles(updatedFiles)
			callUpdateFilesCb(updatedFiles)
		}
	}

	const removeFile = (fileName: string) => {
		delete files[fileName]
		setFiles({ ...files })
		callUpdateFilesCb({ ...files })
	}

	return (
		<div className={className}>
			<section className='upload'>
				<label>{props.label}</label>
				<p>Drag and drop or</p>
				<button type="button" onClick={handleUploadBtnClick}>
					<i className="fas fa-file-upload" />
					<span> Upload {props.multiple ? "files" : "a file"}</span>
				</button>
				<div className={className}>
					<input ref={fileInputField} type='file' title='' value='' onChange={handleNewFileUpload} multiple={multiple} {...{ id, disabled, required }} />
					<ErrorMessage {...props} />
				</div>
			</section>
			<article className='preview'>
				<section className='file-list'>
					{Object.keys(files).map((fileName, index) => {
						let file = files[fileName]
						let isImageFile = file.type.split("/")[0] === "image"
						return (
							<section key={fileName} className='file'>
								<div>
									{isImageFile && (
										<img
											src={URL.createObjectURL(file)}
											alt={`file preview ${index}`}
										/>
									)}
									<div data-isimagefile={isImageFile} className='meta-data'>
										<span className='filename'>{file.name}</span>
										<aside>
											<span>{convertBytesToKB(file.size)} kb</span>
											<i className="fas fa-trash-alt" onClick={() => removeFile(fileName)} />
										</aside>
									</div>
								</div>
							</section>
						)
					})}
				</section>
			</article>
		</div>
	)
}

export default FileInput
