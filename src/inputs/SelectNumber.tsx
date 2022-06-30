import React from 'react'

import { InputProps, SelectOption } from './inputs'
import SelectText, { SelectTextProps } from './SelectText'

import './Inputs.scss'

export interface SelectNumberProps extends InputProps<number | null> {
	placeholder?: string
	selectOptions: Array<SelectOption<number>>
 }

export function SelectNumber(props: SelectNumberProps) {
	let { id, value, onChange, label, errorMessage, required, hidden, placeholder, selectOptions, disabled } = props

	let textValue: string | undefined = value?.toString()
	let textOnChange = (textValue: string | null) => {
			const numVal = Number(textValue)
			if (textValue === null || isNaN(numVal)) props.onChange(null)
			else onChange(numVal)
	}
	let textSelectOptions: Array<SelectOption<string>> = selectOptions.map(({ text, value }) => { return { text, value: value.toString() } })

	let textProps: SelectTextProps = {
		id, value: textValue, onChange: textOnChange, label, errorMessage, required, hidden, placeholder, selectOptions: textSelectOptions, disabled
	}

	return <SelectText {...textProps} />
}

export default SelectNumber