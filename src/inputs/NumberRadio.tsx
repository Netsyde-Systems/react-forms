import { SelectProps, SelectOption } from './inputs'
import { TextRadio } from './TextRadio'

export function NumberRadio(props: SelectProps<number>) {
	let { value, onChange, selectOptions } = props

	let textValue: string | undefined = value?.toString()
	let textOnChange = (textValue?: string) => {
			const numVal = Number(textValue)
			if (isNaN(numVal)) props.onChange(undefined)
			else onChange(numVal)
	}

	let textSelectOptions: Array<SelectOption<string>> = selectOptions.map(({ text, value, disabled }) => { return { text, value: value.toString(), disabled } })

	let textProps: SelectProps<string> = { ...props, value: textValue, onChange: textOnChange, selectOptions: textSelectOptions }

	return <TextRadio {...textProps} />
}

export default NumberRadio