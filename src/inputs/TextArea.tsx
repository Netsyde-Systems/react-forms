import React, { ChangeEventHandler } from 'react'
// import classNames from 'classnames'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface TextAreaProps extends InputProps<string> {
	rows?: number
	cols?: number
	placeholder?: string
}

export function TextArea(props: TextAreaProps) {
	const handleChange: ChangeEventHandler<HTMLTextAreaElement> =
		(e) => props.onChange(e.target.value)

	// const className = classNames('text', 'area', { 'has-errors': !!props.errorMessage })
	const className = getInputEnvelopeClass(props, 'text', 'area')

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled, required, placeholder, rows, cols } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<textarea value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required, placeholder, rows, cols }} />
			<ErrorMessage {...props} />
		</div>
	)
}