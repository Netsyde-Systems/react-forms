import React, { ChangeEventHandler } from 'react'

import { SelectProps, getInputEnvelopeClass } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'
import './Radio.scss'

export interface TextRadioProps extends SelectProps<string> {
}

export function TextRadio(props: TextRadioProps) {

	const handleOptionChange: ChangeEventHandler<HTMLInputElement> = (e) => props.onChange(e.target.value) 

	const className = getInputEnvelopeClass(props, 'radio', 'input')

	const radios = props.selectOptions.map((option, optionIndex) => {
		const radioId = props.id + optionIndex
		return (
			<div key={optionIndex}>
				<input id={radioId} name={props.id} type='radio' value={option.value} checked={props.value === option.value} onChange={handleOptionChange} disabled={props.disabled} />
				<label htmlFor={props.id + optionIndex}>{option.text}</label>
			</div>
		)
	})

	return (
		<div className={className}>
			<InputLabel {...props} />
			{radios}
			<ErrorMessage {...props} />
		</div>
	)
}

export default TextRadio
