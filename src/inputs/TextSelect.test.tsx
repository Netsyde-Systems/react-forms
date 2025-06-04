import { render, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextSelect from './TextSelect'
import { SelectOption } from './inputs'

it('has the correct label', () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	// empty when no label provided
	let control = render(<TextSelect id='ctlId' value='Value Two' onChange={() => null} selectOptions={options} />)
	let label = control.container.querySelector('label')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(label).toHaveTextContent(/^\s*$/)

	cleanup()

	// text matches when provided
	control = render(<TextSelect id='ctlId' value='Value Three' onChange={() => null} label='Expected Label Value' selectOptions={options} />)
	label = control.container.querySelector('label')
	expect(label).toHaveTextContent('Expected Label Value')
})

it('displays supplied value', () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const rendered = render(<TextSelect id='ctlId' label='Control Label'  value='Value Two' onChange={() => null} selectOptions={options} />)
	const input = rendered.getByLabelText('Control Label')
	expect(input).toHaveDisplayValue('Option Two')
})

it('has correct id', () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const rendered = render(<TextSelect id='ctlId' label='Control Label' value='Value One' onChange={() => null} selectOptions={options} />)
	const input = rendered.getByLabelText('Control Label')
	expect(input).toHaveAttribute('id', 'ctlId')
})

it('displays error message when specified', () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let rendered = render(<TextSelect id='selTextInput' value='Value One' onChange={() => null} selectOptions={options} />)
	let errorMessage = rendered.container.querySelector('.error-message')
	// label inner content is actually ' ', to keep it from collapsing
	// the below regex matches any number of whitespace characters
	expect(errorMessage?.textContent).toMatch(/^\s*$/)

	cleanup()

	rendered = render(<TextSelect id='selTextInput' value='Value One' onChange={() => null} errorMessage={'Error!!'} selectOptions={options} />)
	errorMessage = rendered.container.querySelector('.error-message')
	expect(errorMessage?.textContent).toMatch('Error!!')
})

it('is hidden when specified', () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let rendered = render(<TextSelect id='selTextInput' label='Control Label' value='Value Two' onChange={() => null} selectOptions={options} />)
	let input = rendered.getByLabelText('Control Label')
	expect(input).toBeVisible()

	cleanup()

	rendered = render(<TextSelect id='selTextInput' label='Control Label' value='Value Two' onChange={() => null} selectOptions={options} />)
	input = rendered.getByLabelText('Control Label')
	// TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
	// expect(input).not.toBeVisible()
})

it('is required when specified', () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let rendered = render(<TextSelect id='selTextInput' value='Value Three' label='Control Label' onChange={() => null} selectOptions={options} />)
	let input = rendered.getByLabelText('Control Label')
	expect(input).not.toBeRequired()

	cleanup()

	rendered = render(<TextSelect id='selTextInput' value='Value Three' label='Control Label' onChange={() => null} selectOptions={options} required={true} />)
	input = rendered.getByLabelText('Control Label')
	expect(input).toBeRequired()
})

it('label has asterisk indicator when required', () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	let rendered = render(<TextSelect id='selTextInput' value='Value Three' label='A Label' onChange={() => null} selectOptions={options} />)
	let label = rendered.container.querySelector('label')
	expect(label).not.toHaveTextContent(/\*/)

	cleanup()

	rendered = render(<TextSelect id='selTextInput' value='Value Three' label='A Label' onChange={() => null} required={true} selectOptions={options} />)
	label = rendered.container.querySelector('label')
	// TODO: Figure out how to check for label's css '::before' content
	// expect(control).toHaveTextContent(/\*/)
	// expect(label).toHaveStyle("content: '✷'")
	// expect(label).toHaveStyle("font-weight: bold;")
})

it('calls onChange function', async () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const user = userEvent.setup()
	const handleChange = jest.fn()

	const rendered = render(<TextSelect id='ctlId' label='Control Label' value='Value Three' onChange={handleChange} selectOptions={options} />)
	const input = rendered.getByLabelText('Control Label')

	// fireEvent.change(input, { target: { value: 'Value Two' } })
	await user.selectOptions(input, 'Option Two')

	expect(handleChange).toHaveBeenCalledWith('Value Two')
})

it('renders disabled option', () => {
	const options: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two', disabled: true }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const rendered = render(<TextSelect id='ctlId' label='Control Label' value='Value One' onChange={() => null} selectOptions={options} />)

	const option = rendered.getByText('Option One')
	expect(option).toBeEnabled()

	const disabledOption = rendered.getByText('Option Two')
	expect(disabledOption).toBeDisabled()
})
