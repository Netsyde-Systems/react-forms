import { FormDefinition, FieldDefinitions } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import Well from '../utility-controls/Well'
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
}

const forcedDefinition: FormDefinition<ForcedValidationShape> = {
	fields: {
		maxString: { label: 'Force string max 5', disallowChange: { maxLength: 5 } },

		// figured out why string/number dichotomy exists.  Try commenting out prevMaxNumber above
		customString: {
			label: 'Cannot contain "sheep"', disallowChange: ({ fieldValue }) => {
				if (fieldValue && fieldValue?.indexOf('sheep') >= 0) return true
			}
		},
		// prevMaxNumber: { label: 'Force number max 5', disallowChange: { maxLength: 5 } },
	},
}

export function Validation() {
	const rfDeferred = useReactForms(deferredDefinition)
	const rfImmediate = useReactForms(immediateDefinition)
	const rfForced = useReactForms(forcedDefinition)

	return (
		<div className='validation page'>
			<h1>Validation Tests</h1>

			<FormInspector formBuilder={rfDeferred}>
				<Well title='Validation (Deferred)' buttonDefs={[{ text: 'Validate', onClick: () => rfDeferred.validate() }]}>
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
						</div>
					</div>
				</Well>
			</FormInspector>

			<FormInspector formBuilder={rfImmediate}>
				<Well title='Validation (Immediate)'>
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
						</div>
					</div>
				</Well>
			</FormInspector>

			<FormInspector formBuilder={rfForced}>
				<Well title='Validation (Forced)'>
					<div className='control-grid'>

						<div className='control-row'>
							<div className='control-cell'>
								{rfForced.textInput('maxString')}
							</div>
							<div className='control-cell'>
								{rfForced.textInput('customString')}
							</div>
						</div>
					</div>
				</Well>
			</FormInspector>

		</div>
	)
}

export default Validation

