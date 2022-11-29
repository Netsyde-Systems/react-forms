import React from 'react'

import { AnyMaskedOptions } from 'imask'
import { InputProps } from './inputs'
import { MaskedInput } from './MaskedInput'

import './Inputs.scss'

export function Currency(props: InputProps<number>) {

	const handleChange = (textValue?: string) => {
		console.log(`currency textValue: ${textValue}`)
		const numVal = Number(textValue)
		if (textValue === '' || isNaN(numVal)) props.onChange(undefined)
		else props.onChange(numVal)
	}

	const dollarMask: AnyMaskedOptions = {
		mask: '$curr',
		blocks: {
			curr: {
				mask: Number,
				thousandsSeparator: ',',
				radix: '.', 
			}
		}
	}

	return (
		<MaskedInput {...props} value={props.value?.toString() || ''} placeholder='$' onChange={handleChange} mask={dollarMask} />
	)
}

export default Currency
