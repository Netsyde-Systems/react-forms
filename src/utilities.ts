export const Languages = {
	'en-CA': 'English', 
	'fr-CA': 'French', 
}

export type Locale = keyof typeof Languages

export const toIsoGmtDateString = (date?: Date | null) => date?.toISOString().substring(0, 10) ?? ''

// Support typed object iteration.  Hack fix to address: https://effectivetypescript.com/2020/05/26/iterate-objects/
export function iterateObject<T>(obj: T, iteratorFunction: (fieldName: keyof T, fieldValue: T[keyof T], obj: T) => void ) {
	Object.entries(obj as any).forEach(([key, val]) => {
		iteratorFunction(key as keyof T, val as T[keyof T], obj)
	})
}

export const getTypeMap = (obj: any) => {
	let typeMap = Object.keys(obj).reduce((typeMap, key) => {
		typeMap[key] = typeof obj[key]
		return typeMap
	}, {} as any)
	return typeMap
}
