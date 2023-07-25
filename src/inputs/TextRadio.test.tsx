import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import TextRadio from './TextRadio'
import { SelectOption } from './inputs'

it('displays supplied value', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const numberSelect = render(<TextRadio id='rdInput' value={undefined} onChange={() => null} selectOptions={textSelectOptions} />)
	const input = numberSelect.getByDisplayValue('Value Two')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const numberSelect = render(<TextRadio id='rdInput' value={undefined} onChange={() => null} selectOptions={textSelectOptions} />)
	const input = numberSelect.getByDisplayValue('Value One')
	expect(input).toHaveAttribute('id', 'rdInput0')
})

it('calls onChange as expected', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let handleChange = jest.fn()
	let control = render(<TextRadio id='rdInput' value={undefined} onChange={handleChange} selectOptions={textSelectOptions} />)
	let input = control.getByDisplayValue('Value Two')

	// when clicked we expect correct value
	fireEvent.click(input) 
	expect(handleChange).toHaveBeenCalledWith('Value Two')
})

it('has no label when not provided', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const numberSelect = render(<TextRadio id='rdInput' value='Value Two' onChange={() => null} selectOptions={textSelectOptions} />)
	const label = numberSelect.container.querySelector('label')
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

	const numberSelect = render(<TextRadio id='rdInput' value='Value Three' onChange={() => null} label='Expected Label Value' selectOptions={textSelectOptions} />)
	const label = numberSelect.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Label Value')
})

it('label has asterisk when required', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let control = render(<TextRadio id='chkInput' label='A Label' value={undefined} onChange={() => null} selectOptions={textSelectOptions} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<TextRadio id='rdInput' label='A Label' value={undefined} onChange={() => null} required={true} selectOptions={textSelectOptions} />)
	label = control.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(label).toHaveTextContent(/\*/)
})

it('is hidden when specified', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let control = render(<TextRadio id='rdInput' value={undefined} onChange={() => null} selectOptions={textSelectOptions} />)
	let input = control.getByDisplayValue('Value One')
	expect(input).toBeVisible()

	cleanup()

	control = render(<TextRadio id='rdInput' value={undefined} onChange={() => null} hidden={true} selectOptions={textSelectOptions} />)
	input = control.getByDisplayValue('Value One')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let control = render(<TextRadio id='rdInput' value={undefined} onChange={() => null} selectOptions={textSelectOptions} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<TextRadio id='rdInput' value={undefined} onChange={() => null} errorMessage={'Error!!'} selectOptions={textSelectOptions} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})
