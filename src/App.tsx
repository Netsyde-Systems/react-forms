import { useQueryParam } from './hooks/useQueryString'
import { DemoPageType, DemoPageButton, DemoPage } from './pages/DemoPage'

import Header from './header/Header'

import './App.scss'
import './styles/react-forms.scss'

function App() {
	const [demoPageType, setDemoPageType] = useQueryParam<DemoPageType>('page', 'controls')

	return (
		<div className="app">
			<Header />
			<nav>
				<DemoPageButton page='controls' selectedPage={demoPageType} setPage={setDemoPageType} />
				<DemoPageButton page='forms' selectedPage={demoPageType} setPage={setDemoPageType} />
				<DemoPageButton page='validation' selectedPage={demoPageType} setPage={setDemoPageType} />
				<DemoPageButton page='localization' selectedPage={demoPageType} setPage={setDemoPageType} />
				<DemoPageButton page='subforms' selectedPage={demoPageType} setPage={setDemoPageType} />
			</nav>
			<DemoPage pageType={demoPageType} />
		</div>
	)
}

export default App
