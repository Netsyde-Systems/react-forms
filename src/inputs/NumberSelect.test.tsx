import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NumberSelect from './NumberSelect'
import { SelectOption } from './inputs'

//Value One
it('displays supplied value', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const numberSelect = render(<NumberSelect id='selNumInput' value={1} onChange={() => null} selectOptions={numberSelectOptions}/>)
	const input = numberSelect.getByDisplayValue('Option One')
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

//Value Two
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

	const numberSelect = render(<NumberSelect id='selNumInput' value={2} onChange={() => null} selectOptions={numberSelectOptions} />)
	const input = numberSelect.getByDisplayValue('Option Two')
	expect(input).toHaveAttribute('id', 'selNumInput')
})

//Value Three
it('displays supplied value', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const numberSelect = render(<NumberSelect id='selNumInput' value={3} onChange={() => null} selectOptions={numberSelectOptions} />)
	const input = numberSelect.getByDisplayValue('Option Three')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const numberSelect = render(<NumberSelect id='selNumInput' value={3} onChange={() => null} selectOptions={numberSelectOptions} />)
	const input = numberSelect.getByDisplayValue('Option Three')
	expect(input).toHaveAttribute('id', 'selNumInput')
})

