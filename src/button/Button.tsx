import React from 'react'
import { Activatable } from '../common'

import './Button.scss'

export type ButtonType = 'primary' | 'secondary'

export interface ButtonProps extends Activatable {
	text: string
	onClick: () => void
	type?: ButtonType
}

export function Button(props: ButtonProps) {
	const buttonType = props.type ?? 'primary'

	return (
		<button className={buttonType} onClick={props.onClick} disabled={props.disabled}>{props.text}</button>
	)
}

export default Button