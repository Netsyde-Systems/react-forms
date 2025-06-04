import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import NumberSelect from './NumberSelect'
import { SelectOption } from './inputs'

it('displays supplied value', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const numberSelect = render(<NumberSelect id='selNumInput' value={2} onChange={() => null} selectOptions={numberSelectOptions} />)
	const input = numberSelect.getByDisplayValue('Option Two')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const numberSelect = render(<NumberSelect id='selNumInput' value={1} onChange={() => null} selectOptions={numberSelectOptions} />)
	const input = numberSelect.getByDisplayValue('Option One')
	expect(input).toHaveAttribute('id', 'selNumInput')
})

//it('calls onChange function', () => {
//	const numberSelectOptions: Array<SelectOption<number>> = [
//		{ value: 1, text: 'Option One' }, 
//		{ value: 2, text: 'Option Two' }, 
//		{ value: 3, text: 'Option Three' }, 
//	]

//	const handleChange = jest.fn()

//	const textInput = render(<NumberSelect id='selNumInput' value={3} onChange={handleChange} selectOptions={numberSelectOptions} />)
//	const input = textInput.getByDisplayValue('Option Three')

//	fireEvent.change(input, { target: { value: '1' } })

//	expect(handleChange).toHaveBeenCalledWith('1')
//})

it('has no label when not provided', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const textInput = render(<NumberSelect id='selNumInput' value={1} onChange={() => null} selectOptions={numberSelectOptions} />)
	const label = textInput.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/^\s*$/)
})

it('has the correct label when provided', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const textInput = render(<NumberSelect id='selNumInput' value={2} label='Number Select' onChange={() => null} selectOptions={numberSelectOptions} />)
	const label = textInput.container.querySelector('label')
	expect(label).toHaveTextContent('Number Select')
})

it('label has asterisk when required', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	let control = render(<NumberSelect id='selNumInput' value={3} onChange={() => null} selectOptions={numberSelectOptions} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<NumberSelect id='selNumInput' value={3} onChange={() => null} required={true} selectOptions={numberSelectOptions} />)
	label = control.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(control).toHaveTextContent(/\*/)
})

it('is hidden when specified', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	let control = render(<NumberSelect id='selNumInput' value={1} onChange={() => null} selectOptions={numberSelectOptions} />)
	let input = control.getByDisplayValue('Option One')
	expect(input).toBeVisible()

	cleanup()

	control = render(<NumberSelect id='selNumInput' value={1} onChange={() => null} hidden={true} selectOptions={numberSelectOptions} />)
	input = control.getByDisplayValue('Option One')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	let control = render(<NumberSelect id='selNumInput' value={2} onChange={() => null} selectOptions={numberSelectOptions} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<NumberSelect id='selNumInput' value={2} onChange={() => null} errorMessage={'Error!!'} selectOptions={numberSelectOptions} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})

it('renders disabled option', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two', disabled: true }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const rendered = render(<NumberSelect id='ctlId' label='Control Label' value={1} onChange={() => null} selectOptions={numberSelectOptions} />)

	const option = rendered.getByText('Option One')
	expect(option).toBeEnabled()

	const disabledOption = rendered.getByText('Option Two')
	expect(disabledOption).toBeDisabled()
})
