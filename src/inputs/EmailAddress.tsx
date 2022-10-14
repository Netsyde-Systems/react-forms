import React from 'react'

import { TextInput } from './TextInput'
import { InputProps } from './inputs'
import { invalidEmailError } from '../validation/validation'

export interface EmailAddressProps extends InputProps<string> {
	placeholder?: string
}

export function EmailAddress(props: EmailAddressProps) {

	const clonedProps = Object.assign({}, props)

	clonedProps.placeholder ??= 'email@server.com'
	clonedProps.errorMessage ??= invalidEmailError(props.value)

	return (
		<TextInput {...clonedProps} />
	)
}

export default EmailAddress
