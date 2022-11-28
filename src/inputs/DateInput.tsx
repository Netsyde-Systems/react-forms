import React, { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

import { dateToIsoGmtShortDateString, shortDateStringToDate } from '../utilities'

export function DateInput(props: InputProps<Date>) {

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		// props.onChange(e.target.valueAsDate || undefined)
		const valueAsDate = shortDateStringToDate(e.target.value)
		props.onChange(valueAsDate)
	} 

	const className = getInputEnvelopeClass(props, 'date', 'input')

	const { id, disabled } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input type='date' value={dateToIsoGmtShortDateString(props.value)} onChange={handleChange} {...{ id, disabled }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default DateInput
