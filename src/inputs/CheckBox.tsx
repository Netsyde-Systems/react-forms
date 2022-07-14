import React, { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'
import './CheckBox.scss'

export interface CheckBoxProps extends InputProps<boolean> { }

export function CheckBox(props: CheckBoxProps) {
	const handleChange: ChangeEventHandler<HTMLInputElement> =
		(e) => props.onChange(e.target.checked)

	const className = getInputEnvelopeClass(props, 'checkbox', 'input')

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled } = props

	return (
		<div className={className}>
			<input type="checkbox" checked={!!props.value} onChange={handleChange} {...{ id, disabled }} />
			<InputLabel {...props} /><br />
			<ErrorMessage {...props} />
		</div>
	)
}

export default CheckBox
