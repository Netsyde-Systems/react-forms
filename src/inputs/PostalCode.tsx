import React from 'react'

import { InputProps } from './inputs'

import './Inputs.scss'
import { MaskedInput } from './MaskedInput'

export interface PostalCodeProps extends InputProps<string> {}

export function PostalCode(props: PostalCodeProps) {
	const handleChange = (val?: string) => props.onChange(val?.toUpperCase() || '')

	return (
		<MaskedInput {...props}  value={props.value?.toString() || ''} placeholder='A1A 1A1' onChange={handleChange} mask='a0a 0a0' />
	)
} 

export default PostalCode
