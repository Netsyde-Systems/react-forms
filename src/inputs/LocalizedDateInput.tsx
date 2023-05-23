import DatePicker from 'react-datepicker'

import { dateToIsoGmtShortDateString } from '../utilities'
import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

import './Inputs.scss'
import 'react-datepicker/dist/react-datepicker.css'

// Note: Localized Date Input does not support standard controlProps like the other inputs do (at this time)
export function LocalizedDateInput(props: InputProps<Date>) {
	const value = dateToIsoGmtShortDateString(props.value)

	if (props.readOnly) {
		return <ReadonlyField {...Object.assign({}, props, { value }) as InputProps<string>} />
	}

	const handleChange = (date: Date | null) => {
		props.onChange(date || undefined)
	} 

	const className = getInputEnvelopeClass(props, 'date', 'input')

	const { id, disabled } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<DatePicker onChange={handleChange} value={value} locale={props.locale} {...{ id, disabled }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default LocalizedDateInput
