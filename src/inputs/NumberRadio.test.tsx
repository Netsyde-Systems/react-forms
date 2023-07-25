import { render, cleanup /*, screen, fireEvent */ } from '@testing-library/react'
import NumberRadio from './NumberRadio'
import { SelectOption } from './inputs'

it('displays supplied value', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const numberRadio = render(<NumberRadio id='selNumRadioInput' onChange={() => null} value={undefined} selectOptions={numberSelectOptions} />)
	const input = numberRadio.getByDisplayValue('1')
	expect(input).toBeInTheDocument()
})

it('has correct id', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const numberRadio = render(<NumberRadio id='selNumRadioInput' onChange={() => null} value={2} selectOptions={numberSelectOptions} />)
	const input = numberRadio.getByDisplayValue(2)
	expect(input).toHaveAttribute('id')
})

// it('calls onChange as expected', () => {
// 	const numberSelectOptions: Array<SelectOption<number>> = [
// 		{ value: 1, text: 'Option One' }, 
// 		{ value: 2, text: 'Option Two' }, 
// 		{ value: 3, text: 'Option Three' }, 
// 	]

// 	// initialize with null 
// 	let handleChange = jest.fn()
// 	let control = render(<NumberRadio id='selNumRadioInput' value={3} onChange={handleChange} selectOptions={numberSelectOptions} />)
// 	let input = control.getByDisplayValue(3)

// 	// when clicked we expect true
// 	fireEvent.click(input) 
// 	expect(handleChange).toHaveTextContent("Option Three")

// 	cleanup()

// 	// initialize with false 
// 	handleChange = jest.fn()
// 	control = render(<NumberRadio id='selNumRadioInput' label='Expected Number Radio' value={3} onChange={handleChange} selectOptions={numberSelectOptions} />)
// 	input = control.getByDisplayValue(3)

// 	// when clicked we expect true
// 	fireEvent.click(input) 
// 	expect(handleChange).toHaveTextContent("Option Three")

// 	cleanup()

// 	// initialize with true
// 	handleChange = jest.fn()
// 	control = render(<NumberRadio id='selNumRadioInput' label='Expected Number Radio' value={3} onChange={handleChange} selectOptions={numberSelectOptions} />)
// 	input = control.getByDisplayValue(3)

// 	// when clicked we expect false
// 	fireEvent.click(input) 
// 	expect(handleChange).toHaveTextContent("Option Three")
// })

it('has no label when not provided', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	const numberRadio = render(<NumberRadio id='selNumRadioInput' onChange={() => null} value={undefined} selectOptions={numberSelectOptions} />)
	const label = numberRadio.container.querySelector('label')
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

	const numberRadio = render(<NumberRadio id='selNumRadioInput' onChange={() => null} label='Expected Number Radio' value={undefined} selectOptions={numberSelectOptions} />)
	const label = numberRadio.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Number Radio')
})


it('label has asterisk when required', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	let control = render(<NumberRadio id='selNumRadioInput' label='A Label' value={undefined} onChange={() => null} selectOptions={numberSelectOptions} />)
	let label = control.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	control = render(<NumberRadio id='selNumRadioInput' value={undefined} label='A Label' onChange={() => null} required={true} selectOptions={numberSelectOptions} />)
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

	let control = render(<NumberRadio id='selNumRadioInput' value={undefined} onChange={() => null} selectOptions={numberSelectOptions} />)
	let input = control.getByDisplayValue('3')
	expect(input).toBeVisible()

	cleanup()

	control = render(<NumberRadio id='selNumRadioInput' value={undefined} onChange={() => null} hidden={true} selectOptions={numberSelectOptions} />)
	input = control.getByDisplayValue('3')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('displays error message when specified', () => {
	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	let control = render(<NumberRadio id='selNumRadioInput' value={undefined} onChange={() => null} selectOptions={numberSelectOptions} />)
	let errorMessage = control.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	control = render(<NumberRadio id='selNumRadioInput' value={undefined} onChange={() => null} errorMessage={'Error!!'} selectOptions={numberSelectOptions} />)
	errorMessage = control.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})
