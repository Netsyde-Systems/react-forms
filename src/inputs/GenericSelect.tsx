import { ChangeEventHandler } from 'react'

import { getInputEnvelopeClass, InputProps, SelectOption } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

import './Inputs.scss'

export interface GenericSelectProps<T> extends InputProps<T> {
	selectOptions: Array<SelectOption<T>>
	valueToString: (val?: T) => string
	valueFromString: (stringVal?: string) => T | undefined
}

export function GenericSelect<T>(props: GenericSelectProps<T>) {
	if (props.readOnly) {
		const opt = props.selectOptions.find(o => o.value === props.value)
		const value = opt?.text || ''
		const selProps = Object.assign({}, props, { value })

		return <ReadonlyField {...selProps} />
	}

	const handleChange: ChangeEventHandler<HTMLSelectElement> = 
		(e) => props.onChange(props.valueFromString(e.target.value))

	const className = getInputEnvelopeClass(props, 'select', 'input')

	const { id, disabled, required, controlProps } = props

	const options = props.selectOptions.map((option, optionIndex) => {
		return (
			<option key={optionIndex} value={props.valueToString(option.value)}>{option.text}</option>
		)
	})

	if (!props.disallowBlank) options.unshift(<option key='' value={props.valueToString(undefined)}>{props.placeholder || ''}</option>)

	return (
		<div className={className}>
			<InputLabel {...props} />
			<select {...controlProps} value={props.valueToString(props.value)} onChange={handleChange} {...{ id, disabled, required }} >
				{options}
			</select>
			<ErrorMessage {...props} />
		</div>
	)
}

export default GenericSelect
