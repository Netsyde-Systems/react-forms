import React from 'react'

import { TextInput } from './TextInput'
import { InputProps } from './inputs'
import { isValidEmail } from '../validation/validation'

export interface EmailAddressProps extends InputProps<string> {
	placeholder?: string
}

export function EmailAddress(props: EmailAddressProps) {

	const clonedProps = Object.assign({}, props)

	clonedProps.placeholder ??= 'email@server.com'
	clonedProps.errorMessage ??= (!props.value || isValidEmail(props.value)) ? undefined : 'Invalid email'

	return (
		<TextInput {...clonedProps} />
	)
}

export default EmailAddress
