import { FormDefinition, LocaleLookup } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import FormInspector from '../utility-controls/FormInspector'
import { enCA, frCA } from 'date-fns/locale'

import './Localization.scss'
import { LanguageSelect } from '../utility-controls/LanguageToggle'

const ALL_LANGUAGES = ['en', 'fr'] as const

type Language = typeof ALL_LANGUAGES[number]

const LanguageNames: Record<Language, string> = {
	en: 'English', 
	fr: 'Français'
}

const locales: LocaleLookup<Language> = {
	en: enCA, 
	fr: frCA
}

interface TestFormShape {
	stringProperty: string
	numberProperty: number
	stringDropdown: string
	numberDropdown: number
	dateProperty: Date
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
		dateProperty: {
			label: {
				en: 'a Date',
				fr: 'une date'
			}, 
			locales
		},
		stringDropdown: {
			label: {
				en: 'a String dropdown',
				fr: 'une sélecteur de chaîne'
			},
			selectOptions: [
				{
					value: 'opt1', text: {
						en: 'Choice One',
						fr: 'Choix Un'
					}
				},
				{
					value: 'opt2', text: {
						en: 'Choice Two',
						fr: 'Choix Deux'
					}
				},
				{
					value: 'opt3', text: {
						en: 'Choice Three',
						fr: 'Choix Trois'
					}
				},
			]
		},
		numberDropdown: {
			label: {
				en: 'a Number dropdown',
				fr: 'un sélecteur de nombre'
			},
			selectOptions: [
				{
					value: 1, text: {
						en: 'Choice One',
						fr: 'Choix Un'
					}
				},
				{
					value: 2, text: {
						en: 'Choice Two',
						fr: 'Choix Deux'
					}
				},
				{
					value: 3, text: {
						en: 'Choice Three',
						fr: 'Choix Trois'
					}
				},
			]
		},
	}
}

export function Localization() {
	const rf = useReactForms(testFormDefinition, {language: 'en' as Language})

	return (
		<>
			<LanguageSelect languages={ALL_LANGUAGES.slice()} onLanguageChange={lang => rf.setLanguage(lang)} currentLanguage={rf.formState.language!} languageNames={LanguageNames} />
			<FormInspector formBuilder={rf}>
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
								{rf.localizedDateInput('dateProperty')}
							</div>
						</div>
					</div>
				</div>

			</FormInspector>
		</>
	)
}

export default Localization

