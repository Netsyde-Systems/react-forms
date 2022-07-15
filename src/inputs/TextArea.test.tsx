import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TextArea from './TextArea'

it('displays supplied value', () => {
	const textArea = render(<TextArea id='txtAreaInput' value='Expected Text' onChange={() => null} />)
	const input = textArea.getByDisplayValue('Expected Text')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const textArea = render(<TextArea id='txtAreaInput' value='Expected Text' onChange={() => null} />)
	const input = textArea.getByDisplayValue('Expected Text')
	expect(input).toHaveAttribute('id', 'txtAreaInput')
})

it('calls onChange function', () => {
	const handleChange = jest.fn()

	const textArea = render(<TextArea id='txtAreaInput' value='Expected Text' onChange={handleChange} />)
	const input = textArea.getByDisplayValue('Expected Text')

	fireEvent.change(input, { target: { value: 'New Value' } })

	expect(handleChange).toHaveBeenCalledWith('New Value')
})

it('has no label when not provided', () => {
	const textArea = render(<TextArea id='txtAreaInput' value='Expected Text' onChange={() => null} />)
	const label = textArea.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/^\s*$/)
})

it('has the correct label when provided', () => {
	const textArea = render(<TextArea id='txtAreaInput' value='Expected Text' onChange={() => null} label='Expected Label Value'  />)
	const label = textArea.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Label Value')
})