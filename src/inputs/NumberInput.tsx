import React, { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export function NumberInput(props: InputProps<number>) {

	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value === '' ? undefined : Number(e.target.value))

	const className = getInputEnvelopeClass(props, 'text', 'input')

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
