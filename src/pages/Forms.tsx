import React from 'react'
import { FormDefinition, FormData } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import FormInspector from '../utility-controls/FormInspector'

import './Forms.scss'

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
	currency: number

	filesProperty: Array<File>
}

const testFormDefinition: FormDefinition<TestFormShape> = {
	fields: {
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
		filesProperty: {
			label: 'File Input Name is now configurable'
		}
	}, 
}

let testFormData: FormData<TestFormShape> = {}

export function Forms() {
	const rf = useReactForms(testFormDefinition, testFormData)
	const { ElementBuilder: RF } = rf

	return (

		<FormInspector formBuilder={rf}>

			<div className='forms page'>
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
							<RF.TextInput field='stringProperty' />
						</div>
						<div className='control-cell'>
							<RF.NumberInput field='numberProperty' />
						</div>
						<div className='control-cell'>
							<RF.DateInput field='dateProperty' />
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
							<RF.TextSelect field='selectStringProperty' />
						</div>
						<div className='control-cell'>
							<RF.NumberSelect field='selectNumberProperty' />
						</div>
						<div className='control-cell'>
							<RF.CheckBox field='checkboxProperty' />
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
							<RF.TextRadio field='radioStringProperty' />
						</div>
						<div className='control-cell'>
							<RF.NumberRadio field='radioNumberProperty' />
						</div>
						<div className='control-cell'>
							<RF.TextArea field='longStringProperty' />
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
						<div className='control-cell'>
							{rf.currency('currency')}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.PhoneNumber field='phoneNumber' />
						</div>
						<div className='control-cell'>
							<RF.PostalCode field='postalCode' />
						</div>
						<div className='control-cell'>
							<RF.EmailAddress field='email' />
						</div>
						<div className='control-cell'>
							<RF.Currency field='currency' />
							Note, cents input not yet working with form builder (but is when using control itself).  <br/>TODO: investigate
						</div>
					</div>


					<div>
						{rf.files('filesProperty')}
					</div>
					<div>
						<RF.Files field='filesProperty' />
					</div>

				</div>
			</div>

		</FormInspector>
	)
}

export default Forms

