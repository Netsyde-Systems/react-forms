import React, { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

import { toIsoGmtDateString } from '../utilities'

export interface DateInputProps extends InputProps<Date> { }

export function DateInput(props: DateInputProps) {
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log(e.target.value)
		console.log(e.target.valueAsDate)
		props.onChange(e.target.valueAsDate)
	} 

	const className = getInputEnvelopeClass(props, 'date', 'input')

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input type='date' value={toIsoGmtDateString(props.value)} onChange={handleChange} {...{ id, disabled }} />
			<ErrorMessage {...props} />
		</div>
	)
}