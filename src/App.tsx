import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import Header from './header/Header'
import Home from './pages/Home';
import Controls from './pages/Controls';
import Forms from './pages/Forms';
import Validation from './pages/Validation';

import './App.scss'

function App() {

	return (
		<BrowserRouter>
			<div className="app">
				<Header pageName='Test Page' />
				<nav>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='controls'>Controls</NavLink>
					<NavLink to='forms'>Forms</NavLink>
					<NavLink to='validation'>Validation</NavLink>
				</nav>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='controls' element={<Controls />} />
					<Route path='forms' element={<Forms />} />
					<Route path='validation' element={<Validation />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
