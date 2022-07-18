import React from 'react'

import { SelectProps, SelectOption } from './inputs'
import TextSelect, { TextSelectProps } from './TextSelect'

import './Inputs.scss'

export interface NumberSelectProps extends SelectProps<number> {
	placeholder?: string
 }

export function NumberSelect(props: NumberSelectProps) {
	let { id, value, onChange, label, errorMessage, required, hidden, placeholder, selectOptions, disabled } = props

	let textValue: string | undefined = value?.toString()
	let textOnChange = (textValue: string | null) => {
			const numVal = Number(textValue)
			if (textValue === null || isNaN(numVal)) props.onChange(null)
			else onChange(numVal)
	}
	let textSelectOptions: Array<SelectOption<string>> = selectOptions.map(({ text, value }) => { return { text, value: value.toString() } })

	let textProps: TextSelectProps = {
		id, value: textValue, onChange: textOnChange, label, errorMessage, required, hidden, placeholder, selectOptions: textSelectOptions, disabled
	}

	return <TextSelect {...textProps} />
}

export default NumberSelect