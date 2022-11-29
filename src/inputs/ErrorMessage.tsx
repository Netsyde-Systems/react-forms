import React from 'react'
import classNames from 'classnames'

import './ErrorMessage.scss'
import { InputProps } from './inputs'

export function ErrorMessage(props: InputProps<any>) {

	// an error message explicitly set to false means we don't want to reserve space for it when empty (which is the default to avoid jitter)
	// useful for tabular forms where error messages may be rendered elsewhere
	const errorText = props.errorMessage === false ? null : (props.errorMessage)

	// we add a hidden class to indicate that there are no errors (to allow css to hide the padded element)
	const className = classNames('error-message', { hidden: !errorText, collapsed: props.errorMessage === false })
	return (
		<span className={className}>{errorText}</span>
	)
}

export default ErrorMessage
