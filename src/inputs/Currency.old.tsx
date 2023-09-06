import { AnyMaskedOptions } from 'imask'
import { InputProps } from './inputs'
import { MaskedInput } from './MaskedInput'

// Doesn't allow inputting decimals due to model being a number that can't track radix status

export function Currency(props: InputProps<number>) {

	const handleChange = (textValue?: string, rawValue?: string) => {
		console.log(`currency change textValue: ${textValue} rawValue: ${rawValue}`)
		const numVal = Number(textValue)
		if (textValue === '' || isNaN(numVal)) props.onChange(undefined)
		else props.onChange(numVal, rawValue)
	}

	const dollarMask: AnyMaskedOptions = {
		mask: '$curr',
		blocks: {
			curr: {
				mask: Number,
				thousandsSeparator: ',',
				radix: '.', 
			}
		}
	}

	return (
		<MaskedInput {...props} value={props.value?.toString() || ''} placeholder='$' onChange={handleChange} mask={dollarMask} />
	)
}

export default Currency
