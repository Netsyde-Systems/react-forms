import { AnyMaskedOptions } from 'imask'
import React from 'react'

import { InputProps } from './inputs'

import './Inputs.scss'
// import { MaskedInput } from './MaskedInput'
import { MaskedInput } from './MaskedInput2'

export function Currency(props: InputProps<number>) {

	const handleChange = (textValue?: string) => {
		console.log(`textValue: ${textValue}`)
		const numVal = Number(textValue)
		if (textValue === '' || isNaN(numVal)) props.onChange(undefined)
		else props.onChange(numVal / 100.0)
	}

	const dollarMask: AnyMaskedOptions = {
		mask: '$curr',
		blocks: {
			curr: {
				mask: Number,
				// thousandsSeparator: ',',
				/*
				scale: 2, 
				radix: '.', 
				padFractionalZeros: true
				*/
			}
		}
	}

	return (
		<MaskedInput {...props} value={props.value?.toString() || ''} placeholder='$1,234.56' onChange={handleChange} mask={dollarMask} />
	)
}

export default Currency
