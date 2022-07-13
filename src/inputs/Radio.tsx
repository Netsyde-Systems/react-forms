import React, { ChangeEventHandler } from 'react'

import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'
import './Radio.scss'

export interface RadioProps extends InputProps<boolean> {}

export function Radio(props: RadioProps) {
	const handleOptionChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.checked)

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below

  // const className = classNames('checkbox', 'input', { 'has-errors': !!props.errorMessage }, { 'is-hidden': props.isHidden })
  const className = getInputEnvelopeClass(props, 'radio', 'input')

	const { id, disabled } = props

  return (
    <div className={className}>
            <input type="radio" checked={!!props.value} onChange={handleOptionChange} {...{ id, disabled }} />
            <InputLabel {...props} /><br />
            <ErrorMessage {...props} />
    </div>
  )
}
