import React from 'react'
import { Button, ButtonProps } from '../inputs/Button'

import './Well.scss'

export interface WellProps extends React.PropsWithChildren {
	title?: string
	buttonDefs?: Array<ButtonProps>
}

export function Well(props: WellProps) {
	return (
		<div className='well'>
			{WellHeader(props.title)}

			<div className='well-contents'>
				{props.children}
			</div>

			{WellButtons(props.buttonDefs)}
		</div>
	)
}

export default Well

function WellHeader(title?: string) {
	if (!title) return null
	else return (
		<div className='well-header'>
			{title}
		</div>
	)
}

function WellButtons(buttonDefs?: Array<ButtonProps>) {
	if (!buttonDefs) return null
	else {
		const buttonSections = buttonDefs.map((buttonDef, buttonIndex) => (
			<div key={buttonIndex} className='well-button-wrapper'>
				<Button {...buttonDef} ></Button>
			</div>
		))

		return (
			<div className='well-buttons'>
				{buttonSections}
			</div>
		)
	}
}