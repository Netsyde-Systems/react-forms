import { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'
import './CheckBox.scss'

export function CheckBox(props: InputProps<boolean>) {

	const handleChange: ChangeEventHandler<HTMLInputElement> =
		(e) => !props.readOnly && props.onChange(e.target.checked)

	const className = getInputEnvelopeClass(props, 'checkbox', 'input')

	const { id, disabled, required, readOnly } = props

	return (
		<div className={className}>
			<input type="checkbox" checked={!!props.value} onChange={handleChange} {...{ id, disabled, required, readOnly }} />
			<InputLabel {...props} /><br />
			<ErrorMessage {...props} />
		</div>
	)
}

export default CheckBox
