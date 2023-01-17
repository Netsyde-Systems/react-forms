import { InputProps, getInputEnvelopeClass } from './inputs'
import { InputLabel} from './InputLabel'
import { ErrorMessage } from './ErrorMessage'

import './Inputs.scss'

export interface ReadonlyFieldProps extends InputProps<string> { }

export function ReadonlyField(props: ReadonlyFieldProps) {
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
