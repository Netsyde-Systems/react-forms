import Button from '../inputs/Button'
import { FormDefinition, FormData, LocalizedString } from '../formbuilder/FormBuilderTypes'
import useReactForms from '../hooks/useReactForms'
import FormInspector from '../utility-controls/FormInspector'

import './SubForms.scss'

type Language = 'en' | 'fr'

interface FormShape {
	stringProperty: string
	numberProperty: number
	language: Language
	subFormsProperty: Array<SubFormShape>
	req2SubFormsProperty: Array<SubFormShape>
}

interface SubFormShape {
	date: Date
	cost: number
	exclude: boolean
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
		language: {
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
					date: {
						collapseLabels: true, 
						isRequired: true
					}, 
					exclude: {
						// in order to make radio/checkbox labels clickable we need unique ids
						id: ({ subFormIndex }) => {
							return `bool_${subFormIndex}`
						},
						collapseLabels: true
					}, 
					cost: {
						collapseLabels: true, 
						isRequired: true,
						validators: ({ fieldValue }) => fieldValue! > 100 ? ['Error'] : []
					}
				}
			}

		}, 
		req2SubFormsProperty: {
			validators: ({formData, language}) => {
				if (!formData.req2SubFormsProperty || formData.req2SubFormsProperty.length < 2) {
					return [(language && min2SubForms[language]) || min2SubForms.en]
				}
				return []
			},  
			formDefinition: {
				fields: {
					date: {
						collapseLabels: true, 
						isRequired: true
					}, 
					exclude: {
						// in order to make radio/checkbox labels clickable we need unique ids
						id: ({ subFormIndex }) => {
							return `bool_${subFormIndex}`
						},
						collapseLabels: true
					}, 
					cost: {
						collapseLabels: true, 
						isRequired: true,
						validators: ({ fieldValue }) => fieldValue! > 100 ? ['Error'] : []
					}
				}
			}

		}, 
	}
}

const sumCosts = (subForms?: Array<FormData<SubFormShape>>) => {
	if (!subForms || subForms.length === 0) return 0

	else return subForms.reduce((partialSum, subForm) => {
		if (subForm.exclude || !subForm.cost) return partialSum
		else return partialSum + subForm.cost
	}, 0)
}

const subFormHeaders: Record<keyof SubFormShape, LocalizedString<Language>> = {
	date: { en: 'Date', fr: 'Date' }, 
	cost: {en: 'Cost', fr: 'Coût'}, 
	exclude: {en: 'Exclude', fr: 'Exclure'}, 
}

const SumLabel: LocalizedString<Language> = {
	en: 'Sum: ', 
	fr: 'Somme: '
}

const min2SubForms: LocalizedString<Language> = {
	en: 'Minimum two subforms required', 
	fr: 'FR: Un minimum de deux subforms sont necessaire [sp]'
}

let testFormData: FormData<FormShape> = { language: 'en', subFormsProperty: [{}] } 

export function Localization() {
	const rf = useReactForms(formDefinition, testFormData)

	if (rf.formState.language !== rf.formData.language) {
		rf.setLanguage(rf.formData.language)
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
							{rf.textSelect('language')}
						</div>
					</div>


					<h2>Sub Forms</h2>
					{rf.subFormPanel('subFormsProperty', (controller) => {
						return (
							<Button text='Add New' onClick={controller.addInstance} />
						)
					})}
					<table>
						<thead>
							<tr>
								<th>{rf.localize(subFormHeaders.date)}</th>
								<th>{rf.localize(subFormHeaders.cost)}</th>
								<th>{rf.localize(subFormHeaders.exclude)}</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{rf.subFormLoop<SubFormShape>('subFormsProperty', (srf, controller) => {
								return (
									<tr key={controller.subFormIndex}>
										<td>
											{srf.dateInput('date')}
										</td>
										<td>
											{srf.currency('cost')}
										</td>
										<td>
											{srf.checkbox('exclude')}
										</td>
										<td>
											<Button text='Delete' onClick={controller.deleteInstance} />
										</td>
									</tr>
								)
							})}
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td>{rf.localize(SumLabel)} ${sumCosts(rf.formData?.subFormsProperty)}</td>
								<td></td>
								<td></td>
							</tr>
						</tfoot>
					</table>

					<h2>Min 2 Required Sub Forms</h2>
					{rf.subFormPanel('req2SubFormsProperty', (controller) => {
						return (
							<Button text='Add New' onClick={controller.addInstance} />
						)
					})}
					<table>
						<thead>
							<tr>
								<th>{rf.localize(subFormHeaders.date)}</th>
								<th>{rf.localize(subFormHeaders.cost)}</th>
								<th>{rf.localize(subFormHeaders.exclude)}</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{rf.subFormLoop<SubFormShape>('req2SubFormsProperty', (srf, controller) => {
								return (
									<tr key={controller.subFormIndex}>
										<td>
											{srf.dateInput('date')}
										</td>
										<td>
											{srf.currency('cost')}
										</td>
										<td>
											{srf.checkbox('exclude')}
										</td>
										<td>
											<Button text='Delete' onClick={controller.deleteInstance} />
										</td>
									</tr>
								)
							})}
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td>{rf.localize(SumLabel)} ${sumCosts(rf.formData?.req2SubFormsProperty)}</td>
								<td></td>
								<td></td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
			<hr/>
			<div>TODO:  Figure out why we have to pass the SubFormShape as a generic constraint</div>
			<div>TODO:  Figure out how to infer the shape from the field name instead</div>
			<div>TODO:  Figure out why subform validation not working</div>
		</FormInspector>
	)
}

export default Localization

