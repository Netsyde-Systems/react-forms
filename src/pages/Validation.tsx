import { useEffect, useState } from 'react'
import { FormDefinition, FieldDefinitions } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import { DemoControlPanel, TextArea, TextInput } from '../indexExports'
import FormInspector from '../utility-controls/FormInspector'

import './Validation.scss'

interface ValidationShape {
	reqString: string
	minString: string
	maxString: string
	allString: string
	customString: string
	multiFnString: string
	reqDate: Date
	externalErrors: string
}

// this form definition is validated only after the validate button is pressed
const deferredDefinition: FormDefinition<ValidationShape> = {
	fields: {
		reqString: { label: 'Required String', isRequired: true },
		reqDate: { label: 'Required Date', isRequired: true },
		minString: { label: 'Min String (2)', validators: { min: 2 } },
		maxString: { label: 'Max String (5)', validators: { max: 5 } },
		allString: { label: 'Required Min 2 Max 5', isRequired: true, validators: { min: 2, max: 5 } },
		customString: {
			// TODO: figure out why adding a date field above makes fieldValue ambiguous as to whether it's a string or date
			label: 'Must be of length 10 and contain "sheep"', validators: ({ formData /*, fieldValue */ }) => {
				let errors: Array<string> = []

				const fieldValue = formData.customString

				if (fieldValue && fieldValue.length < 10) errors.push("Must be of at least length 10")
				if (fieldValue && !(fieldValue.indexOf('sheep') >= 0)) errors.push("Must contain 'sheep'")
				return errors
			}
		},
		multiFnString: {
			// TODO: figure out why adding a date field above makes fieldValue ambiguous as to whether it's a string or date
			label: 'Must be of length 7 and contain "ducks"', validators: [
				({ formData /*,  fieldValue */ }) => {
					const fieldValue = formData.customString
					return (!fieldValue || fieldValue.length >= 7) ? [] : ["Must be of at least length 7"]
				},
				({ formData /*,  fieldValue */ }) => {
					const fieldValue = formData.customString
					return (!fieldValue || fieldValue.indexOf('ducks') >= 0) ? [] : ["Must contain 'ducks'"]
				},
			]
		},
		externalErrors: { label: 'External Errors' }
	}
}

// this form definition validated as soon as the user begins typing into an input 
const immediateFieldDefinitions: FieldDefinitions<ValidationShape> = Object.entries(deferredDefinition.fields!).reduce((formDef, [key, fieldDef]) => {
	/*
	let typedKey = key as keyof FormData<ValidationShape>
	formDef[typedKey] = Object.assign({}, fieldDef)
	formDef[typedKey]!.validateImmediately = true
	*/

	// TODO: find out why adding a date to the form data def causes this typing issue
	(formDef as any)[key] = Object.assign({}, fieldDef) as any
	(formDef as any)[key]!.validateImmediately = true
	return formDef
}, {} as FieldDefinitions<ValidationShape>)

const immediateDefinition: FormDefinition<ValidationShape> = {
	fields: immediateFieldDefinitions,
}

interface ForcedValidationShape {
	maxString: string
	customString: string
	// figured out why string/number dichotomy exists here
	//prevMaxNumber: number
	customNumber: number
}


const forcedDefinition: FormDefinition<ForcedValidationShape> = {
	fields: {
		maxString: { label: 'Force string max 5', disallowChange: { maxLength: 5 } },

		// figured out why string/number dichotomy exists.  Try commenting out prevMaxNumber above
		customString: {
			label: 'Cannot contain "sheep"', disallowChange: ({ fieldValue }) => {
				// TODO: figure how to enable function to know it's type
				if (fieldValue && (fieldValue as string)?.indexOf('sheep') >= 0) return true
			}
		},
		// prevMaxNumber: { label: 'Force number max 5', disallowChange: { maxLength: 5 } },
		customNumber: {
			label: 'Int max length 9.  (Custom raw value demo. Broken. Now superceded by int input)', disallowChange: ({ rawValue }) => {
				// this doesn't work because non-numerics such as '.', 'e', '-', etc. don't trigger onChange
				const invalid = !!rawValue && (rawValue?.indexOf('.') >= 0 || rawValue.length > 9)
				return invalid
			}
		}

	},
}

