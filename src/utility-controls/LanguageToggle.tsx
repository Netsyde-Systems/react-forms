import Button from '../inputs/Button'

export interface LanguageToggleProps<LanguageT extends string> {
	currentLanguage: LanguageT
	languages: Array<LanguageT>
	onLanguageChange: (language: LanguageT) => void
}

export function LanguageToggle<LanguageT extends string>(props: LanguageToggleProps<LanguageT>) {
	const { currentLanguage, languages, onLanguageChange } = props

	const languageIndex = languages.indexOf(currentLanguage)
	let nextLanguageIndex = languageIndex + 1
	if (nextLanguageIndex >= languages.length) nextLanguageIndex = 0
	const nextLanguage = languages[nextLanguageIndex]

	return <Button text={`Toggle Language ${currentLanguage} -> ${nextLanguage}`} onClick={() => onLanguageChange(nextLanguage)} />
}