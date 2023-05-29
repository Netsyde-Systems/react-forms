import { InputProps, ReadonlyProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface ReadonlyFieldProps extends Omit<InputProps<string, any>, 'onChange'> { }

export function ReadonlyField(props: ReadonlyProps<string>) {
	const className = getInputEnvelopeClass(props, 'readonly', 'field')

	return (
		<div className={className}>
			<InputLabel {...props} />
			<div className='value'>{props.value || ' '}</div>
			<ErrorMessage {...props} />
		</div>
	)
}

export default ReadonlyField
