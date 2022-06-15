import React from 'react'
import './App.scss'

import Header from './header/Header'
import { ButtonProps } from './button/Button'
import Well from './well/Well'
import { TextInput } from './inputs/TextInput'
import { TextArea } from './inputs/TextArea'

function App() {

	const [textInputValue, setTextInputValue] = React.useState('')
	const [textAreaValue, setTextAreaValue] = React.useState('')

	const [controlsHaveErrors, setControlErrors] = React.useState(false)
	const [controlsAreDisabled, disableControls] = React.useState(false)
	const [controlsAreReadonly, makeControlsReadonly] = React.useState(false)

	const toggleButtonText = {
		error: `${controlsHaveErrors ? 'Clear' : 'Set'} Errors`, 
		readonly: `Make Controls ${controlsAreReadonly ? 'Editable' : 'Readonly'}`, 
		disable: `${controlsAreDisabled ? 'Enable' : 'Disable'} Controls`, 
		primary: `Primary ${controlsAreDisabled ? '(Disabled)' : '(Enabled)'}`
	}

	const buttonDefs: Array<ButtonProps> = [
		{ type: 'secondary', text: 'Clear Inputs', onClick: () => { setTextAreaValue(''); setTextInputValue(''); } }, 
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

	return (
		<div className="app">
			<Header pageName='Test Page' />
			<Well title={"Well Title"} buttonDefs={buttonDefs} >
				<p>Well content</p>
				<TextInput id='txtInput1' label='Text Input Label' value={textInputValue} onChange={setTextInputValue} placeholder="Text Input Placeholder" {...sharedProperties}  />
				<TextArea id='txtArea1' label='Text Area Label' value={textAreaValue} onChange={setTextAreaValue} placeholder="Text Area Placeholder" rows={5} {...sharedProperties} />
				<p>TextInputValue: {textInputValue}</p>
				<p>TextAreaValue: <pre>{textAreaValue}</pre></p>
			</Well>
		</div>
	)
}

export default App
