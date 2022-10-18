import React from 'react'

import { TextInput } from './TextInput'
import { InputProps } from './inputs'
import { emailValidator } from '../validation/validation'

export interface EmailAddressProps extends InputProps<string> {
	placeholder?: string
}

export function EmailAddress(props: EmailAddressProps) {

	const clonedProps = Object.assign({}, props)

	clonedProps.placeholder ??= 'email@server.com'
	const errors = emailValidator(props.value, '')

	if (errors.length > 0) {
		clonedProps.errorMessage ??= errors[0]
	}

	return (
		<TextInput {...clonedProps} />
	)
}

export default EmailAddress
