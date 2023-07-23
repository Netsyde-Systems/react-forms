import { ReactElement, FC } from "react"
import classNames from "classnames"

import Controls from './Controls'
import Forms from './Forms'
import Validation from './Validation'
import Localization from './Localization'
import SubForms from './SubForms'
import { assertNever } from "../utilities"

export type DemoPageType = 'controls' | 'forms' | 'validation' | 'localization' | 'subforms'

export interface DemoPageButtonProps {
	page: DemoPageType 
	selectedPage: DemoPageType 
	setPage: (page: DemoPageType) => void
}

export const DemoPageButton: FC<DemoPageButtonProps> = ({ page, selectedPage, setPage }) => {
	const className = classNames('page-button', { active: page === selectedPage })
	return <button className={className} onClick={() => setPage(page)}>{page}</button>
}

export const DemoPage: FC<{ pageType: DemoPageType }> = ({ pageType }) => {

	let demoPage: ReactElement | null = null

	switch (pageType) {
		case 'controls':
			demoPage = <Controls />
			break
		case 'forms':
			demoPage = <Forms />
			break
		case 'validation':
			demoPage = <Validation />
			break
		case 'localization':
			demoPage = <Localization />
			break
		case 'subforms':
			demoPage = <SubForms />
			break
		default:
			assertNever(pageType)
	}

	return demoPage
}
