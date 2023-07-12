import { FC, PropsWithChildren, useState } from 'react'
import classNames from 'classnames'
import './DemoControlPanel.scss'

export const DemoControlPanel: FC<PropsWithChildren> = ({children}) => {
	const [isOpen, setIsOpen] = useState(false)

	const className = classNames('demo', 'control-panel', { open: isOpen }, { closed: !isOpen })

	const toggleOpen = () => setIsOpen(!isOpen)

	return (
		<div className={className}>
			<button className="panel key" onClick={toggleOpen}>Controls </button>
			<div className="panel controls">
				{children}
			</div>
		</div>
	)
}