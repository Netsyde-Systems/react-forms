import React from 'react'

interface ErrorMessageProps {
	errorMessage?: string
}

export function ErrorMessage(props: ErrorMessageProps) {
	if (!props.errorMessage) return null
	else return (
		<span className='input-error'>{props.errorMessage}</span>
	)
}