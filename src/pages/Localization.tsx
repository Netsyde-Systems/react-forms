import React from 'react'
import { FormDefinition, FormData } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import { getTypeMap } from '../utilities'

import './Localization.scss'

type Language = 'en' | 'fr'

interface TestFormShape {
	stringProperty: string
	numberProperty: number
	languageProperty: Language
}

const testFormDefinition: FormDefinition<TestFormShape, Language> = {
	stringProperty: {
		label: {
			en: 'a String', 
			fr: 'une chaîne'
		}

	}, 
	numberProperty: {
		label: {
			en: 'a Number', 
			fr: 'un nombre'
		}
	}, 
	languageProperty: {
		label: {
			en: 'Language', 
			fr: 'le langue'
		}, 
		selectOptions: [
			{ value: 'en', text: 'English' }, 
			// lame type hack for now... TODO: Fix this
			{ value: 'fr' as 'en', text: 'Français' },
		]
	}, 
}

let testFormData: FormData<TestFormShape> = {} 

export function Localization() {
	const rf = useReactForms(testFormDefinition, testFormData)

	if (rf.language !== rf.formData.languageProperty) {
		rf.setLanguage(rf.formData.languageProperty)
	}

	return (
		<div className='forms page'>
			<h1>{rf.localize({ en: 'Locationlization Tests', fr: 'Tests de Localization' })}</h1>

			<div className='control-grid'>

				<div className='control-row'>
					<div className='control-cell'>
						{rf.textInput('stringProperty')}
					</div>
					<div className='control-cell'>
						{rf.numberInput('numberProperty')}
					</div>
					<div className='control-cell'>
						{rf.textSelect('languageProperty')}
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

export default Localization

