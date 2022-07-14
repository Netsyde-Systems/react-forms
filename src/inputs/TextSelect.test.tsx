import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TextSelect from './TextSelect'
import { SelectOption } from './inputs'

it('displays supplied value', () => {
	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]
	const textSelect = render(<TextSelect id='selTextInput' value='Value One' onChange={() => null} selectOptions={textSelectOptions} />)
	const input = textSelect.getByDisplayValue('Option One')
	expect(input).toBeInTheDocument()
})
