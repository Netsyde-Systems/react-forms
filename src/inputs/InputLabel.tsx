import React from 'react'

interface InputLabelProps {
	id: string
	label?: string
}

export function InputLabel(props: InputLabelProps) {
	if (!props.label) return null
	else return (
		<label htmlFor={props.id}>{props.label}</label>
	)
}

export default InputLabel