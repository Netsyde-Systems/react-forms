import React, { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass, SelectOption } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'
import './Radio.scss'

export interface RadioProps extends InputProps<string> {
	selectOptions: Array<SelectOption<string>>
}

export function Radio(props: RadioProps) {


	const handleOptionChange: ChangeEventHandler<HTMLInputElement> = (e) => props.onChange(e.target.value) 

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below

	// const className = classNames('checkbox', 'input', { 'has-errors': !!props.errorMessage }, { 'is-hidden': props.isHidden })
	const className = getInputEnvelopeClass(props, 'radio', 'input')

	const { disabled } = props

	const radios = props.selectOptions.map((option, optionIndex) => {
		const radioId = props.id + optionIndex
		return (
			<div key={optionIndex}>
				<input id={radioId} name={props.id} type='radio' value={option.value} checked={props.value == option.value} onChange={handleOptionChange} {...{ disabled }} />
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

export default Radio