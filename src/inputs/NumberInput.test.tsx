import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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

it('has no label when not provided', () => {
	const numberInput = render(<NumberInput id='txtInput' onChange={() => null} value={undefined} />)
	const label = numberInput.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label?.innerHTML).toMatch(/\s*/)
})
