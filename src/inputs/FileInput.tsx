// Based on widget described here: https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8

import React from 'react'
import { getInputEnvelopeClass, InputProps } from './inputs'
import { ErrorMessage } from './ErrorMessage'

import './FileInput.scss'

const BYTES_PER_KILOBYTE = 1024
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5 * BYTES_PER_KILOBYTE ** 2 // 5 MB

const objectToArray = (obj: any) => 
	Object.keys(obj).map(key => obj[key])

function arrayToObject<T>(arr: Array<T>, keySelector: (obj: T) => string) {
	const dic = arr.reduce((obj, item) => {
		const key = keySelector(item)
		obj[key] = item
		return obj
	}, {} as any)

	return dic
}

const convertBytesToKB = (bytes: number) =>
	Math.round(bytes / BYTES_PER_KILOBYTE)

export interface FileInputProps extends InputProps<Array<File>> {
	multiple?: boolean
	maxFileSizeInBytes?: number
}

export function FileInput(props: FileInputProps) {
	let fileInputField = React.useRef<HTMLInputElement>(null)
	let fileLookup = arrayToObject(props.value || [], (file) => file.name)

	const className = getInputEnvelopeClass(props, 'file', 'input')

	const { id, disabled, required, multiple = true, maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES } = props

	const handleUploadBtnClick = () => {
		fileInputField.current?.click()
	}

	const addNewFiles = (newFiles: Array<File>) => {
		for (let file of newFiles) {
			if (file.size < maxFileSizeInBytes) {
				if (!multiple) {
					return { file }
				}
				fileLookup[file.name] = file
			}
		}
		return { ...fileLookup }
	}

	const handleFileUpdate = (files: any) => {
		const filesAsArray = objectToArray(files)
		props.onChange(filesAsArray)
	}

	const handleNewFileUpload: React.ChangeEventHandler<HTMLInputElement> = (e: any) => {
		const { files: newFiles } = e.target
		if (newFiles.length) {
			let updatedFiles = addNewFiles(newFiles)
			handleFileUpdate(updatedFiles)
		}
	}

	const removeFile = (fileName: string) => {
		const newValue = Object.assign({}, fileLookup)
		delete newValue[fileName]
		handleFileUpdate({ ...newValue })
	}

	return (
		<div className={className}>
			<section className='upload'>
				<label>{props.label}</label>
				<p>Drag and drop or</p>
				<button type="button" onClick={handleUploadBtnClick}>
					<i className="fas fa-file-upload" />
					<span> Upload {multiple ? "files" : "a file"}</span>
				</button>
				<div className={className}>
					<input ref={fileInputField} type='file' title='' value='' onChange={handleNewFileUpload} multiple={multiple} {...{ id, disabled, required }} />
					<ErrorMessage {...props} />
				</div>
			</section>
			<article className='preview'>
				<section className='file-list'>
					{Object.keys(fileLookup).map((fileName, index) => {
						let file = fileLookup[fileName]
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
