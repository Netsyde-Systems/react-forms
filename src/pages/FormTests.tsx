import React from 'react'
import { FormDefinition } from '../hooks/FormBuilderTypes'
import useFormBuilder from '../hooks/useFormBuilder'

import './FormTests.scss'

interface TestForm {
	stringProperty?: string
	numberProperty?: number
	dateProperty?: Date

	selectStringProperty?: string
	selectNumberProperty?: number
	checkboxProperty?: boolean
}

const testFormDefinition: FormDefinition<TestForm> = {
	selectStringProperty: {
		selectOptions: [
			{ value: 'First', text: 'First Option' },
			{ value: 'Second', text: 'Second Option' }, 
		]
	}, 
	selectNumberProperty: {
		selectOptions: [
			{ value: 1, text: 'First Option' },
			{ value: 2, text: 'Second Option' }, 
		]
	}
}

let testFormData: TestForm = {}

let getTypeMap = (obj: any) => {
	let typeMap = Object.keys(obj).reduce((typeMap, key) => {
		typeMap[key] = typeof obj[key]
		return typeMap
	}, {} as any)
	return typeMap
}

export function FormTests() {
	const formBuilder = useFormBuilder(testFormDefinition, testFormData)

	return (
		<div className='form-tests page'>
			<h1>Form Tests</h1>

			<div className='control-grid'>

				<div className='control-row'>
					<div className='control-cell'>
						{formBuilder.textInput('stringProperty')}
					</div>
					<div className='control-cell'>
						{formBuilder.numberInput('numberProperty')}
					</div>
					<div className='control-cell'>
						{formBuilder.dateInput('dateProperty')}
					</div>
				</div>

				<div className='control-row'>
					<div className='control-cell'>
						{formBuilder.selectTextInput('selectStringProperty')}
					</div>
					<div className='control-cell'>
						{formBuilder.selectNumberInput('selectNumberProperty')}
					</div>
					<div className='control-cell'>
						{formBuilder.checkboxInput('checkboxProperty')}
					</div>
				</div>

			</div>

			<h2>Test Form Data</h2>
			<pre>
				{JSON.stringify(formBuilder.formData, null, 2)}
			</pre>
			<h2>Test Form Types</h2>
			<pre>
				{JSON.stringify(getTypeMap(formBuilder.formData), null, 2)}
			</pre>
		</div>
	)
}

export default FormTests

