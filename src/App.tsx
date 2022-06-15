import React from 'react'
import './App.scss'

import Header from './header/Header'
import { ButtonProps } from './button/Button'
import Well from './well/Well'
import { TextInput } from './inputs/TextInput'
import { TextArea } from './inputs/TextArea'
import { SelectOption } from './inputs/inputs'
import { SelectText } from './inputs/SelectText'
import SelectNumber from './inputs/SelectNumber'

function App() {

	const [textInputValue, setTextInputValue] = React.useState('')
	const [textAreaValue, setTextAreaValue] = React.useState('')
	const [selectTextValue, setSelectTextValue] = React.useState<string | null>(null)
	const [selectNumberValue, setSelectNumberValue] = React.useState<number | null>(null)

	const [controlsHaveErrors, setControlErrors] = React.useState(false)
	const [controlsAreDisabled, disableControls] = React.useState(false)
	const [controlsAreReadonly, makeControlsReadonly] = React.useState(false)

	const clearInputs = () => {setTextAreaValue(''); setTextInputValue(''); setSelectTextValue(null); setSelectNumberValue(null) }

	const toggleButtonText = {
		error: `${controlsHaveErrors ? 'Clear' : 'Set'} Errors`, 
		readonly: `Make Controls ${controlsAreReadonly ? 'Editable' : 'Readonly'}`, 
		disable: `${controlsAreDisabled ? 'Enable' : 'Disable'} Controls`, 
		primary: `Primary ${controlsAreDisabled ? '(Disabled)' : '(Enabled)'}`
	}

	const buttonDefs: Array<ButtonProps> = [
		{ type: 'secondary', text: 'Clear Inputs', onClick: clearInputs }, 
		{ type: 'secondary', text: toggleButtonText.error, onClick: () => setControlErrors(!controlsHaveErrors) }, 
		{ type: 'secondary', text: toggleButtonText.readonly, onClick: () => makeControlsReadonly(!controlsAreReadonly) }, 
		{ type: 'secondary', text: toggleButtonText.disable, onClick: () => disableControls(!controlsAreDisabled) }, 
		{ type: 'primary', text: toggleButtonText.primary, onClick: () => alert('Primary Button Pressed!'), disabled: controlsAreDisabled }, 
	]

	const sharedProperties = {
		errorMessage: controlsHaveErrors ? 'There is an Error of some sort' : undefined, 
		readOnly: controlsAreReadonly, 
		disabled: controlsAreDisabled
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
		<div className="app">
			<Header pageName='Test Page' />
			<Well title={"Well Title"} buttonDefs={buttonDefs} >
				<p>Well content</p>
				<TextInput id='txtInput1' label='Text Input' value={textInputValue} onChange={setTextInputValue} placeholder="Text Input Placeholder" {...sharedProperties}  />
				<SelectText id='selTextInput' label='Select Text' value={selectTextValue} onChange={setSelectTextValue} placeholder="Select Text Placeholder" selectOptions={textSelectOptions} {...sharedProperties} />
				<SelectNumber id='selNumInput' label='Select Number' value={selectNumberValue} onChange={setSelectNumberValue} placeholder="Select Number Placeholder" selectOptions={numberSelectOptions} {...sharedProperties} />
				<TextArea id='txtArea1' label='Text Area' value={textAreaValue} onChange={setTextAreaValue} placeholder="Text Area Placeholder" rows={5} {...sharedProperties} />
				<p>TextInputValue: {textInputValue}</p>
				<p>SelectTextValue: {selectTextValue}; Text value is of type: {typeof selectTextValue}; Text value is null? {selectTextValue === null && 'true' ? 'true' : 'false'}</p>
				<p>SelectNumberValue: {selectNumberValue}; Number value is of type: {typeof selectNumberValue}; Number value is null? {selectNumberValue === null ? 'true' : 'false'}</p>
				<p>TextAreaValue: </p><pre>{textAreaValue}</pre>
			</Well>
		</div>
	)
}

export default App
