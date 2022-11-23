import React, { ChangeEventHandler } from 'react'

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

	const handleAccept = (value: unknown, mask: InputMask<AnyMaskedOptions>, e: any) => { 
		console.log(`value: ${e?.target?.value}`)
		console.log(`unmaskedValue: ${mask.unmaskedValue}`)
		console.log(`typedValue: ${mask.typedValue}`)

		props.onChange(value as string)
	}

	const className = getInputEnvelopeClass(props, 'text', 'input')

	const { id, disabled, placeholder, required } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<IMaskInput value={props.value} unmask={true} mask={mask} onAccept={handleAccept}  {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default MaskedInput
