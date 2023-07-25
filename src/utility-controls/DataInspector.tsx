import React from "react"
import { FormBuilder } from ".."
import { getTypeMap, convertBytesToKB } from "../utilities"

import './DataInspector.scss'

export interface DataInspectorProps {
	formBuilder: FormBuilder<any, any>
}

// custom stringify replacers to allow us to inspect file arrays
function stringifyValueReplacer(key: any, value: any): string | void {
	if (value?.constructor === File) return `${value.name} | ${convertBytesToKB(value.size)} kB`
	else if (value === undefined) return 'undefined'
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
					{JSON.stringify(getTypeMap(formBuilder.formData), null, 2)}
				</pre>
			</div>
			<div className='changes'>
				<strong>Changes</strong>
				<p>Form has Changes: {(formBuilder.hasChanges).toString()}</p>
			</div>
			<div className='error-conditions'>
				<strong>Error Conditions</strong>
				<p>Form is Valid: {(!!formBuilder.isValid).toString()}</p>
				<pre>
					{JSON.stringify(formBuilder.formState.fieldErrorConditions, null, 2)}
				</pre>
			</div>
		</div>
	)

}