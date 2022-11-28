import React, { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface TextAreaProps extends InputProps<string> {
	rows?: number
	cols?: number
}

export function TextArea(props: TextAreaProps) {

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> =
		(e) => props.onChange(e.target.value)

	const className = getInputEnvelopeClass(props, 'text', 'area')

	const { id, disabled, required, placeholder, rows, cols } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<textarea value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required, placeholder, rows, cols }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default TextArea
