import React from 'react'
import classNames from 'classnames'
import { Activatable } from '../common'

import './Button.scss'

export type ButtonType = 'primary' | 'secondary'

export interface ButtonProps extends Activatable {
	text: string
	onClick: () => void
	type?: ButtonType
	hidden?: boolean
}

export function Button(props: ButtonProps) {
	const buttonType = props.type ?? 'primary'

	const className = classNames(buttonType, { 'hidden': props.hidden })

	return (
		<button className={className} onClick={props.onClick} disabled={props.disabled}>{props.text}</button>
	)
}

export default Button