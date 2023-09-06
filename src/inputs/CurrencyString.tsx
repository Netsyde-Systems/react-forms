import { InputProps } from './inputs'
import { TextInput } from './TextInput'
import { getCurrency } from './Currency.new'

// Added temporarily as a hack to fix for the currency decimal input issue.
// Works by storing the dollar value as a string.  Models need to be augmented with a string value unfortunately.

export function CurrencyString(props: InputProps<string>) {

	const handleChange = (textValue?: string) => {
		const curr = getCurrency(textValue || '')

		props.onChange(curr.displayString)
	}

	return (
		<TextInput {...props} value={props.value || ''} placeholder='$' onChange={handleChange} />
	)
}

export default CurrencyString
