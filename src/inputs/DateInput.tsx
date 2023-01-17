import { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

import './Inputs.scss'

import { dateToIsoGmtShortDateString, shortDateStringToDate } from '../utilities'


export function DateInput(props: InputProps<Date>) {
	const value = dateToIsoGmtShortDateString(props.value)

	if (props.readOnly) {
		return <ReadonlyField {...Object.assign({}, props, { value }) as InputProps<string>} />
	}

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const valueAsDate = shortDateStringToDate(e.target.value)
		props.onChange(valueAsDate)
	} 

	const className = getInputEnvelopeClass(props, 'date', 'input')

	const { id, disabled } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input type='date' value={value} onChange={handleChange} {...{ id, disabled }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default DateInput
