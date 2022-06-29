import React from 'react'
import { FormDefinition } from '../hooks/FormBuilderTypes'
import useFormBuilder from '../hooks/useFormBuilder'

interface TestForm {
	aStringProperty: string
}

const testFormDefinition: FormDefinition<TestForm> = {}

let testFormData: TestForm = {
	aStringProperty: ''
}

export function FormTests() {
	const formBuilder = useFormBuilder(testFormDefinition, testFormData)

	return (
		<div className='form-tests page'>
			<h1>Form Tests</h1>
			<h2>A Test Form</h2>
			{formBuilder.textInput('aStringProperty')}
			<h2>Test Form Data</h2>
			<pre>
				{JSON.stringify(formBuilder.formData, null, 2)}
			</pre>
		</div>
	)
}

export default FormTests

