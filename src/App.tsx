import React from 'react'
import logo from './logo.svg'
import './App.scss'

import Header from './header/Header'
import { Button, ButtonProps } from './button/Button'
import Well from './well/Well'

function App() {

	const buttonDefs: Array<ButtonProps> = [
		{type: 'secondary', text: 'Cancel', onClick: () => alert('Cancel Button Pressed!')}, 
		{type: 'primary', text: 'Go', onClick: () => alert('Go Button Pressed!')}, 
	]

	return (
		<div className="app">
			<Header pageName='Test Page' />
			<Well title={'This is a Well Title'} buttonDefs={buttonDefs} >
				These are some well contents
			</Well>
		</div>
	)
}

export default App
