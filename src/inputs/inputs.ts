export interface InputProps<T> {
	id: string
	value: T | undefined
	onChange: (val: T) => void
	label?: string
	errorMessage?: string
	isDisabled?: boolean
	isReadonly?: boolean
}