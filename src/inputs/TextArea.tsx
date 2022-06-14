import React, { ChangeEventHandler } from 'react'
import classNames from 'classnames'

import { InputProps } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './TextArea.scss'

export interface TextAreaProps extends InputProps<string> {
	rows?: number
	placeholder?: string
 }

export function TextArea(props: TextAreaProps) {
	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value)

	const className = classNames('text', 'textarea', { 'has-errors': !!props.errorMessage })

	return (
		<div className={className}>
			<InputLabel {...props} />
			<textarea id={props.id} value={props.value} disabled={props.isDisabled} readOnly={props.isReadonly} placeholder={props.placeholder} rows={props.rows} />
			<ErrorMessage {...props} />
		</div>
	)
}