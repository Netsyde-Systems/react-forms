import React from 'react'

import { SelectProps, SelectOption } from './inputs'
import TextRadio from './TextRadio'

import './Inputs.scss'
import './Radio.scss'

export function NumberRadio(props: SelectProps<number>) {
	let { id, value, onChange, label, errorMessage, required, hidden, selectOptions, disabled } = props

	let textValue: string | undefined = value?.toString()
	let textOnChange = (textValue?: string) => {
			const numVal = Number(textValue)
			if (isNaN(numVal)) props.onChange(undefined)
			else onChange(numVal)
	}

	let textSelectOptions: Array<SelectOption<string>> = selectOptions.map(({ text, value }) => { return { text, value: value.toString() } })

	let textProps: SelectProps<string> = {
		id, value: textValue, onChange: textOnChange, label, errorMessage, required, hidden, selectOptions: textSelectOptions, disabled
	}

	return <TextRadio {...textProps} />
}

export default NumberRadio