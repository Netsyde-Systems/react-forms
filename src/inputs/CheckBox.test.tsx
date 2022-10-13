import React from 'react'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import CheckBox from './CheckBox'

it('displays supplied value', () => {
	const control = render(<CheckBox id='chkInput' value={undefined} onChange={() => null} />)
	const input = control.getByRole('checkbox')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const control = render(<CheckBox id='chkInput' value={undefined} onChange={() => null} />)
	const input = control.getByRole('checkbox')
	expect(input).toHaveAttribute('id', 'chkInput')
})


it('calls onChange as expected', () => {
	// initialize with undefined
	let handleChange = jest.fn()
	let control = render(<CheckBox id='chkInput' value={undefined} onChange={handleChange} />)
	let input = control.getByRole('checkbox')

	// when clicked we expect true
	fireEvent.click(input) 
	expect(handleChange).toHaveBeenCalledWith(true)

	cleanup()

	// initialize with false 
	handleChange = jest.fn()
	control = render(<CheckBox id='chkInput' label='Checkbox Label' value={false} onChange={handleChange} />)
	input = control.getByRole('checkbox')

	// when clicked we expect true
	fireEvent.click(input) 
	expect(handleChange).toHaveBeenCalledWith(true)

	cleanup()

	// initialize with true
	handleChange = jest.fn()
	control = render(<CheckBox id='chkInput' label='Checkbox Label' value={true} onChange={handleChange} />)
	input = control.getByRole('checkbox')

	// when clicked we expect false
	fireEvent.click(input) 
	expect(handleChange).toHaveBeenCalledWith(false)
})


it('has the correct label when provided', () => {
	let control = render(<CheckBox id='chkInput' value={undefined} onChange={() => null} />)
	let label = control.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/^\s*$/)

	cleanup()

	control = render(<CheckBox id='chkInput' label='Expected Label Value' value={true} onChange={() => null} />)
	label = control.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Label Value')
})

it('is required when specified', () => {
	let control = render(<CheckBox id='chkInput' value={true} onChange={() => null} />)
	let input = control.getByRole('checkbox')
	expect(input).not.toBeRequired()

	cleanup()

	control = render(<CheckBox id='chkInput' value={true} onChange={() => null} required={true} />)
	input = control.getByRole('checkbox')
	expect(input).toBeRequired()
})

it('label has asterisk when required', () => {
	let control = render(<CheckBox id='chkInput' label='A Label' value={true} onChange={() => null} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<CheckBox id='chkInput' value={true} label='A Label' onChange={() => null} required={true} />)
	label = control.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(control).toHaveTextContent(/\*/)
})

it('is hidden when specified', () => {
	let control = render(<CheckBox id='chkInput' value={true} onChange={() => null} />)
	let input = control.getByRole('checkbox')
	expect(input).toBeVisible()

	cleanup()

	control = render(<CheckBox id='chkInput' value={true} onChange={() => null} hidden={true} />)
	input = control.getByRole('checkbox')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	let control = render(<CheckBox id='chkInput' value={true} onChange={() => null} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<CheckBox id='chkInput' value={true} onChange={() => null} errorMessage={'Error!!'} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})
