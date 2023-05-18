import { ChangeEventHandler } from 'react'

import { getInputEnvelopeClass, SelectProps } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'
import { ReadonlyField } from './ReadonlyField'

import './Inputs.scss'

 // html options in react can't take a null values
 // bit of a hack fix to allow returning null value.
const NULL_STRING_VALUE = Number.MIN_SAFE_INTEGER.toString()

export function TextSelect(props: SelectProps<string>) {
	if (props.readOnly) {
		const selProps = Object.assign({}, props)
		const opt = props.selectOptions.find(o => o.value === props.value)

		selProps.value = opt?.text || ''

		return <ReadonlyField {...selProps} />
	}

	const handleChange: ChangeEventHandler<HTMLSelectElement> = 
		(e) => props.onChange(e.target.value === NULL_STRING_VALUE ? undefined : e.target.value)

	const className = getInputEnvelopeClass(props, 'select', 'input')

	const { id, disabled, required } = props

	const options = props.selectOptions.map((option, optionIndex) => {
		return (
			<option key={optionIndex} value={option.value}>{option.text}</option>
		)
	})

	if (!props.disallowBlank) options.unshift(<option key='' value={NULL_STRING_VALUE}>{props.placeholder || ''}</option>)

	return (
		<div className={className}>
			<InputLabel {...props} />
			<select value={props.value ?? ''} onChange={handleChange} {...{ id, disabled, required }} >
				{options}
			</select>
			<ErrorMessage {...props} />
		</div>
	)
}

export default TextSelect
