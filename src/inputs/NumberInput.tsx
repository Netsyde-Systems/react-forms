import { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

import './Inputs.scss'

export function NumberInput(props: InputProps<number>) {
	if (props.readOnly) {
		const value = props.value?.toString() 
		const roProps = Object.assign({}, props, { value }) as InputProps<string>

		return <ReadonlyField {...roProps} />
	}

	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value === '' ? undefined : Number(e.target.value))

	const className = getInputEnvelopeClass(props, 'text', 'input')

	const { id, disabled, placeholder, required } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input type='number' value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default NumberInput
