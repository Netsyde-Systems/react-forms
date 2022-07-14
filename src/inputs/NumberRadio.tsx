import React, { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass, SelectOption } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import Radio, { RadioProps } from './TextRadio'

import './Inputs.scss'
import './Radio.scss'

export interface NumberRadioProps extends InputProps<number> {
	selectOptions: Array<SelectOption<number>>
}

export function NumberRadio(props: NumberRadioProps) {
	let { id, value, onChange, label, errorMessage, required, hidden, selectOptions, disabled } = props

	let textValue: string | undefined = value?.toString()
	let textOnChange = (textValue: string | null) => {
			const numVal = Number(textValue)
			if (textValue === null || isNaN(numVal)) props.onChange(null)
			else onChange(numVal)
	}
	let textSelectOptions: Array<SelectOption<string>> = selectOptions.map(({ text, value }) => { return { text, value: value.toString() } })

	let textProps: RadioProps = {
		id, value: textValue, onChange: textOnChange, label, errorMessage, required, hidden, selectOptions: textSelectOptions, disabled
	}

	return <Radio {...textProps} />
}

export default NumberRadio