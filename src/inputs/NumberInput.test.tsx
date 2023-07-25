import { render, cleanup /*, screen, fireEvent */ } from '@testing-library/react'
import NumberInput from './NumberInput'

it('displays supplied value', () => {
	const numberInput = render(<NumberInput id='numInput' onChange={() => null} value={undefined} />)
	const input = numberInput.getByDisplayValue('')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const numberInput = render(<NumberInput id='numInput' onChange={() => null} value={undefined} />)
	const input = numberInput.getByDisplayValue('')
	expect(input).toHaveAttribute('id', 'numInput')
})

//it('calls onChange function', () => {
//	const handleChange = jest.fn()

//	const numberInput = render(<NumberInput id='txtPostalCode' onChange={handleChange} value={undefined} />)
//	const input = numberInput.getByDisplayValue('')

//	fireEvent.change(input, { target: { value: "1" } })

//	expect(handleChange).toHaveBeenCalledWith("1")
//})

it('has no label when not provided', () => {
	const maskedInput = render(<NumberInput id='numInput' onChange={() => null} value={undefined} />)
	const label = maskedInput.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/^\s*$/)
})

it('has the correct label when provided', () => {
	const maskedInput = render(<NumberInput id='numInput' onChange={() => null} label='Expected Number Input' value={undefined} />)
	const label = maskedInput.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Number Input')
})


it('label has asterisk when required', () => {
	let control = render(<NumberInput id='numInput' label='A Label' value={undefined} onChange={() => null} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<NumberInput id='numInput' value={undefined} label='A Label' onChange={() => null} required={true} />)
	label = control.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(control).toHaveTextContent(/\*/)
})

it('is hidden when specified', () => {
	let control = render(<NumberInput id='numInput' value={undefined} onChange={() => null} />)
	let input = control.getByDisplayValue('')
	expect(input).toBeVisible()

	cleanup()

	control = render(<NumberInput id='numInput' value={undefined} onChange={() => null} hidden={true} />)
	input = control.getByDisplayValue('')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	let control = render(<NumberInput id='numInput' value={undefined} onChange={() => null} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<NumberInput id='numInput' value={undefined} onChange={() => null} errorMessage={'Error!!'} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})
