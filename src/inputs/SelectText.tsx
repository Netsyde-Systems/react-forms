import React, { ChangeEventHandler } from 'react'

import { InputProps, SelectOption, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface SelectTextProps extends InputProps<string | null> {
	placeholder?: string
	selectOptions: Array<SelectOption<string>>
 }

 // html options in react can't take a null values
 // bit of a hack fix to allow returning null value.
const NULL_STRING_VALUE = Number.MIN_SAFE_INTEGER.toString()

export function SelectText(props: SelectTextProps) {
	const handleChange: ChangeEventHandler<HTMLSelectElement> = 
		(e) => props.onChange(e.target.value === NULL_STRING_VALUE ? null : e.target.value)

	const className = getInputEnvelopeClass(props, 'select', 'input')

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled, required } = props

	const options = props.selectOptions.map((option, optionIndex) => {
		return (
			<option key={optionIndex} value={option.value}>{option.text}</option>
		)
	})

	options.unshift(<option key='' value={NULL_STRING_VALUE}>{props.placeholder || ''}</option>)

	return (
		<div className={className}>
			<InputLabel {...props} />
			<select value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required }} >
				{options}
			</select>
			<ErrorMessage {...props} />
		</div>
	)
}

export default SelectText