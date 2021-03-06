import React from 'react'

import './Header.scss'
import logo from '../images/react-forms-logo.png'

export interface HeaderProps {
	pageName?: string
}

export function Header(props: HeaderProps) {
	return (
		<header>
        	<img src={logo} className="header-logo" alt="React Forms Logo" />
			<div className='header-banner'>
				<div className='header-page-name'>{props.pageName ?? ''}</div>
				<div className='header-app-name'>A Small, Simple, Strongly Typed Forms Library</div>
			</div>
		</header>
	)
}

export default Header