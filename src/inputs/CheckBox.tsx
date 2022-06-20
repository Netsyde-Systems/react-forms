import React, { ChangeEventHandler } from 'react'
import classNames from 'classnames'

import { InputProps } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './CheckBox.scss'

export interface CheckBoxProps extends InputProps<boolean> {
 }

export function CheckBox(props: CheckBoxProps) {
	const handleChange: ChangeEventHandler<HTMLInputElement> = 
		(e) => props.onChange(e.target.checked)

	// Shorthand for common properties with same name, and not requiring processing.  
	// enables more concise notation below

  const className = classNames('check-box', { 'has-errors': !!props.errorMessage })

	const { id, disabled } = props

  return (
    <div className={className}>
            <input type="checkbox" checked={!!props.value} onChange={handleChange} {...{ id, disabled }} />
            <ErrorMessage {...props} />
            <InputLabel {...props} />
    </div>
  )
}