export function Validation() {
	const rfDeferred = useReactForms(deferredDefinition)
	const rfImmediate = useReactForms(immediateDefinition)
	const rfForced = useReactForms(forcedDefinition)

	const [externalErrorValue, setExternalErrorValue] = useState<string>()
	const [externalErrorMessage, setExternalErrorMessage] = useState<string>()

	useEffect(() => {
		rfDeferred.clearExternalErrors()
		rfImmediate.clearExternalErrors()

		if (externalErrorValue && externalErrorMessage) {
			rfDeferred.addExternalError('externalErrors', externalErrorValue, externalErrorMessage)
			rfImmediate.addExternalError('externalErrors', externalErrorValue, externalErrorMessage)
		}
	}, [externalErrorValue, externalErrorMessage, rfDeferred, rfImmediate])

	return (
		<div className='validation page'>
			<DemoControlPanel>
				<TextInput id='txtValue' label='External Value' value={externalErrorValue} onChange={setExternalErrorValue} />
				<TextArea id='txtErrors' label='External Errors (CSV)' value={externalErrorMessage} onChange={setExternalErrorMessage} />
			</DemoControlPanel>

			<h1>Validation Tests</h1>

			<FormInspector formBuilder={rfDeferred}>
					<h2>Validation (Deffered)</h2>

					<div className='control-grid'>
						<div className='control-row'>
							<div className='control-cell'>
								{rfDeferred.textInput('reqString')}
							</div>
							<div className='control-cell'>
								{rfDeferred.textInput('minString')}
							</div>
							<div className='control-cell'>
								{rfDeferred.textInput('maxString')}
							</div>
						</div>
						<div className='control-row'>
							<div className='control-cell'>
								{rfDeferred.textInput('allString')}
							</div>
							<div className='control-cell'>
								{rfDeferred.textInput('customString')}
							</div>
							<div className='control-cell'>
								{rfDeferred.textInput('multiFnString')}
							</div>
						</div>
						<div className='control-row'>
							<div className='control-cell'>
								{rfDeferred.dateInput('reqDate')}
							</div>
							<div className='control-cell'>
								{rfDeferred.textInput('externalErrors')}
							</div>
						</div>
					</div>
			</FormInspector>

			<button onClick={() => rfDeferred.validate()}>Validate</button>

			<FormInspector formBuilder={rfImmediate}>
				<h2>Validation (Immediate)</h2>
					<div className='control-grid'>

						<div className='control-row'>
							<div className='control-cell'>
								{rfImmediate.textInput('reqString')}
							</div>
							<div className='control-cell'>
								{rfImmediate.textInput('minString')}
							</div>
							<div className='control-cell'>
								{rfImmediate.textInput('maxString')}
							</div>
						</div>
						<div className='control-row'>
							<div className='control-cell'>
								{rfImmediate.textInput('allString')}
							</div>
							<div className='control-cell'>
								{rfImmediate.textInput('customString')}
							</div>
							<div className='control-cell'>
								{rfImmediate.textInput('multiFnString')}
							</div>
						</div>
						<div className='control-row'>
							<div className='control-cell'>
								{rfImmediate.dateInput('reqDate')}
							</div>
							<div className='control-cell'>
								External error immediate validation not yet working correctly. 
								TODO: investigate
								{rfDeferred.textInput('externalErrors')}
							</div>
						</div>
					</div>
			</FormInspector>

			<FormInspector formBuilder={rfForced}>
					<h2>Validate (Forced)</h2>
					<div className='control-grid'>

						<div className='control-row'>
							<div className='control-cell'>
								{rfForced.textInput('maxString')}
							</div>
							<div className='control-cell'>
								{rfForced.textInput('customString')}
							</div>
							<div className='control-cell'>
								{rfForced.numberInput('customNumber')}
							</div>
						</div>
					</div>
			</FormInspector>

		</div>
	)
}

export default Validation

