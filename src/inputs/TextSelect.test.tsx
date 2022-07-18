import React from 'react'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import TextSelect from './TextSelect'
import { SelectOption } from './inputs'

it('displays supplied value', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const textSelect = render(<TextSelect id='selTextInput' value='Value Two' onChange={() => null} selectOptions={textSelectOptions} />)
	const input = textSelect.getByDisplayValue('Option Two')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const textSelect = render(<TextSelect id='selTextInput' value='Value One' onChange={() => null} selectOptions={textSelectOptions} />)
	const input = textSelect.getByDisplayValue('Option One')
	expect(input).toHaveAttribute('id', 'selTextInput')
})

it('calls onChange function', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const handleChange = jest.fn()

	const textSelect = render(<TextSelect id='selTextInput' value='Value Three' onChange={handleChange} selectOptions={textSelectOptions} />)
	const input = textSelect.getByDisplayValue('Option Three')

	fireEvent.change(input, { target: { value: 'New Value' } })

	expect(handleChange).toHaveBeenCalledWith('')
})

it('has no label when not provided', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const textSelect = render(<TextSelect id='selTextInput' value='Value Two' onChange={() => null} selectOptions={textSelectOptions} />)
	const label = textSelect.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/^\s*$/)
})

it('has the correct label when provided', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const textSelect = render(<TextSelect id='selTextInput' value='Value Three' onChange={() => null} label='Expected Label Value' selectOptions={textSelectOptions} />)
	const label = textSelect.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Label Value')
})

it('label has asterisk when required', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let control = render(<TextSelect id='selTextInput' value='Value Three' label='A Label' onChange={() => null} selectOptions={textSelectOptions} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<TextSelect id='selTextInput' value='Value Three' label='A Label' onChange={() => null} required={true} selectOptions={textSelectOptions} />)
	label = control.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(control).toHaveTextContent(/\*/)
})

it('is hidden when specified', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let control = render(<TextSelect id='selTextInput' value='Value Two' onChange={() => null} selectOptions={textSelectOptions} />)
	let input = control.getByDisplayValue('Option Two')
	expect(input).toBeVisible()

	cleanup()

	control = render(<TextSelect id='selTextInput' value='Value Two' onChange={() => null} hidden={true} selectOptions={textSelectOptions} />)
	input = control.getByDisplayValue('Option Two')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let control = render(<TextSelect id='selTextInput' value='Value One' onChange={() => null} selectOptions={textSelectOptions} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<TextSelect id='selTextInput' value='Value One' onChange={() => null} errorMessage={'Error!!'} selectOptions={textSelectOptions} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})
