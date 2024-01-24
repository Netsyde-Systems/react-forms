import { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'
import { ControlledInput } from './ControlledInput'

export function TextInput(props: InputProps<string>) {
	if (props.readOnly) return <ReadonlyField {...props} />

	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.value)

	const className = getInputEnvelopeClass(props, 'text', 'input')

	const { id, disabled, required, placeholder, controlProps } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<ControlledInput {...controlProps} value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default TextInput
