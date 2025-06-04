import userEvent from '@testing-library/user-event'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import MaskedInput from './MaskedInput'

it('displays supplied value', () => {
	const maskedInput = render(<MaskedInput id='txtMaskedInput' onChange={() => null} value={'null'} mask={''} />)
	const input = maskedInput.getByDisplayValue('')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const maskedInput = render(<MaskedInput id='txtMaskedInput' onChange={() => null} value={'null'} mask={''} />)
	const input = maskedInput.getByDisplayValue('')
	expect(input).toHaveAttribute('id', 'txtMaskedInput')
})

// TODO: investigate masked input behavior
xit('calls onChange function', async () => {
	const user = userEvent.setup();
	const handleChange = jest.fn()

	const maskedInput = render(<MaskedInput id='txtMaskedInput' onChange={handleChange} value={undefined} mask={'a00'} />)
	const input = maskedInput.getByDisplayValue('')

	// fireEvent.change(input, { target: { value: 'x12' } })
	// expect(handleChange).toHaveBeenCalledWith('x12')

	await user.type(input, 'x12')
	expect(handleChange).toHaveBeenCalledTimes(3)
	expect(handleChange).lastCalledWith('x12')
})

// TODO: investigate masked input behavior
xit('prevents onChange calls out of mask domain', async () => {
	const user = userEvent.setup();
	const handleChange = jest.fn()

	const maskedInput = render(<MaskedInput id='txtMaskedInput' onChange={handleChange} value={undefined} mask={'a00'} />)
	const input = maskedInput.getByDisplayValue('')

	// fireEvent.change(input, { target: { value: 'x12' } })
	// expect(handleChange).toHaveBeenCalledWith('x12')

	await user.type(input, 'a12345')
	/*
	expect(handleChange).toHaveBeenCalledTimes(6)
	expect(handleChange).lastCalledWith('a12345')
	*/

	expect(handleChange).toHaveBeenCalledTimes(3)
	expect(handleChange).lastCalledWith('a12')
})

it('has no label when not provided', () => {
	const maskedInput = render(<MaskedInput id='txtMaskedInput' onChange={() => null} value={'null'} mask={''} />)
	const label = maskedInput.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/^\s*$/)
})

it('has the correct label when provided', () => {
	const maskedInput = render(<MaskedInput id='txtMaskedInput' onChange={() => null} label='Expected Masked Input' value={'null'} mask={''} />)
	const label = maskedInput.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Masked Input')
})

it('label has asterisk when required', () => {
	let control = render(<MaskedInput id='txtMaskedInput' label='A Label' onChange={() => null} value={'null'} mask={''} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<MaskedInput id='txtMaskedInput' label='A Label' onChange={() => null} required={true} value={'null'} mask={''} />)
	label = control.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(control).toHaveTextContent(/\*/)
})

it('is hidden when specified', () => {
	let control = render(<MaskedInput id='txtMaskedInput' onChange={() => null} value={'null'} mask={''} />)
	let input = control.getByDisplayValue('')
	expect(input).toBeVisible()

	cleanup()

	control = render(<MaskedInput id='txtMaskedInput' onChange={() => null} hidden={true} value={'null'} mask={''} />)
	input = control.getByDisplayValue('')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	let control = render(<MaskedInput id='txtMaskedInput' onChange={() => null} value={'null'} mask={''} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<MaskedInput id='txtMaskedInput' onChange={() => null} errorMessage={'Error!!'} value={'null'} mask={''} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})


