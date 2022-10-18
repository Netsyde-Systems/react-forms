import React from 'react'
import { FormDefinition, FormData } from '../hooks/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'

import './Validation.scss'

interface TestFormShape {
	reqString: string
	minString: string
	maxString: string
	customString: string
}

const testFormDefinition: FormDefinition<TestFormShape> = {
}

let testFormData: FormData<TestFormShape> = {} 

let getTypeMap = (obj: any) => {
	let typeMap = Object.keys(obj).reduce((typeMap, key) => {
		typeMap[key] = typeof obj[key]
		return typeMap
	}, {} as any)
	return typeMap
}

export function Validation() {
	const rf = useReactForms(testFormDefinition, testFormData)

	return (
		<div className='form-tests page'>
			<h1>Validation Tests</h1>

			<div className='control-grid'>

				<div className='control-row'>
					<div className='control-cell'>
						{rf.textInput('reqString')}
					</div>
					<div className='control-cell'>
						{rf.textInput('minString')}
					</div>
					<div className='control-cell'>
						{rf.textInput('maxString')}
					</div>
					<div className='control-cell'>
						{rf.textInput('customString')}
					</div>
				</div>

			</div>

			<h2>Test Form Data</h2>
			<pre>
				{JSON.stringify(rf.formData, null, 2)}
			</pre>
			<h2>Test Form Types</h2>
			<pre>
				{JSON.stringify(getTypeMap(rf.formData), null, 2)}
			</pre>
		</div>
	)
}

export default Validation

