import { ChangeEventHandler } from 'react'

import { SelectProps, getInputEnvelopeClass } from './inputs'
import { InputLabel } from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

export function TextRadio(props: SelectProps<string>) {
	const { controlProps } = props

	const handleOptionChange: ChangeEventHandler<HTMLInputElement> = (e) => !props.readOnly && props.onChange(e.target.value) 

	const className = getInputEnvelopeClass(props, 'radio', 'input')

	const radios = props.selectOptions.map((option, optionIndex) => {
		const radioId = props.id + optionIndex
		return (
			<div key={optionIndex}>
				<input {...controlProps} id={radioId} name={props.id} type='radio' value={option.value} checked={props.value === option.value} onChange={handleOptionChange} disabled={props.disabled || option.disabled} readOnly={props.readOnly} />
				<label htmlFor={props.id + optionIndex} dangerouslySetInnerHTML={{__html: option.text}} />
			</div>
		)
	})

	return (
		<div className={className}>
			<InputLabel {...props} />
			{radios}
			<ErrorMessage {...props} />
		</div>
	)
}

export default TextRadio
