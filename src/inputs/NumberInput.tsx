import React, { ChangeEventHandler } from 'react'

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

	const className = getInputEnvelopeClass(props, 'text', 'input')

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled, placeholder, required } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input type='number' value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default NumberInput
