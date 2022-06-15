import React, { ChangeEventHandler } from 'react'
import classNames from 'classnames'

import { InputProps } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface TextInputProps extends InputProps<string> {
	placeholder?: string
 }

export function TextInput(props: TextInputProps) {
	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value)

	const className = classNames('text', 'input', { 'has-errors': !!props.errorMessage })

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled, readOnly, placeholder } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, readOnly, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}