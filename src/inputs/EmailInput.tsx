import React from 'react'

import { TextInput } from './TextInput'
import { InputProps } from './inputs'
import { invalidEmailError } from '../validation/validation'

export interface EmailInputProps extends InputProps<string> {
	placeholder?: string
}

export function EmailInput(props: EmailInputProps) {

	const clonedProps = Object.assign({}, props)

	clonedProps.placeholder ??= 'email@server.com'
	clonedProps.errorMessage ??= invalidEmailError(props.value)

	return (
		<TextInput {...clonedProps} />
	)
}

export default EmailInput
