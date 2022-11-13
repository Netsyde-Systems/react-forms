// Based on widget described here: https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8

import React from 'react'
import { BYTES_PER_KILOBYTE, convertBytesToKB } from '../utilities'
import { getInputEnvelopeClass, InputProps } from './inputs'
import { ErrorMessage } from './ErrorMessage'
import { InputLabel } from './InputLabel'

import './FileInput.scss'

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

const DefaultFileInputTextResources = {
	dragAndDropOr: 'Drag and drop or',
	uploadAFile: 'Upload a File',
	uploadFiles: 'Upload Files',
}

export interface FileInputProps extends InputProps<Array<File>> {
	multiple?: boolean
	maxFileSizeInBytes?: number
	textResources?: Partial<typeof DefaultFileInputTextResources>
}

export function FileInput(props: FileInputProps) {
	let fileInputField = React.useRef<HTMLInputElement>(null)
	let fileLookup = arrayToObject(props.value || [], (file) => file.name)

	const className = getInputEnvelopeClass(props, 'file', 'input')

	const { id, disabled, required, multiple, textResources,
		maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
	} = props

	const filledTextResources = Object.assign({}, DefaultFileInputTextResources, textResources)

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

	const uploadClassName = getInputEnvelopeClass(props, 'upload')

	return (
		<div className={className}>
			<InputLabel {...props} />
			<section className={uploadClassName}>
				<p>{filledTextResources.dragAndDropOr}</p>
				<button type="button" onClick={handleUploadBtnClick} disabled={props.disabled} >
					<i className="fas fa-file-upload" />
					<span>{multiple ? filledTextResources.uploadFiles : filledTextResources.uploadAFile}</span>
				</button>
				<div className={className}>
					<input ref={fileInputField} type='file' title='' value='' onChange={handleNewFileUpload} multiple={multiple} {...{ id, disabled, required }} />
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
											<span>{convertBytesToKB(file.size)} kB</span>
											<i className="fas fa-trash-alt" onClick={() => removeFile(fileName)} />
										</aside>
									</div>
								</div>
							</section>
						)
					})}
				</section>
			</article>
			<ErrorMessage {...props} />
		</div>
	)
}

export default FileInput
