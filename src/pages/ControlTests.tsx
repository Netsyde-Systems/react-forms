import React from 'react'

import { ButtonProps } from '../button/Button'
import Well from '../well/Well'
import { TextInput } from '../inputs/TextInput'
import { TextArea } from '../inputs/TextArea'
import { SelectOption } from '../inputs/inputs'
import { SelectText } from '../inputs/SelectText'
import SelectNumber from '../inputs/SelectNumber'
import { CheckBox } from '../inputs/CheckBox'
import { NumberInput } from '../inputs/NumberInput'

import './ControlTests.scss'

function ControlTests() {

	const [textInputValue, setTextInputValue] = React.useState<string | null>(null)
	const [textAreaValue, setTextAreaValue] = React.useState<string | null>(null)
	const [selectTextValue, setSelectTextValue] = React.useState<string | null>(null)
	const [selectNumberValue, setSelectNumberValue] = React.useState<number | null>(null)
	const [checkboxValue, setcheckboxValue] = React.useState<boolean | null>(null)
	const [numberInputValue, setNumberInputValue] = React.useState<number | null>(null)

	const [controlsHaveErrors, setControlErrors] = React.useState(false)
	const [controlsAreDisabled, disableControls] = React.useState(false)
	const [controlsAreReadonly, makeControlsReadonly] = React.useState(false)
	const [inputsAreRequired, makeInputsRequired] = React.useState(false)

	const clearInputs = () => {setTextAreaValue(''); setTextInputValue(''); setSelectTextValue(null); setSelectNumberValue(null) }

	const toggleButtonText = {
		error: `${controlsHaveErrors ? 'Clear' : 'Set'} Errors`, 
		readonly: `Make Text Controls ${controlsAreReadonly ? 'Editable' : 'Readonly'}`, 
		required: `Make Inputs ${inputsAreRequired ? 'Optional' : 'Required'}`, 
		disable: `${controlsAreDisabled ? 'Enable' : 'Disable'} Controls`, 
		primary: `Primary ${controlsAreDisabled ? '(Disabled)' : '(Enabled)'}`
	}

	const buttonDefs: Array<ButtonProps> = [
		{ type: 'secondary', text: 'Clear Inputs', onClick: clearInputs }, 
		{ type: 'secondary', text: toggleButtonText.error, onClick: () => setControlErrors(!controlsHaveErrors) }, 
		{ type: 'secondary', text: toggleButtonText.readonly, onClick: () => makeControlsReadonly(!controlsAreReadonly) }, 
		{ type: 'secondary', text: toggleButtonText.disable, onClick: () => disableControls(!controlsAreDisabled) }, 
		{ type: 'secondary', text: toggleButtonText.required, onClick: () => makeInputsRequired(!inputsAreRequired) }, 
		{ type: 'primary', text: toggleButtonText.primary, onClick: () => alert('Primary Button Pressed!'), disabled: controlsAreDisabled }, 
	]

	const sharedProperties = {
		errorMessage: controlsHaveErrors ? 'There is an Error of some sort' : undefined, 
		readOnly: controlsAreReadonly, 
		disabled: controlsAreDisabled, 
		required: inputsAreRequired
	}

	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	return (
		<div className='control-tests page'>
			<h1>Control Tests</h1>
			<Well title={"Well Title"} buttonDefs={buttonDefs} >
				<p>Well content</p>

				<div className='control-grid'>

					<div className='control-row'>
						<div className='control-cell'>
							<TextInput id='txtInput1' label='Text Input' value={textInputValue} onChange={setTextInputValue} placeholder="Text Input Placeholder" {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(textInputValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<NumberInput id='numInput1' label='Number Input' value={numberInputValue} onChange={setNumberInputValue} placeholder="Number Input Placeholder" {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(numberInputValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<SelectText id='selTextInput' label='Select Text' value={selectTextValue} onChange={setSelectTextValue} placeholder="Select Text Placeholder" selectOptions={textSelectOptions} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(selectTextValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<SelectNumber id='selNumInput' label='Select Number' value={selectNumberValue} onChange={setSelectNumberValue} placeholder="Select Number Placeholder" selectOptions={numberSelectOptions} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(selectNumberValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<CheckBox id='chkInput1' label='Checkbox Input' value={checkboxValue} onChange={setcheckboxValue} {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(checkboxValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<TextArea id='txtArea1' label='Text Area' value={textAreaValue} onChange={setTextAreaValue} placeholder="Text Area Placeholder" rows={5} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							<pre>
								{nullableValueMessage(textAreaValue)}
							</pre>
						</div>
					</div>
				</div>
			</Well>
		</div>
	)
}

function nullableValueMessage(val: any) {
	let output = `Value: '${val}' is of type: '${typeof val}.' `

	if (val === null) output += ' Value is null'

	return output
}

export default ControlTests
