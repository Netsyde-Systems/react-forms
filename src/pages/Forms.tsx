import { useState, useEffect } from 'react'
import useReactForms from '../hooks/useReactForms'
import { FormDefinition } from '../formbuilder/FormBuilderTypes'
import { FormView, FormViewSelect, getFormViewState } from '../utility-controls/FormViewSelect'
import { DemoControlPanel } from '../utility-controls/DemoControlPanel'
import FormInspector from '../utility-controls/FormInspector'

import './Forms.scss'

interface TestFormShape {
	stringProperty: string
	numberProperty: number
	integerProperty: number
	selectStringProperty: string
	selectNumberProperty: number
	radioStringProperty: string
	radioNumberProperty: number

	checkboxProperty: boolean
	maskedProperty: string
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
			label: 'File Input Name is now configurable', 
			placeholder: 'As is the "placeholder"',
			onChange: async ({formData}) => {
				console.log('Files changed as expected')
				return formData
			}
		}
	}, 
}

const now = new Date()
const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)

export function Forms() {
	const rf = useReactForms(testFormDefinition)
	const { ElementBuilder: RF } = rf
	const [formView, setFormView] = useState<FormView>('Edit')

	useEffect(() => {
		const viewState = getFormViewState(formView)
		rf.setDisabled(viewState.isDisabled)
		rf.setReadOnly(viewState.isReadOnly)
	}, [formView])

	return (
		<FormInspector formBuilder={rf}>
			<DemoControlPanel>
				<FormViewSelect currentFormView={formView} onFormViewChange={setFormView} />
			</DemoControlPanel>

			<div className='forms page'>
				<h1>Form Tests</h1>

				<div className='control-grid'>

					<div className='control-row'>
						<div className='control-cell'>
							{rf.textInput('stringProperty', { title: 'String Function' })}
						</div>
						<div className='control-cell'>
							{rf.numberInput('numberProperty', { title: 'Number Function' })}
						</div>
						<div className='control-cell'>
							{rf.integerInput('integerProperty')}
						</div>
						<div className='control-cell'>
							{rf.dateInput('dateProperty', {min: minDate, max: maxDate})}
						</div>
						<div className='control-cell'>
							{rf.localizedDateInput('dateProperty', {min: minDate, max: maxDate})}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.TextInput field='stringProperty' title='String Element' />
						</div>
						<div className='control-cell'>
							<RF.NumberInput field='numberProperty' title='Number Element' />
						</div>
						<div className='control-cell'>
							<RF.IntegerInput field='integerProperty' />
						</div>
						<div className='control-cell'>
							Note: Fix min/max type colision
							<RF.DateInput field='dateProperty' title='Date Element' min={minDate as number & Date} max={maxDate as number & Date} />
						</div>
						<div className='control-cell'>
							<RF.LocalizedDateInput field='dateProperty' min={minDate} max={maxDate} />
						</div>
					</div>


					<div className='control-row'>
						<div className='control-cell'>
							{rf.textSelect('selectStringProperty', { title: 'Text Select Function' })}
						</div>
						<div className='control-cell'>
							{rf.numberSelect('selectNumberProperty', { title: 'Number Select Function' })}
						</div>
						<div className='control-cell'>
							{rf.checkbox('checkboxProperty', { title: 'Checkbox Function' })}
						</div>
						<div className='control-cell'>
							{rf.maskedInput('maskedProperty', '00-0000000')}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.TextSelect field='selectStringProperty' title='Text Select Element' />
						</div>
						<div className='control-cell'>
							<RF.NumberSelect field='selectNumberProperty' title='Number Select Element' />
						</div>
						<div className='control-cell'>
							<RF.CheckBox field='checkboxProperty' title='Checkbox Element' />
						</div>
						<div className='control-cell'>
							<RF.MaskedInput field='maskedProperty' mask='0000000-00'  />
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							{rf.textRadio('radioStringProperty', { title: 'Text Radio Function' })}
						</div>
						<div className='control-cell'>
							{rf.numberRadio('radioNumberProperty', { title: 'Number Radio Function' })}
						</div>
						<div className='control-cell'>
							{rf.textArea('longStringProperty', { title: 'Text Area Function', rows: 3 })}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.TextRadio field='radioStringProperty' title='Text Radio Element' />
						</div>
						<div className='control-cell'>
							<RF.NumberRadio field='radioNumberProperty' title='Number Radio Element' />
						</div>
						<div className='control-cell'>
							<RF.TextArea field='longStringProperty' title='Text Area Element' rows={5} />
						</div>
					</div>


					<div className='control-row'>
						<div className='control-cell'>
							{rf.phoneNumber('phoneNumber', { title: 'Phone Function' })}
						</div>
						<div className='control-cell'>
							{rf.postalCode('postalCode', { title: 'Postal Code Function' })}
						</div>
						<div className='control-cell'>
							{rf.emailAddress('email', { title: 'Email Function' })}
						</div>
						<div className='control-cell'>
							{rf.currency('currency', { title: 'Currency Function' })}
						</div>
						<div className='control-cell'>
							{rf.readonlyField('Calculated', `number + phone = ${(rf.formData.numberProperty || 0) + (rf.formData.phoneNumber || 0)}`)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<RF.PhoneNumber field='phoneNumber' title='Phone Element' />
						</div>
						<div className='control-cell'>
							<RF.PostalCode field='postalCode' title='Postal Code Element' />
						</div>
						<div className='control-cell'>
							<RF.EmailAddress field='email' title='Email Element' />
						</div>
						<div className='control-cell'>
							<RF.Currency field='currency' title='Currency Element' />
							Note, cents input not yet working with form builder (but is when using control itself).  <br/>TODO: investigate
						</div>
						<div className='control-cell'>
							Calculated field not yet implemented with element builder.  May require redesign
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

