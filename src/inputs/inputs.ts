import { Activatable } from "../common"

export interface InputProps<T> extends Activatable {
	id: string
	value: T | undefined | null
	onChange: (val: T) => void
	label?: string
	errorMessage?: string
	readOnly?: boolean
}