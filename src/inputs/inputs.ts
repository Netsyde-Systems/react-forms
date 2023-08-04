import classNames from 'classnames'
import { Locale } from 'date-fns'
import { HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react'

export interface Activatable {
	disabled?: boolean
}

export interface ReadonlyProps<ValueT, ControlAttributesT extends HTMLAttributes<ValueT> = InputHTMLAttributes<any>> extends Activatable {
	id: string
	value: ValueT | undefined
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
	readOnly?: boolean
	disallowBlank?: boolean
	className?: string
	controlProps?: Omit<ControlAttributesT, keyof InputProps<ValueT>>
}

export interface InputProps<ValueT, ControlAttributesT extends HTMLAttributes<ValueT> = InputHTMLAttributes<any>> extends ReadonlyProps<ValueT, ControlAttributesT> {
	onChange: (val?: ValueT, rawValue?: string) => void
}

export interface SelectOption<T> {
	value: T
	text: string
}

export interface SelectProps<T extends string | number> extends InputProps<T, SelectHTMLAttributes<any>> {
	selectOptions: Array<SelectOption<T>>
}

export function getInputEnvelopeClass(props: ReadonlyProps<any, any>, ...args: Array<string>) {
	const { hidden, disabled, className } = props

	return classNames('rf-ctrl', className, ...args, { 'has-errors': props.hasError || (typeof props.errorMessage === 'string') }, { hidden, disabled })
}