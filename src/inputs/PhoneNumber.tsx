import React from 'react'

import { InputProps } from './inputs'

import './Inputs.scss'
import { MaskedInput } from './MaskedInput'

export interface PhoneNumberProps extends InputProps<number> {}

export function PhoneNumber(props: PhoneNumberProps) {
	const handleChange = (value: string | null) => props.onChange(value === '' ? null : Number(value))

	return (
		<MaskedInput {...props}  value={props.value?.toString() || ''} placeholder='(555)123-4567x12345' onChange={handleChange} mask='(000)000-0000x[00000]' />
	)
} 

export default PhoneNumber
