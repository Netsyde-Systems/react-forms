import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import Header from './header/Header'
import Home from './pages/Home'
import Controls from './pages/Controls'
import Forms from './pages/Forms'
import Validation from './pages/Validation'
import Localization from './pages/Localization'
import SubForms from './pages/SubForms'

import './App.scss'
import { Config } from './utilities'

function App() {

	return (
		<BrowserRouter basename={Config.DeploymentDirectory}>

			<div className="app">
				<Header />
				<nav>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='controls'>Controls</NavLink>
					<NavLink to='forms'>Forms</NavLink>
					<NavLink to='validation'>Validation</NavLink>
					<NavLink to='localization'>Localization</NavLink>
					<NavLink to='subforms'>SubForms</NavLink>
				</nav>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='controls' element={<Controls />} />
					<Route path='forms' element={<Forms />} />
					<Route path='validation' element={<Validation />} />
					<Route path='localization' element={<Localization />} />
					<Route path='subforms' element={<SubForms />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
