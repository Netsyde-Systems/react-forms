import React from 'react'

import { Locale, toIsoGmtDateString } from '../utilities'

import Button, { ButtonProps } from '../button/Button'
import { Well } from '../well/Well'
import { TextInput } from '../inputs/TextInput'
import { TextArea } from '../inputs/TextArea'
import { SelectOption } from '../inputs/inputs'
import { TextSelect } from '../inputs/TextSelect'
import { NumberSelect } from '../inputs/NumberSelect'
import { CheckBox } from '../inputs/CheckBox'
import { TextRadio } from '../inputs/TextRadio'
import { NumberInput } from '../inputs/NumberInput'
import { DateInput } from '../inputs/DateInput'

import './ControlTests.scss'
import { MaskedInput } from '../inputs/MaskedInput'
import { PhoneNumber } from '../inputs/PhoneNumber'
import { PostalCode } from '../inputs/PostalCode'

function ControlTests() {

	const [locale, setLocale] = React.useState<Locale>()
	const [textInputValue, setTextInputValue] = React.useState<string | null>(null)
	const [numberInputValue, setNumberInputValue] = React.useState<number | null>(null)
	const [dateInputValue, setDateInputValue] = React.useState<Date | null>(null)
	const [selectTextValue, setSelectTextValue] = React.useState<string | null>(null)
	const [selectNumberValue, setSelectNumberValue] = React.useState<number | null>(null)
	const [checkboxValue, setCheckboxValue] = React.useState<boolean | null>(null)
	const [RadioValue, setRadioValue] = React.useState<string | null>(null)
	const [NumberRadioValue, setNumberRadioValue] = React.useState<number | null>(null)
	const [textAreaValue, setTextAreaValue] = React.useState<string | null>(null)
	const [textMaskedValue, setMaskedValue] = React.useState<string | null>(null)
	const [phoneValue, setPhoneValue] = React.useState<number | null>(null)
	const [postalCodeValue, setPostalCodeValue] = React.useState<string | null>(null)

	const [controlsHaveErrors, setControlErrors] = React.useState(false)
	const [controlsAreDisabled, disableControls] = React.useState(false)
	const [controlsAreHidden, hideControls] = React.useState(false)
	const [inputsAreRequired, makeInputsRequired] = React.useState(false)

	const clearInputs = () => { 
		setTextInputValue('')
		setNumberInputValue(null)
		setSelectTextValue(null)
		setSelectNumberValue(null)
		setDateInputValue(null)
		setCheckboxValue(null)
		setRadioValue(null)
		setNumberRadioValue(null)
		setTextAreaValue('')
	}

	const toggleButtonText = {
		clear: `Clear Inputs`, 
		locale: `Toggle Locale (${locale})`, 
		error: `Toggle Errors`, 
		hidden: `Toggle Hidden`, 
		required: `Toggle Required`, 
		disable: `Toggle Disabled`, 
	}

	const buttonDefs: Array<ButtonProps> = [
		{ type: 'secondary', text: toggleButtonText.clear, onClick: clearInputs }, 
		{ type: 'secondary', text: toggleButtonText.locale, onClick: () => setLocale(locale === 'en-CA' ? 'fr-CA' : 'en-CA') }, 
		{ type: 'secondary', text: toggleButtonText.error, onClick: () => setControlErrors(!controlsHaveErrors) }, 
		{ type: 'secondary', text: toggleButtonText.hidden, onClick: () => hideControls(!controlsAreHidden) }, 
		{ type: 'secondary', text: toggleButtonText.disable, onClick: () => disableControls(!controlsAreDisabled) }, 
		{ type: 'secondary', text: toggleButtonText.required, onClick: () => makeInputsRequired(!inputsAreRequired) }, 
	]

	const sharedProperties = {
		errorMessage: controlsHaveErrors ? 'There is an Error of some sort' : undefined, 
		disabled: controlsAreDisabled, 
		required: inputsAreRequired, 
		hidden: controlsAreHidden
	}

	const textSelectOptions: Array<SelectOption<string>> = [
		{ value: 'Value One', text: 'Option One' }, 
		{ value: 'Value Two', text: 'Option Two' }, 
		{ value: 'Value Three', text: 'Option Three' }, 
	]

	const numberSelectOptions: Array<SelectOption<number>> = [
		{ value: 1, text: 'Option One' }, 
		{ value: 2, text: 'Option Two' }, 
		{ value: 3, text: 'Option Three' }, 
	]

	return (
		<div className='control-tests page'>
			<h1>Control Tests</h1>
			<Well title={"Well Title"} buttonDefs={buttonDefs} >
				<p>Well content</p>

				<div className='control-grid'>

					<div className='control-row'>
						<div className='control-cell'>
							<TextInput id='txtInput' label='Text Input' value={textInputValue} onChange={setTextInputValue} placeholder="Text Input Placeholder" {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(textInputValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<NumberInput id='numInput' label='Number Input' value={numberInputValue} onChange={setNumberInputValue} placeholder="Number Input Placeholder" {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(numberInputValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<DateInput id='datInput' label='Date Input' value={dateInputValue} onChange={setDateInputValue} {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(dateInputValue)}<br/>
							ISO GMT DATE: {toIsoGmtDateString(dateInputValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<TextSelect id='selTextInput' label='Text Select' value={selectTextValue} onChange={setSelectTextValue} placeholder="Select Text Placeholder" selectOptions={textSelectOptions} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(selectTextValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<NumberSelect id='selNumInput' label='Number Select' value={selectNumberValue} onChange={setSelectNumberValue} placeholder="Select Number Placeholder" selectOptions={numberSelectOptions} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(selectNumberValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<CheckBox id='chkInput' label='Checkbox Input' value={checkboxValue} onChange={setCheckboxValue} {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(checkboxValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<TextRadio id='rdInput' label='Radio Input' value={RadioValue} onChange={setRadioValue} {...sharedProperties} selectOptions={textSelectOptions}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(RadioValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<NumberSelect id='selNumRadioInput' label='NumberRadio Select' value={NumberRadioValue} onChange={setNumberRadioValue} selectOptions={numberSelectOptions} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(NumberRadioValue)}
						</div>
					</div>


					<div className='control-row'>
						<div className='control-cell'>
							<TextArea id='txtAreaInput' label='Text Area' value={textAreaValue} onChange={setTextAreaValue} placeholder="Text Area Placeholder" rows={5} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							<pre>
								{nullableValueMessage(textAreaValue)}
							</pre>
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<MaskedInput id='txtMaskedInput' label='Masked Input (X12)' value={textMaskedValue} onChange={setMaskedValue} mask='a00' {...sharedProperties} />
						</div>
						<div className='control-cell'>
							<pre>
								{nullableValueMessage(textMaskedValue)}
							</pre>
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<PhoneNumber id='txtPhoneNumber' label='Phone Number' value={phoneValue} onChange={setPhoneValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							<pre>
								{nullableValueMessage(phoneValue)}
							</pre>
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<PostalCode id='txtPostalCode' label='Postal Code' value={postalCodeValue} onChange={setPostalCodeValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							<pre>
								{nullableValueMessage(postalCodeValue)}
							</pre>
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<Button type='secondary' text='Secondary Button' onClick={() => alert('Secondary Button Clicked')} disabled={controlsAreDisabled} hidden={controlsAreHidden} />
						</div>
						<div className='control-cell'>
							<Button type='primary' text='Primary Button' onClick={() => alert('Primary Button Clicked')} disabled={controlsAreDisabled} hidden={controlsAreHidden} />
						</div>
					</div>
				</div>
			</Well>
		</div>
	)
}

function nullableValueMessage(val: any) {
	let output = `Value: '${val}' is of type: '${typeof val}.' `

	if (val === null) output += ' Value is null'

	return output
}

export default ControlTests
