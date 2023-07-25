import React from 'react'
import { FormBuilder } from '..'
import { DataInspector } from './DataInspector'

import './FormInspector.scss'

export interface FormInspectorProps extends React.PropsWithChildren {
	formBuilder: FormBuilder<any, any>
}

export const FormInspector: React.FC<FormInspectorProps> = ({formBuilder, children}) => {
	const [inspectorIsOpen, setInspectorIsOpen] = React.useState<boolean>()

	const buttonText = inspectorIsOpen ? 
		'> Close' : 
		'< Inspect' 

	const dataInspector = inspectorIsOpen ? 
		<DataInspector formBuilder={formBuilder} /> : 
		null

	return (
		<div className='form-inspector'>
			<button className='inspect' onClick={() => setInspectorIsOpen(!inspectorIsOpen)}>{buttonText}</button>
			<div className='inspection-results'>
				{dataInspector}
			</div>
			{children}
		</div>
	)
}

export default FormInspector