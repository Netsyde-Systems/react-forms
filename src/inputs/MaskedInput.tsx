import React, { ChangeEventHandler } from 'react'

// Uses https://imask.js.org/ for masking logic
import IMask from 'imask'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface MaskTestFunction {
	(val: string): boolean
}

export interface MaskedInputProps extends InputProps<string> {
	placeholder?: string
	mask: string | RegExp | MaskTestFunction
	type?: string
}

export function MaskedInput(props: MaskedInputProps) {

	const mask = IMask.createMask({ mask: props.mask as any })

	const maskedValue = mask.resolve(props.value || '')

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => { 
		mask.resolve(e.target.value)
		props.onChange(mask.unmaskedValue)
	}

	const className = getInputEnvelopeClass(props, 'text', 'input')

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below
	const { id, disabled, placeholder, required } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<input type={props.type} value={maskedValue} onChange={handleChange} {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default MaskedInput
