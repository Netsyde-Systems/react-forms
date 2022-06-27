export const Languages = {
	'en-CA': 'English', 
	'fr-CA': 'French', 
}

export type Locale = keyof typeof Languages

export const toIsoGmtDateString = (date?: Date | null) => date?.toISOString().substring(0, 10) ?? ''

export function iterateObject<T>(obj: T, iteratorFunction: (fieldName: keyof T, fieldValue: T[keyof T], obj: T) => void ) {
	Object.entries(obj).forEach(([key, val]) => {
		iteratorFunction(key as keyof T, val, obj)
	})
}
