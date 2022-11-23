import classNames from 'classnames'
import { Locale } from 'date-fns'

export interface Activatable {
	disabled?: boolean
}

export interface InputProps<T> extends Activatable {
	id: string
	value: T | undefined
	onChange: (val?: T) => void
	label?: string
	errorMessage?: string
	required?: boolean
	hidden?: boolean
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
	return classNames(...args, { 'has-errors': !!props.errorMessage }, { hidden: props.hidden }, { disabled: props.disabled })
}