// Based on widget described here: https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8

import React from 'react'
import { BYTES_PER_KILOBYTE, convertBytesToKB } from '../utilities'
import { getInputEnvelopeClass, InputProps } from './inputs'
import { ErrorMessage } from './ErrorMessage'
import { InputLabel } from './InputLabel'

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 25 * BYTES_PER_KILOBYTE ** 2 // 25 MB
const DEFAULT_EXCLUDED_FILE_EXTENSIONS = ['exe', 'bat']

interface FileLookup {
	[key: string]: File
}

const fileLookupToArray = (lookup: FileLookup) =>
	Object.keys(lookup).map(key => lookup[key])

function arrayToFileLookup(arr: Array<File>, keySelector: (file: File) => string): FileLookup {
	const lookup = arr.reduce((dic, item) => {
		const key = keySelector(item)
		dic[key] = item
		return dic
	}, {} as FileLookup)

	return lookup
}

export interface FileFilter<T> {
	criteria: T
	onRejected?: (file: File) => void
}

export interface FileInputConfig {
	multiple?: boolean
	showFileList?: boolean
	maxFileSizeInBytes?: FileFilter<number>
	maxTotalFileSizeInBytes?: FileFilter<number>
	excludedFileExtensions?: FileFilter<Array<string>>
	acceptedFileExtensions?: FileFilter<Array<string>>
}

export interface FileInputProps extends InputProps<Array<File>>, FileInputConfig {
}

// Note: File Input does not support standard controlProps like the other inputs do (at this time)
export function FileInput(props: FileInputProps) {
	let fileInputField = React.useRef<HTMLInputElement>(null)
	let fileLookup = arrayToFileLookup(props.value || [], (file) => file.name)

	const className = getInputEnvelopeClass(props, 'file', 'input')

	const { id, disabled, readOnly, required, multiple, showFileList, placeholder,
		maxFileSizeInBytes, maxTotalFileSizeInBytes, excludedFileExtensions, acceptedFileExtensions
	} = props

	const filledMaxFileSizeInBytes: FileFilter<number> = Object.assign({},
		maxFileSizeInBytes,
		{ criteria: maxFileSizeInBytes?.criteria ?? DEFAULT_MAX_FILE_SIZE_IN_BYTES }
	)

	const filledMaxTotalFileSizeInBytes: FileFilter<number> = Object.assign({},
		maxTotalFileSizeInBytes,
		{ criteria: maxTotalFileSizeInBytes?.criteria ?? DEFAULT_MAX_FILE_SIZE_IN_BYTES }
	)

	const filledExcludedFileExtensions: FileFilter<Array<string>> = Object.assign({},
		excludedFileExtensions,
		{ criteria: excludedFileExtensions?.criteria ?? DEFAULT_EXCLUDED_FILE_EXTENSIONS }
	)

	const handleUploadBtnClick = () => {
		fileInputField.current?.click()
	}

	const addNewFiles = (newFiles: Array<File>) => {
		let totalFileSize = fileLookupToArray(fileLookup).reduce((acc, file) => acc + file.size, 0)

		for (let file of newFiles) {

			if (file.size > filledMaxFileSizeInBytes.criteria) {
				filledMaxFileSizeInBytes.onRejected?.(file)
				continue
			}

			if (totalFileSize + file.size > filledMaxTotalFileSizeInBytes.criteria) {
				filledMaxTotalFileSizeInBytes.onRejected?.(file)
				continue
			}

			if (filledExcludedFileExtensions.criteria.some(ext => file.name.toLowerCase().endsWith(ext))) {
				filledExcludedFileExtensions.onRejected?.(file)
				continue
			}

			if (acceptedFileExtensions?.criteria?.length && !acceptedFileExtensions.criteria.some(ext => file.name.toLowerCase().endsWith(ext))) {
				acceptedFileExtensions.onRejected?.(file)
				continue
			}

			if (!multiple) {
				return { file }
			}
			fileLookup[file.name] = file
		}
		return { ...fileLookup }
	}

	const handleFileUpdate = (files: any) => {
		const filesAsArray = fileLookupToArray(files)
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

	const uploadSection = readOnly ? null : (
		<section className={uploadClassName}>
			<button type="button" onClick={handleUploadBtnClick} disabled={disabled || readOnly} >
				<i className="folder" />
				<span>{placeholder ?? '🡅'}</span>
			</button>
			<div className={className}>
				<input ref={fileInputField} type='file' title='' value='' onChange={handleNewFileUpload} multiple={multiple} {...{ id, disabled, readOnly, required }} />
			</div>
		</section>
	)

	const fileList = !showFileList ? null : (
		<article className='preview'>
			<section className='file-list'>
				{Object.keys(fileLookup).map((fileName, index) => {
					const file = fileLookup[fileName]
					const isImageFile = file.type.split("/")[0] === "image"
					const deleteIcon = disabled || readOnly ? null :
						<i className="trash" onClick={() => removeFile(fileName)} />

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
										{deleteIcon}
									</aside>
								</div>
							</div>
						</section>
					)
				})}
			</section>
		</article>
	)

	return (
		<div className={className}>
			<InputLabel {...props} />
			{uploadSection}
			{fileList}
			<ErrorMessage {...props} />
		</div>
	)
}

export default FileInput
