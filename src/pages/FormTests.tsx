import React from 'react'
import { FormDefinition, FormData } from '../hooks/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'

import './FormTests.scss'

interface TestFormShape {
	stringProperty: string
	numberProperty: number
	selectStringProperty: string
	selectNumberProperty: number
	radioStringProperty: string
	radioNumberProperty: number

	checkboxProperty: boolean
	dateProperty: Date

	longStringProperty: string
	phoneNumber: number
	postalCode: string
	email: string
}

const testFormDefinition: FormDefinition<TestFormShape> = {
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
	}, 
	radioStringProperty: {
		selectOptions: [
			{ value: 'First', text: 'First Option' },
			{ value: 'Second', text: 'Second Option' }, 
		]
	}, 
	radioNumberProperty: {
		selectOptions: [
			{ value: 1, text: 'First Option' },
			{ value: 2, text: 'Second Option' }, 
		]
	}, 
}

let testFormData: FormData<TestFormShape> = {} 

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
						{rf.textRadio('radioStringProperty')}
					</div>
					<div className='control-cell'>
						{rf.numberRadio('radioNumberProperty')}
					</div>
					<div className='control-cell'>
						{rf.textArea('longStringProperty')}
					</div>
				</div>

				<div className='control-row'>
					<div className='control-cell'>
						{rf.phoneNumber('phoneNumber')}
					</div>
					<div className='control-cell'>
						{rf.postalCode('postalCode')}
					</div>
					<div className='control-cell'>
						{rf.emailAddress('email')}
					</div>
				</div>

				<h2>JSX Tests</h2>
				<p>
					TODO: Fix 'input losing focus' issue when calling property via JSX
				</p>

				<div className='control-row'>
					<div className='control-cell'>
						<rf.TextInputElementTest field='stringProperty' />
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

