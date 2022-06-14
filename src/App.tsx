import React from 'react'
import logo from './logo.svg'
import './App.scss'

import Header from './header/Header'
import { Button, ButtonProps } from './button/Button'
import Well from './well/Well'
import { TextInput } from './inputs/TextInput'
import { TextArea } from './inputs/TextArea'

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
			<TextInput id='test-input' label='A Test Input' value={text} onChange={setText} errorMessage={hasError ? 'There is an error!' : ''} placeholder="Type your Input."  />
			<TextArea  rows={ 20 } placeholder="Enter your descrption." id="description" label='Descrption' value={undefined} onChange={function (val: string): void {
				throw new Error('Function not implemented.')
			} } errorMessage={hasError ? 'There is an error!' : ''}/>
		</div>
	)
}

export default App
