import { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

// added since the controlled (regular) text input appears to interfere with the currency control that depends on it
export function TextInputUncontrolled(props: InputProps<string>) {
	if (props.readOnly) return <ReadonlyField {...props} />

	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value)

	const className = getInputEnvelopeClass(props, 'text', 'input')

	const { id, disabled, required, placeholder, controlProps } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input {...controlProps} value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default TextInputUncontrolled
