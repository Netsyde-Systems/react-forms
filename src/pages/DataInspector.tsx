import React from "react"
import { FormBuilder } from "../indexExports"
import { getTypeMap, convertBytesToKB } from "../utilities"

import './DataInspector.scss'

export interface DataInspectorProps {
	formBuilder: FormBuilder<any, any>
}

// custom stringify replacers to allow us to inspect file arrays
function stringifyTypeReplacer(key: any, value: any): string | void {
	if (Array.isArray(value) && value.every(v => v.constructor === File)) return 'file array'
	else return value
}

function stringifyValueReplacer(key: any, value: any): string | void {
	if (value.constructor === File) return `file: ${value.name} | size: ${convertBytesToKB(value.size)} kB`
	else return value
}

export const DataInspector: React.FC<DataInspectorProps> = ({ formBuilder }) => {

	return (
		<div className='data-inspector'>
			<div className='values'>
				<strong>Values</strong>
				<pre>
					{JSON.stringify(formBuilder.formData, stringifyValueReplacer, 2)}
				</pre>
			</div>
			<div className='types'>
				<strong>Types</strong>
				<pre>
					{JSON.stringify(getTypeMap(formBuilder.formData), stringifyTypeReplacer, 2)}
				</pre>
			</div>
		</div>
	)

}