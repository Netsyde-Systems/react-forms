import { AnyMaskedOptions } from 'imask'
import { InputProps } from './inputs'
import { MaskedInput, MaskedInputDetailedChangeEventHandler } from './MaskedInput'

export function Currency(props: InputProps<number>) {

	const handleChange = (textValue?: string) => {
		console.log(`currency change textValue: ${textValue}`)
		const numVal = Number(textValue)
		if (textValue === '' || isNaN(numVal)) props.onChange(undefined)
		else props.onChange(numVal)
	}

	const handleChangeDetailed: MaskedInputDetailedChangeEventHandler  = (e) => {
		console.log('currency detailed change event: ' + JSON.stringify(e, null, 2))
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
		<MaskedInput {...props} value={props.value?.toString() || ''} placeholder='$' onChange={handleChange} onChangeDetailed={handleChangeDetailed} mask={dollarMask} />
	)
}

export default Currency
