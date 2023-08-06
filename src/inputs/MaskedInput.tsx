// Uses https://imask.js.org/ for masking logic
import IMask, { AnyMaskedOptions, InputMask, Masked } from 'imask'
import { IMaskInput } from 'react-imask'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

export type Mask = string | AnyMaskedOptions

export interface MaskedInputProps extends InputProps<string> {
	mask: Mask
}

export function MaskedInput(props: MaskedInputProps) {
	let mask: Masked<any>
	
	if (typeof props.mask === 'string' ) {
		mask = IMask.createMask({mask: props.mask})
	}
	else mask = IMask.createMask(props.mask)

	mask.value = props.value ?? ''

	if (props.readOnly) {
		return <ReadonlyField {...Object.assign({}, props, { value: mask.value })} />
	}

	const handleAccept = (value: string, mask: InputMask<AnyMaskedOptions>, e: any) => { 
		// console.table(mask)
		console.log(`onAccept => value: ${value} mask.value: ${mask.value} mask.unmaskedValue: ${mask.unmaskedValue} mask.typedValue ${mask.typedValue} mask.masked: ${mask.masked}`)
		props.onChange(value, mask.typedValue as string | undefined)
	}

	// not sure why we need to specify a change handler now that imask.js has been updated
	const dummyChangeHandler = (e: any) => {
		console.log(`onChange called`)
	}

	const className = getInputEnvelopeClass(props, 'text', 'input')

	const { id, disabled, placeholder, required, controlProps } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<IMaskInput {...controlProps} value={mask.value} unmask={true} mask={mask} onAccept={handleAccept} onChange={dummyChangeHandler}  {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default MaskedInput
