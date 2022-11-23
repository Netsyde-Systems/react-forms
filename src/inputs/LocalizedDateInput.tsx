import React from 'react'

import DatePicker from 'react-datepicker'

import { dateToIsoGmtShortDateString } from '../utilities'
import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'
import 'react-datepicker/dist/react-datepicker.css'

export interface LocalizedDateInputProps extends InputProps<Date> { }

export function LocalizedDateInput(props: LocalizedDateInputProps) {
	const handleChange = (date: Date | null) => {
		props.onChange(date || undefined)
	} 

	const className = getInputEnvelopeClass(props, 'date', 'input')

	const { id, disabled } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<DatePicker onChange={handleChange} value={dateToIsoGmtShortDateString(props.value)} locale={props.locale} {...{ id, disabled }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default LocalizedDateInput
