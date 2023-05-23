import { SelectProps, SelectOption, InputProps } from './inputs'
import { TextSelect } from './TextSelect'
import { ReadonlyField } from './ReadonlyField'

import './Inputs.scss'

export function NumberSelect(props: SelectProps<number>) {
	if (props.readOnly) {
		const selProps = Object.assign({}, props) as InputProps<string>
		const opt = props.selectOptions.find(o => o.value === props.value)

		selProps.value = opt?.text || ''

		return <ReadonlyField {...selProps} />
	}

	let { value, onChange, selectOptions } = props

	let textValue: string | undefined = value?.toString()
	let textOnChange = (textValue?: string) => {
			const numVal = Number(textValue)
			if (isNaN(numVal)) props.onChange(undefined)
			else onChange(numVal)
	}

	let textSelectOptions: Array<SelectOption<string>> = selectOptions.map(({ text, value }) => { return { text, value: value.toString() } })

	let textProps: SelectProps<string> = { ...props, value: textValue, onChange: textOnChange, selectOptions: textSelectOptions }

	return <TextSelect {...textProps} />
}

export default NumberSelect