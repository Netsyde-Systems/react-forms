import React from 'react'
import { FormDefinition } from '../hooks/FormBuilderTypes'
import useFormBuilder from '../hooks/useFormBuilder'

interface TestForm {
	aStringProperty?: string
	aNumberProperty?: number
}

const testFormDefinition: FormDefinition<TestForm> = {}

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
			<h2>A Test Form</h2>
			{formBuilder.textInput('aStringProperty')}
			{formBuilder.numberInput('aNumberProperty')}
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

