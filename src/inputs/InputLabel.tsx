import React from 'react'
import classNames from 'classnames'

import './InputLabel.scss'

interface InputLabelProps {
	id: string
	label?: string
}

export function InputLabel(props: InputLabelProps) {

	// we add a 'none' class to indicate that there is no label (to allow css to hide the element)
	const className = classNames('input-label', {none: !props.label})

	// we render a space if there is no error so that the span doesn't collapse (prevents form jitter)
	return (
		<label className={className} htmlFor={props.id}>{props.label || ' '}</label>
	)
}

export default InputLabel