import React from 'react'
import classNames from 'classnames'
import { FormBuilder } from '../indexExports'
import { DataInspector } from './DataInspector'

import './FormInspector.scss'

export interface FormInspectorProps extends React.PropsWithChildren {
	formBuilder: FormBuilder<any, any>
}

export const FormInspector: React.FC<FormInspectorProps> = ({formBuilder, children}) => {
	const [inspectorIsOpen, setInspectorIsOpen] = React.useState<boolean>()

	const className = classNames('form-inspector', { open: inspectorIsOpen })

	const buttonText = inspectorIsOpen ? 
		'> Close' : 
		'< Inspect' 

	const dataInspector = inspectorIsOpen ? 
		<DataInspector formBuilder={formBuilder} /> : 
		null

	return (
		<div className={className}>
			<div className='form'>
				{children}
			</div>
			<div className='data-inspector'>
				<button className='inspect' onClick={() => setInspectorIsOpen(!inspectorIsOpen)}>{buttonText}</button>
				{dataInspector}
			</div>
		</div>
	)
}

export default FormInspector