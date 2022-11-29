import classNames from 'classnames'
import { Locale } from 'date-fns'

export interface Activatable {
	disabled?: boolean
}

export interface InputProps<T> extends Activatable {
	id: string
	value: T | undefined
	onChange: (val?: T) => void
	// a label or errorMessage of false indicates we should collapse it
	// useful for tabular displays
	label?: string | false
	errorMessage?: string | false
	// true indicates we want to highlight the field but not show the error message
	// useful for tabular displays
	hasError?: boolean
	required?: boolean
	hidden?: boolean
	placeholder?: string
	locale?: Locale
}

export interface SelectOption<T extends string | number> {
	value: T
	text: string
}

export interface SelectProps<T extends string | number> extends InputProps<T> {
	selectOptions: Array<SelectOption<T>>
}

export function getInputEnvelopeClass(props: InputProps<any>, ...args: Array<string>) {
	const { hidden, disabled } = props

	return classNames(...args, { 'has-errors': props.hasError || (typeof props.errorMessage === 'string') }, { hidden, disabled })
}