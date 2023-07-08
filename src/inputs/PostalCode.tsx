import { InputProps } from './inputs'
import { MaskedInput } from './MaskedInput'

export function PostalCode(props: InputProps<string>) {

	const handleChange = (val?: string) => props.onChange(val?.toUpperCase() || '')

	return (
		<MaskedInput {...props}  value={props.value?.toString() || ''} placeholder='A1A 1A1' onChange={handleChange} mask='a0a 0a0' />
	)
} 

export default PostalCode
