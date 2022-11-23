import React, { ChangeEventHandler } from 'react'

// Uses https://imask.js.org/ for masking logic
import IMask, { AnyMaskedOptions, Masked } from 'imask'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface MaskTestFunction {
	(val: string): boolean
}

export interface MaskedInputProps extends InputProps<string> {
	placeholder?: string
	mask: string | AnyMaskedOptions
	type?: string
}

export function MaskedInput(props: MaskedInputProps) {
	let mask: Masked<any>
	
	if (typeof props.mask === 'string' ) {
		mask = IMask.createMask({mask: props.mask})
	}
	else mask = IMask.createMask(props.mask)

	const maskedValue = mask.resolve(props.value || '')

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => { 
		console.log(`value: ${e.target.value}`)
		console.log(`unmaskedValue: ${mask.unmaskedValue}`)
		console.log(`typedValue: ${mask.typedValue}`)

		mask.resolve(e.target.value)
		props.onChange(mask.unmaskedValue)
	}

	const className = getInputEnvelopeClass(props, 'text', 'input')

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
