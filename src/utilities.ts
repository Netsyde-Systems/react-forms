export const Languages = {
	'en-CA': 'English', 
	'fr-CA': 'French', 
}

export type LanguageCode = keyof typeof Languages

export const dateToIsoGmtShortDateString = (date?: Date | null) => date?.toISOString().substring(0, 10) ?? ''

export const shortDateStringToDate = (date?: string | null) => {
	const dateParts = date?.split('-').map(Number)

	if (dateParts && dateParts.length === 3) {
		return new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
	}
	else return undefined
}

// Support typed object iteration.  Hack fix to address: https://effectivetypescript.com/2020/05/26/iterate-objects/
export function iterateObject<T>(obj: T, iteratorFunction: (fieldName: keyof T, fieldValue: T[keyof T], obj: T) => void ) {
	Object.entries(obj as any).forEach(([key, val]) => {
		iteratorFunction(key as keyof T, val as T[keyof T], obj)
	})
}

export const getTypeMap = (obj: any) => {
	if (typeof obj === 'undefined') return 'undefined'

	else {
		let typeMap = Object.keys(obj).reduce((typeMap, key) => {
			const value = obj[key]

			if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0) {
				typeMap[key] = typeof value
			}
			else if (value?.constructor === Date) {
				typeMap[key] = 'date'
			}
			else if (value?.constructor === File) {
				typeMap[key] = 'file'
			}
			else if (Array.isArray(value)) {
				if (value.length === 0) {
					typeMap[key] = 'array'
				}
				else typeMap[key] = getTypeMap(value)
			}
			else typeMap[key] = getTypeMap(value)

			return typeMap
		}, {} as any)

		return typeMap
	}
}

export function getUnique<T>(items: Array<T>): Array<T> {
	return Array.from(new Set(items))
}

export const Config = {
	DeploymentDirectory: process?.env.REACT_APP_DEPLOYMENT_DIRECTORY ?? ''
}

export const BYTES_PER_KILOBYTE = 1024

export const convertBytesToKB = (bytes: number) =>
	Math.round(bytes / BYTES_PER_KILOBYTE)
