import { SelectProps } from './inputs'
import { GenericSelect, GenericSelectProps } from './GenericSelect'

const NULL_STRING_VALUE = Number.MIN_SAFE_INTEGER.toString()

export function TextSelect(props: SelectProps<string>) {
	const genericProps: GenericSelectProps<string> = Object.assign({}, props, { 
		valueToString: (val?: string) => !val ? NULL_STRING_VALUE : val, 
		valueFromString: (stVal?: string) => stVal === NULL_STRING_VALUE ? undefined : stVal
	})

	return <GenericSelect {...genericProps} />
}

export default TextSelect
