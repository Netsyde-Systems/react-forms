import { SelectProps } from './inputs'
import { GenericSelect, GenericSelectProps } from './GenericSelect'

export function NumberSelect(props: SelectProps<number>) {
	const genericProps: GenericSelectProps<number> = Object.assign({}, props, { 
		valueToString: (val?: number) => !(typeof val === 'number') ? '' : val.toString(), 
		valueFromString: (st?: string) => (st && Number(st)) || undefined
	})

	return <GenericSelect {...genericProps} />
}

export default NumberSelect