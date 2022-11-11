import React from 'react'
import { FormDefinition } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import { getTypeMap } from '../utilities'

import './Localization.scss'

type Language = 'en' | 'fr'

interface TestFormShape {
	stringProperty: string
	numberProperty: number
	stringDropdown: string
	numberDropdown: number
	languageProperty: Language
}

const testFormDefinition: FormDefinition<TestFormShape, Language> = {
	fields: {
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
		stringDropdown: {
			label: {
				en: 'a String dropdown',
				fr: 'une sélecteur de chaîne'
			}, 
			selectOptions: [
				{ value: 'opt1', text: { 
					en: 'Choice One', 
					fr: 'Choix Un'} 
				}, 
				{ value: 'opt2', text: { 
					en: 'Choice Two', 
					fr: 'Choix Deux'} 
				}, 
				{ value: 'opt3', text: { 
					en: 'Choice Three', 
					fr: 'Choix Trois'} 
				}, 
			]
		},
		numberDropdown: {
			label: {
				en: 'a Number dropdown',
				fr: 'un sélecteur de nombre'
			}, 
			selectOptions: [
				{ value: 1, text: { 
					en: 'Choice One', 
					fr: 'Choix Un'} 
				}, 
				{ value: 2, text: { 
					en: 'Choice Two', 
					fr: 'Choix Deux'} 
				}, 
				{ value: 3, text: { 
					en: 'Choice Three', 
					fr: 'Choix Trois'} 
				}, 
			]
		},
		languageProperty: {
			label: {
				en: 'Language',
				fr: 'le langue'
			},
			selectOptions: [
				// Language name always appears in its own language (as is usually the convention)
				{ value: 'en', text: { en: 'English', fr: 'English' } },
				// Hack to make typescript happy that types agree
				{ value: 'fr' as 'en', text: { en: 'Français', fr: 'Français' } },
			]
		}, 
	}
}


export function Localization() {
	const rf = useReactForms(testFormDefinition, {languageProperty: 'en'})

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

				<div className='control-row'>
					<div className='control-cell'>
						{rf.textSelect('stringDropdown')}
					</div>
					<div className='control-cell'>
						{rf.numberSelect('numberDropdown')}
					</div>
					<div className='control-cell'>
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

