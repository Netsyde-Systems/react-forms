import React, { ChangeEventHandler } from 'react'
// import classNames from 'classnames'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface NumberInputProps extends InputProps<number> {
	placeholder?: string
 }

export function NumberInput(props: NumberInputProps) {
	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value === '' ? null : Number(e.target.value))

	// const className = classNames('text', 'input', { 'has-errors': !!props.errorMessage })
	const className = getInputEnvelopeClass(props, 'text', 'input')

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled, placeholder } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input type='number' value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}