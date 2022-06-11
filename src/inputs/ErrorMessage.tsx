import React from 'react'
import classNames from 'classnames'

import './ErrorMessage.scss'

interface ErrorMessageProps {
	errorMessage?: string
}

export function ErrorMessage(props: ErrorMessageProps) {

	// we add a 'none' class to indicate that there are no errors (to allow css to hide the element)
	const className = classNames('error-message', {none: !props.errorMessage})

	// we render a space if there is no error so that the span doesn't collapse (prevents form jitter)
	return (
		<span className={className}>{props.errorMessage || ' '}</span>
	)
}