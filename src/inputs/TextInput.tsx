import React, { ChangeEventHandler } from 'react'
import classNames from 'classnames'

import { InputProps } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './TextInput.scss'

export interface TextInputProps extends InputProps<string> { }

export function TextInput(props: TextInputProps) {
	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value)

	const className = classNames('text', 'input', { 'has-errors': !!props.errorMessage })

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input id={props.id} value={props.value} onChange={handleChange} disabled={props.isDisabled} readOnly={props.isReadonly} />
			<ErrorMessage {...props} />
		</div>
	)
}