import { ChangeEventHandler, TextareaHTMLAttributes } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

import './Inputs.scss'

export interface TextAreaProps extends InputProps<string, TextareaHTMLAttributes<any>> { }

export function TextArea(props: TextAreaProps) {
	if (props.readOnly) return <ReadonlyField {...props} />

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> =
		(e) => props.onChange(e.target.value)

	const className = getInputEnvelopeClass(props, 'text', 'area')

	const { id, disabled, required, placeholder, controlProps } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<textarea {...controlProps} value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default TextArea
