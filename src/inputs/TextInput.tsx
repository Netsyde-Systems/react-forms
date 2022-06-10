import React, { ChangeEventHandler } from 'react'
import { InputProps } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './TextInput.scss'

export interface TextInputProps extends InputProps<string> { }

export function TextInput(props: TextInputProps) {
	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value)

	return (
		<div className='text input'>
			<InputLabel {...props} />
			<input id={props.id} value={props.value} onChange={handleChange} disabled={props.isDisabled} readOnly={props.isReadonly} />
			<ErrorMessage {...props} />
		</div>
	)
}