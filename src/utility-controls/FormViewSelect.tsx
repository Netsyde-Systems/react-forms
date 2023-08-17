import { SelectOption } from '../inputs/inputs'
import { TextSelect } from '../inputs/TextSelect'
import { assertNever } from '../utilities'

const ALL_FORM_VIEWS = ['Edit', 'ReadOnly', 'Disabled'] as const

export type FormView = typeof ALL_FORM_VIEWS[number]

const formViewOptions: Array<SelectOption<FormView>> = ALL_FORM_VIEWS.map(formView => ({ text: formView, value: formView }))

export interface FormViewState {
	isDisabled: boolean
	isReadOnly: boolean
}

export function getFormViewState(formView: FormView): FormViewState {
	let state: FormViewState = { isDisabled: false, isReadOnly: false }

	switch (formView) {
		case 'Edit':
			// No need to change the state
			break
		case 'ReadOnly':
			state.isReadOnly = true
			break
		case 'Disabled':
			state.isDisabled = true
			break
		default: assertNever(formView)
	}

	return state
}

export interface FormViewSelectProps {
	currentFormView: FormView
	onFormViewChange: (formView: FormView) => void
}

export function FormViewSelect(props: FormViewSelectProps) {
	return <TextSelect id='form-view-select' value={props.currentFormView} onChange={val => props.onFormViewChange(val as FormView )} selectOptions={formViewOptions} disallowBlank errorMessage={false} label='Form View' />
}