import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

it('renders page name', () => {
	render(<App />)
	const pageNameElement = screen.getByText(/^Test Page$/i)
	expect(pageNameElement).toBeInTheDocument()
})
