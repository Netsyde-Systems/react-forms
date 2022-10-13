import React from 'react'

import { InputProps } from './inputs'

import './Inputs.scss'
import { MaskedInput } from './MaskedInput'

export interface PhoneNumberProps extends InputProps<number> {}

export function PhoneNumber(props: PhoneNumberProps) {

	const handleChange = (textValue?: string) => {
			const numVal = Number(textValue)
			if (isNaN(numVal)) props.onChange(undefined)
			else props.onChange(numVal)
	}

	return (
		<MaskedInput {...props} type='tel' value={props.value?.toString() || ''} placeholder='(555)123-4567x12345' onChange={handleChange} mask='(000)000-0000x[00000]' />
	)
} 

export default PhoneNumber
