import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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
