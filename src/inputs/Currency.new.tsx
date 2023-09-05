import { useState, useRef } from 'react'
import IMask, { AnyMaskedOptions } from 'imask'
import { InputProps } from './inputs'
import { TextInput } from './TextInput'


// Added temporarily as a fix for the currency decimal input issue.
// Ideally we resolve the issue with the original currency control so as to reuse the MaskedInput logic

export function Currency(props: InputProps<number>) {
	const [textValue, setTextValue] = useState(props.value?.toString())
	const dollarMaskRef = useRef(IMask.createMask(dollarMaskConfig))
	const dollarMask = dollarMaskRef.current

	const handleChange = (textValue?: string) => {
		dollarMask.value = textValue || ''

		const numVal = Number(dollarMask.unmaskedValue)
		if (textValue === '' || isNaN(numVal)) props.onChange(undefined)
		else props.onChange(numVal)

		let newTextValue = dollarMask.value
		let radixIndex = textValue?.indexOf(radix) ?? -1

		// hacks to allow retaining decimal input status
		if (radixIndex >= 0 && !dollarMask.value.includes(radix)) {
			newTextValue = textValue?.slice(0, radixIndex + 1) ?? ''

			newTextValue += textValue?.slice(radixIndex + 1, radixIndex + 3).split('').map(Number).filter(n => !isNaN(n)).join('') ?? ''
		}

		setTextValue(newTextValue)
	}

	return (
		<TextInput {...props} value={textValue || ''} placeholder='$' onChange={handleChange} />
	)
}

export default Currency

const radix = '.'

const dollarMaskConfig: AnyMaskedOptions = {
	mask: '$curr',
	blocks: {
		curr: {
			mask: Number,
			thousandsSeparator: ',',
			radix,
		}
	}
}
