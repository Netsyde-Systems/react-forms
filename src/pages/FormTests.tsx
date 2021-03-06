import React from 'react'
import { FormDefinition } from '../hooks/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'

import './FormTests.scss'

interface TestForm {
	stringProperty: string
	numberProperty: number
	dateProperty: Date

	selectStringProperty: string
	selectNumberProperty: number
	checkboxProperty: boolean

	longStringProperty: string
	phoneNumber: number
	postalCode: string
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

// TODO: GH#20 make form init capable of taking a Partial<FormT>
let testFormData: TestForm = ({} as TestForm)

let getTypeMap = (obj: any) => {
	let typeMap = Object.keys(obj).reduce((typeMap, key) => {
		typeMap[key] = typeof obj[key]
		return typeMap
	}, {} as any)
	return typeMap
}

export function FormTests() {
	const rf = useReactForms(testFormDefinition, testFormData)

	return (
		<div className='form-tests page'>
			<h1>Form Tests</h1>

			<div className='control-grid'>

				<div className='control-row'>
					<div className='control-cell'>
						{rf.textInput('stringProperty')}
					</div>
					<div className='control-cell'>
						{rf.numberInput('numberProperty')}
					</div>
					<div className='control-cell'>
						{rf.dateInput('dateProperty')}
					</div>
				</div>

				<div className='control-row'>
					<div className='control-cell'>
						{rf.textSelect('selectStringProperty')}
					</div>
					<div className='control-cell'>
						{rf.numberSelect('selectNumberProperty')}
					</div>
					<div className='control-cell'>
						{rf.checkbox('checkboxProperty')}
					</div>
				</div>

				<div className='control-row'>
					<div className='control-cell'>
						{rf.textArea('longStringProperty')}
					</div>
					<div className='control-cell'>
						{rf.phoneNumber('phoneNumber')}
					</div>
					<div className='control-cell'>
						{rf.postalCode('postalCode')}
					</div>
				</div>

				<h2>JSX Tests</h2>
				<p>
					TODO: Fix 'input losing focus' issue when calling property via JSX
				</p>

				<div className='control-row'>
					<div className='control-cell'>
						<rf.TextInput field='stringProperty' />
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

export default FormTests

