// Uses https://imask.js.org/ for masking logic
import IMask, { AnyMaskedOptions, InputMask, Masked } from 'imask'
import { IMaskInput } from 'react-imask'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

import './Inputs.scss'

export interface MaskTestFunction {
	(val: string): boolean
}

export interface MaskedInputProps extends InputProps<string> {
	mask: string | AnyMaskedOptions
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

	const handleAccept = (value: unknown, mask: InputMask<AnyMaskedOptions>, e: any) => { 
		props.onChange(value as string)
	}

	const className = getInputEnvelopeClass(props, 'text', 'input')

	const { id, disabled, placeholder, required, controlProps } = props

	return (
		<div className={className}>
			<InputLabel {...props} />
			<IMaskInput {...controlProps} value={mask.value} unmask={true} mask={mask} onAccept={handleAccept}  {...{ id, disabled, required, placeholder }} />
			<ErrorMessage {...props} />
		</div>
	)
}

export default MaskedInput
