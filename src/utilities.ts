export const Languages = {
	'en-CA': 'English', 
	'fr-CA': 'French', 
}

export type Locale = keyof typeof Languages

export const toIsoGmtDateString = (date?: Date | null) => date?.toISOString().substring(0, 10) ?? ''
