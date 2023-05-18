import { SelectOption } from '../inputs/inputs'
import { TextSelect } from '../inputs/TextSelect'

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

	return <button onClick={() => onLanguageChange(nextLanguage)}>{`Toggle Language ${currentLanguage} -> ${nextLanguage}`}</button>
}

export interface LanguageSelectProps<LanguageT extends string> extends LanguageToggleProps<LanguageT> {
	languageNames?: Record<LanguageT, string>
}

export function LanguageSelect<LanguageT extends string>(props: LanguageSelectProps<LanguageT>) {
	const { currentLanguage, languages, onLanguageChange, languageNames } = props

	const languageOptions: Array<SelectOption<string>> = languages.map(lang => {
		const langOption: SelectOption<string> = {
			value: lang, 
			text: languageNames?.[lang] ?? lang
		}

		return langOption
	})

	return <TextSelect id='lang-select' value={currentLanguage} onChange={val => onLanguageChange(val as LanguageT)} selectOptions={languageOptions} disallowBlank />
}