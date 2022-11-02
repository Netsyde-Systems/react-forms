import React from 'react'
import { FormDefinition, FormData, FieldDefinitions } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import { getTypeMap } from '../utilities'
import Well from '../well/Well'

import './Validation.scss'

interface ValidationShape {
	reqString: string
	minString: string
	maxString: string
	allString: string
	customString: string
	multiFnString: string
}

// this form definition is validated only after the validate button is pressed
const deferredDefinition: FormDefinition<ValidationShape> = {
	fields: {
		reqString: { label: 'Required String', isRequired: true },
		minString: { label: 'Min String (2)', validators: { min: 2 } },
		maxString: { label: 'Max String (5)', validators: { max: 5 } },
		allString: { label: 'Required Min 2 Max 5', isRequired: true, validators: { min: 2, max: 5 } },
		customString: {
			label: 'Must be of length 10 and contain "sheep"', validators: (fieldValue: any) => {
				let errors: Array<string> = []
				if (fieldValue && fieldValue.length < 10) errors.push("Must be of at least length 10")
				if (fieldValue && !(fieldValue.indexOf('sheep') >= 0)) errors.push("Must contain 'sheep'")
				return errors
			}
		},
		multiFnString: {
			label: 'Must be of length 7 and contain "ducks"', validators: [
				(fieldValue: any) => {
					return (!fieldValue || fieldValue.length >= 7) ? [] : ["Must be of at least length 7"]
				},
				(fieldValue: any) => {
					return (!fieldValue || fieldValue.indexOf('ducks') >= 0) ? [] : ["Must contain 'ducks'"]
				},
			]
		},
	}
}

// this form definition validated as soon as the user begins typing into an input 
const immediateFieldDefinitions: FieldDefinitions<ValidationShape> = Object.entries(deferredDefinition.fields!).reduce((formDef, [key, fieldDef]) => {
	let typedKey = key as keyof FormData<ValidationShape>
	formDef[typedKey] = Object.assign({}, fieldDef)
	formDef[typedKey]!.validateImmediately = true
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
			label: 'Cannot contain "sheep"', disallowChange: (fieldValue) => {
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
				</div>

			</Well>

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
				</div>

			</Well>

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


			<h2>Deferred Form Data</h2>
			<pre>
				{JSON.stringify(rfDeferred.formData, null, 2)}
			</pre>
			<h2>Deferred Form Types</h2>
			<pre>
				{JSON.stringify(getTypeMap(rfDeferred.formData), null, 2)}
			</pre>

			<h2>Immediate Form Data</h2>
			<pre>
				{JSON.stringify(rfImmediate.formData, null, 2)}
			</pre>
			<h2>Immediate Form Types</h2>
			<pre>
				{JSON.stringify(getTypeMap(rfImmediate.formData), null, 2)}
			</pre>

			<h2>Forced Form Data</h2>
			<pre>
				{JSON.stringify(rfForced.formData, null, 2)}
			</pre>
			<h2>Immediate Form Types</h2>
			<pre>
				{JSON.stringify(getTypeMap(rfForced.formData), null, 2)}
			</pre>
		</div>
	)
}

export default Validation

