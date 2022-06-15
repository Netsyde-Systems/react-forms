import { Activatable } from "../common"

export interface InputProps<T> extends Activatable {
	id: string
	value: T | undefined | null
	onChange: (val: T) => void
	label?: string
	errorMessage?: string
}

export interface SelectOption<T extends string | number> {
	value: T
	text: string
}
