import React from 'react'
import logo from './logo.svg'
import './App.scss'

import Header from './header/Header'
import { Button, ButtonProps } from './button/Button'
import Well from './well/Well'
import { TextInput } from './inputs/TextInput'

function App() {

	const [text, setText] = React.useState('')
	const [hasError, setError] = React.useState(false)

	const buttonDefs: Array<ButtonProps> = [
		{ type: 'secondary', text: `${hasError ? 'Clear' : 'Set'} Error `, onClick: () => setError(!hasError) }, 
		{ type: 'primary', text: 'Go', onClick: () => alert('Go Button Pressed!') }, 
	]

	return (
		<div className="app">
			<Header pageName='Test Page' />
			<Well title={"This is the Well's Title"} buttonDefs={buttonDefs} >
				This is a well, and here are its contents.  Add some more via the input below.
				<p>{text}</p>
			</Well>
			<TextInput id='test-message' label='Test Input' value={text} onChange={setText} errorMessage={hasError ? 'There is an error!' : ''}  />
		</div>
	)
}

export default App
