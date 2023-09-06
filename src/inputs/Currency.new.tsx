import { useState } from 'react'
import IMask, { AnyMaskedOptions } from 'imask'
import { InputProps } from './inputs'
import { TextInput } from './TextInput'


// Added temporarily as a fix for the currency decimal input issue.
// Ideally we resolve the issue with the original currency control so as to reuse the MaskedInput logic

// BROKEN: Doesn't work in subforms because of th euse of useState in the component for some reason.  
// TODO: Investigate

export function Currency(props: InputProps<number>) {
	const [textValue, setTextValue] = useState(props.value?.toString())

	const handleChange = (textValue?: string) => {

		const curr = getCurrency(textValue || '')

		if (textValue === '' || isNaN(curr.numberValue)) props.onChange(undefined)
		else props.onChange(curr.numberValue)

		setTextValue(curr.displayString)
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

export interface CurrencyType {
	numberValue: number
	displayString: string
}

export function getCurrency(dirtyString: string): CurrencyType {
	const dollarMask = IMask.createMask(dollarMaskConfig)
	dollarMask.value = dirtyString

	let displayString = dollarMask.value
	let radixIndex = dirtyString?.indexOf(radix) ?? -1

	// hacks to allow retaining decimal input status
	if (radixIndex >= 0 && !dollarMask.value.includes(radix)) {
		displayString = dirtyString?.slice(0, radixIndex + 1) ?? ''

		displayString += dirtyString?.slice(radixIndex + 1, radixIndex + 3).split('').map(Number).filter(n => !isNaN(n)).join('') ?? ''
	}

	const numberValue = Number(dollarMask.unmaskedValue)

	return { numberValue, displayString }
}