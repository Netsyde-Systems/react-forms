import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import Header from './header/Header'
import ControlTests from './pages/ControlTests';
import FormTests from './pages/FormTests';
import Home from './pages/Home';

import './App.scss'

function App() {

	return (
		<BrowserRouter>
			<div className="app">
				<Header pageName='Test Page' />
				<nav>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='controls'>Control Tests</NavLink>
					<NavLink to='forms'>Form Tests</NavLink>
				</nav>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='controls' element={<ControlTests />} />
					<Route path='forms' element={<FormTests />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
