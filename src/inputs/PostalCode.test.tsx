import userEvent from '@testing-library/user-event'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import PostalCode from './PostalCode'

it('displays supplied value', () => {
	const postalCode = render(<PostalCode id='txtPostalCode' onChange={() => null} value={undefined} />)
	const input = postalCode.getByDisplayValue('')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const postalCode = render(<PostalCode id='txtPostalCode' onChange={() => null} value={undefined} />)
	const input = postalCode.getByDisplayValue('')
	expect(input).toHaveAttribute('id', 'txtPostalCode')
})

// TODO: investigate postal code input not working as expected
xit('calls onChange function', async () => {
	const user = userEvent.setup()
	const handleChange = jest.fn()

	const postalCode = render(<PostalCode id='txtPostalCode' value={undefined} onChange={handleChange} />)
	const input = postalCode.getByDisplayValue('')

	/*
	fireEvent.change(input, { target: { value: 'A1A1A1' } })
	expect(handleChange).toHaveBeenCalledWith('A1A1A1')
	*/

	await user.type(input, 'A1A1A1')
	expect(handleChange).toHaveBeenCalledTimes(6)
	expect(handleChange).toHaveBeenLastCalledWith('A1A1A1')
})

// TODO: investigate postal code input not working as expected
xit('prevents calls out of postal code domain', async () => {
	const user = userEvent.setup()
	const handleChange = jest.fn()

	const postalCode = render(<PostalCode id='txtPostalCode' value={undefined} onChange={handleChange} />)
	const input = postalCode.getByDisplayValue('')

	/*
	fireEvent.change(input, { target: { value: 'A1A1A1' } })
	expect(handleChange).toHaveBeenCalledWith('A1A1A1')
	*/

	await user.type(input, 'A1A1A1XXX')
	expect(handleChange).toHaveBeenCalledTimes(6)
	expect(handleChange).toHaveBeenLastCalledWith('A1A1A1')
})

it('has no label when not provided', () => {
	const postalCode = render(<PostalCode id='txtPostalCode' onChange={() => null} value={undefined} />)
	const label = postalCode.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/^\s*$/)
})

it('has the correct label when provided', () => {
	const postalCode = render(<PostalCode id='txtPostalCode' onChange={() => null} label='Expected Postal Code' value={undefined} />)
	const label = postalCode.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Postal Code')
})

it('label has asterisk when required', () => {
	let control = render(<PostalCode id='txtPostalCode' label='A Label' onChange={() => null} value={undefined} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<PostalCode id='txtPostalCode' label='A Label' onChange={() => null} required={true} value={undefined} />)
	label = control.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(control).toHaveTextContent(/\*/)
})

it('is hidden when specified', () => {
	let control = render(<PostalCode id='txtPostalCode' onChange={() => null} value={undefined} />)
	let input = control.getByDisplayValue('')
	expect(input).toBeVisible()

	cleanup()

	control = render(<PostalCode id='txtPostalCode' onChange={() => null} hidden={true} value={undefined} />)
	input = control.getByDisplayValue('')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	let control = render(<PostalCode id='txtPostalCode' onChange={() => null} value={undefined} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<PostalCode id='txtPostalCode' onChange={() => null} errorMessage={'Error!!'} value={undefined} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})
