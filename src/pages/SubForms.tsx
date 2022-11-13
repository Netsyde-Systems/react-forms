import React from 'react'
import Button from '../button/Button'
import { FormDefinition, FormData } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import FormInspector from './FormInspector'

import './SubForms.scss'

type Language = 'en' | 'fr'

interface FormShape {
	stringProperty: string
	numberProperty: number
	languageProperty: Language
	subFormsProperty: Array<SubFormShape>
}

interface SubFormShape {
	dateProperty: Date
	booleanProperty: boolean
}

const formDefinition: FormDefinition<FormShape, Language> = {
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
	}, 
	subForms: {
		subFormsProperty: {
			formDefinition: {
				fields: {
					dateProperty: {
						label: {
							en: 'A Date',
							fr: 'une date'
						}
					}, 
					booleanProperty: {
						// in order to make radio/checkbox labels clickable we need unique ids
						id: (fieldValue, fieldName, formData, formDefinition, language, subFormIndex, rootFormData) => {
							return `bool_${subFormIndex}`
						},
						label: {
							en: 'A Boolean',
							fr: 'un booléen'
						}
					}

				}
			}

		}
	}
}

let testFormData: FormData<FormShape> = {} 

export function Localization() {
	const rf = useReactForms(formDefinition, testFormData)

	if (rf.language !== rf.formData.languageProperty) {
		rf.setLanguage(rf.formData.languageProperty)
	}

	return (
		<FormInspector formBuilder={rf}>
			<div className='forms page'>
				<h1>SubForms</h1>

				<div className='control-grid'>

					<h2>Main Form</h2>
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


					<h2>Sub Forms</h2>
					<div>TODO:  Figure out why we have to pass the SubFormShape as a generic constraint</div>
					<div>TODO:  Figure out how to infer the shape from the field name instead</div>
					{rf.subFormLoop<SubFormShape>('subFormsProperty', (srf, controller) => {
						return (
							<div className='control-row' key={controller.subFormIndex}>
								<div className='control-cell'>
									{srf.dateInput('dateProperty')}
								</div>
								<div className='control-cell'>
									{srf.checkbox('booleanProperty')}
								</div>
								<div className='control-cell'>
									<Button text='Delete' onClick={controller.deleteInstance} />
								</div>
							</div>
						)
					})}
					{rf.subFormPanel('subFormsProperty', (controller) => {
						return (
							<div className='control-row'>
								<Button text='Add New' onClick={controller.addInstance} />
							</div>
						)
					})}
				</div>
			</div>
		</FormInspector>
	)
}

export default Localization

