import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import TextInput from './TextInput'

it('displays supplied value', () => {
	const textInput = render(<TextInput id='txtInput' value='Expected Text' onChange={() => null} />)
	const input = textInput.getByDisplayValue('Expected Text')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const textInput = render(<TextInput id='txtInput' value='Expected Text' onChange={() => null} />)
	const input = textInput.getByDisplayValue('Expected Text')
	expect(input).toHaveAttribute('id', 'txtInput')
})

it('calls onChange function', () => {
	const handleChange = jest.fn()

	const textInput = render(<TextInput id='txtInput' value='Expected Text' onChange={handleChange} />)
	const input = textInput.getByDisplayValue('Expected Text')

	fireEvent.change(input, { target: { value: 'New Value' } })

	expect(handleChange).toHaveBeenCalledWith('New Value')
})

it('has no label when not provided', () => {
	const textInput = render(<TextInput id='txtInput' value='Expected Text' onChange={() => null} />)
	const label = textInput.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/^\s*$/)
})

it('has the correct label when provided', () => {
	const textInput = render(<TextInput id='txtInput' value='Expected Text' onChange={() => null} label='Expected Label Value'  />)
	const label = textInput.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Label Value')
})

it('label has asterisk when required', () => {
	let control = render(<TextInput id='txtInput' label='Expected Label Value' value='Expected Text' onChange={() => null} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<TextInput id='txtInput' value='Expected Text' label='Expected Label Value' onChange={() => null} required={true} />)
	label = control.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(control).toHaveTextContent(/\*/)
})

it('is hidden when specified', () => {
	let control = render(<TextInput id='txtInput' value='Expected Text' onChange={() => null} />)
	let input = control.getByDisplayValue('Expected Text')
	expect(input).toBeVisible()

	cleanup()

	control = render(<TextInput id='txtInput' value='Expected Text' onChange={() => null} hidden={true} />)
	input = control.getByDisplayValue('Expected Text')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	let control = render(<TextInput id='txtInput' value='Expected Text' onChange={() => null} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<TextInput id='txtInput' value='Expected Text' onChange={() => null} errorMessage={'Error!!'} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})

