import React from 'react'

import './Button.scss'

export type ButtonType = 'primary' | 'secondary'

export interface ButtonProps {
	text: string
	onClick: () => void
	type?: ButtonType
}

export function Button(props: ButtonProps) {
	const buttonType = props.type ?? 'primary'

	return (
		<button className={buttonType} onClick={props.onClick}>{props.text}</button>
	)
}

export default Button