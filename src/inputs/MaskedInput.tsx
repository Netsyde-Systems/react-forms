import React from 'react'

// Uses https://imask.js.org/ for masking logic
import IMask, { AnyMaskedOptions, InputMask, Masked } from 'imask'
import { IMaskInput } from 'react-imask'

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

	mask.value = props.value ?? ''

	const handleAccept = (value: unknown, mask: InputMask<AnyMaskedOptions>, e: any) => { 
		/*
		console.log(`value: ${value}`)
		console.log(`mask.unmaskedValue: ${mask.unmaskedValue}`)
		console.log(`mask.typedValue: ${mask.typedValue}`)
		console.log(`e.target.value: ${e?.target?.value}`)
		*/

		props.onChange(value as string)
	}

	const className = getInputEnvelopeClass(props, 'text', 'input')

	const { id, disabled, placeholder, required } = props

	// TODO: try adding an input ref to see if it will help preserve state across separator and radix updates
	return (
		<div className={className}>
			<InputLabel {...props} />
			<IMaskInput value={mask.value} unmask={true} mask={mask} onAccept={handleAccept}  {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default MaskedInput
