import { useState, useEffect } from 'react'

export type SetQueryParamType<ParamT extends string | undefined> = (paramValue?: ParamT) => void

export type QueryParamHookType<ParamT extends string | undefined> = [ParamT, SetQueryParamType<ParamT>] 

export function useQueryParam<ParamT extends string | undefined>(paramName: string, defaultParamValue?: ParamT): QueryParamHookType<ParamT> {
	const [queryString, setQueryString] = useState(window.location.search)

 	const searchParams = new URLSearchParams(queryString)
	const paramValue = (searchParams.get(paramName) ?? defaultParamValue) as ParamT

	const setQueryParam: SetQueryParamType<ParamT> = (paramValue) => {
		searchParams.set(paramName, paramValue as string)
		document.location.search = searchParams.toString()
	}

	useEffect(() => {
		window.addEventListener('popstate', () => {
			setQueryString(window.location.search);
		})
	}, [])

	return [paramValue, setQueryParam]
}