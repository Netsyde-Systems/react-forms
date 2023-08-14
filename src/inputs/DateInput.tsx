import { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

import { dateToIsoGmtShortDateString, shortDateStringToDate } from '../utilities'
import { MinMaxValidatorSpecification } from '../validation/validation'

export interface DateInputProps extends MinMaxValidatorSpecification<Date>, InputProps<Date> { }

export function DateInput(props: DateInputProps) {
	const value = dateToIsoGmtShortDateString(props.value)

	if (props.readOnly) {
		return <ReadonlyField {...Object.assign({}, props, { value }) as InputProps<string>} />
	}

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const valueAsDate = shortDateStringToDate(e.target.value)
		props.onChange(valueAsDate)
	} 

	const className = getInputEnvelopeClass(props, 'date', 'input')

	const { id, disabled, controlProps } = props

	const minMax = {
		min: props.min ? dateToIsoGmtShortDateString(props.min) : undefined,
		max: props.max ? dateToIsoGmtShortDateString(props.max) : undefined
	}

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input {...controlProps} type='date' value={value} onChange={handleChange} {...minMax} {...{ id, disabled }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default DateInput
