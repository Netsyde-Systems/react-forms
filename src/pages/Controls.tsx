import React from 'react'

import { TextInput } from '../inputs/TextInput'
import { NumberInput } from '../inputs/NumberInput'
import { TextArea } from '../inputs/TextArea'
import { InputProps, SelectOption } from '../inputs/inputs'
import { TextSelect } from '../inputs/TextSelect'
import { NumberSelect } from '../inputs/NumberSelect'
import { CheckBox } from '../inputs/CheckBox'
import { TextRadio } from '../inputs/TextRadio'
import { NumberRadio } from '../inputs/NumberRadio'
import { DateInput } from '../inputs/DateInput'
import { LocalizedDateInput } from '../inputs/LocalizedDateInput'
import { MaskedInput } from '../inputs/MaskedInput'
import { PhoneNumber } from '../inputs/PhoneNumber'
import { PostalCode } from '../inputs/PostalCode'
import { EmailAddress } from '../inputs/EmailAddress'
import { FileInput } from '../inputs/FileInput'

import './Controls.scss'

import { Locale } from 'date-fns'
import { enCA, frCA } from 'date-fns/locale'
import { LanguageCode, dateToIsoGmtShortDateString } from '../utilities'
import Currency from '../inputs/Currency'

const dateLocales: { [K in LanguageCode]: Locale } = {
	'en-CA': enCA,
	'fr-CA': frCA
}

function Controls() {

	const [locale, setLocale] = React.useState<LanguageCode>('en-CA')
	const [textInputValue, setTextInputValue] = React.useState<string>()
	const [numberInputValue, setNumberInputValue] = React.useState<number>()
	const [dateInputValue, setDateInputValue] = React.useState<Date>()
	const [localizedDateInputValue, setLocalizedDateInputValue] = React.useState<Date>()
	const [selectTextValue, setSelectTextValue] = React.useState<string>()
	const [selectNumberValue, setSelectNumberValue] = React.useState<number>()
	const [checkboxValue, setCheckboxValue] = React.useState<boolean>()
	const [RadioValue, setRadioValue] = React.useState<string>()
	const [NumberRadioValue, setNumberRadioValue] = React.useState<number>()
	const [textAreaValue, setTextAreaValue] = React.useState<string>()
	const [textMaskedValue, setMaskedValue] = React.useState<string>()
	const [phoneValue, setPhoneValue] = React.useState<number>()
	const [dollarValue, setDollarValue] = React.useState<number>()
	const [postalCodeValue, setPostalCodeValue] = React.useState<string>()
	const [emailValue, setEmailValue] = React.useState<string>()
	const [fileValue, setFileValue] = React.useState<Array<File>>()

	const [controlsHaveErrors, setControlErrors] = React.useState(false)
	const [controlsAreDisabled, disableControls] = React.useState(false)
	const [controlsAreHidden, hideControls] = React.useState(false)
	const [controlsAreReadOnly, makeControlsReadonly] = React.useState(false)
	const [controlsAreRequired, makeControlsRequired] = React.useState(false)

	const clearInputs = () => { 
		setTextInputValue(undefined)
		setNumberInputValue(undefined)
		setSelectTextValue(undefined)
		setSelectNumberValue(undefined)
		setDateInputValue(undefined)
		setLocalizedDateInputValue(undefined)
		setCheckboxValue(undefined)
		setRadioValue(undefined)
		setNumberRadioValue(undefined)
		setTextAreaValue(undefined)
		setMaskedValue(undefined)
		setPhoneValue(undefined)
		setDollarValue(undefined)
		setPostalCodeValue(undefined)
		setFileValue(undefined)
	}

	const buttonText = {
		clear: `Clear Inputs`, 
		locale: `Toggle Locale (${locale})`, 
		error: `Toggle Errors`, 
		hidden: `Toggle Hidden`, 
		disable: `Toggle Disabled`, 
		readonly: `Toggle Readonly`, 
		required: `Toggle Required`, 
	}

	const getToggleButtonType = (toggleValue: boolean) => toggleValue ? 'primary' : 'secondary'

	const buttonDefs = [
		{ type: 'secondary', text: buttonText.clear, onClick: clearInputs }, 
		{ type: 'secondary', text: buttonText.locale, onClick: () => setLocale(locale === 'en-CA' ? 'fr-CA' : 'en-CA') }, 
		{ type: getToggleButtonType(controlsHaveErrors), text: buttonText.error, onClick: () => setControlErrors(!controlsHaveErrors) }, 
		{ type: getToggleButtonType(controlsAreHidden), text: buttonText.hidden, onClick: () => hideControls(!controlsAreHidden) }, 
		{ type: getToggleButtonType(controlsAreDisabled), text: buttonText.disable, onClick: () => disableControls(!controlsAreDisabled) }, 
		{ type: getToggleButtonType(controlsAreReadOnly), text: buttonText.readonly, onClick: () => makeControlsReadonly(!controlsAreReadOnly) }, 
		{ type: getToggleButtonType(controlsAreRequired), text: buttonText.required, onClick: () => makeControlsRequired(!controlsAreRequired) }, 
	]

	const sharedProperties: Pick<InputProps<any>, 'errorMessage' | 'disabled' | 'required' | 'readOnly' | 'hidden' | 'controlProps' > = {
		errorMessage: controlsHaveErrors ? 'There is an Error of some sort' : undefined, 
		disabled: controlsAreDisabled, 
		required: controlsAreRequired, 
		readOnly: controlsAreReadOnly,
		hidden: controlsAreHidden, 
		controlProps: { title: 'Control Props Title Test' }
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
		<div className='controls page'>
			<h1>Control Tests</h1>
				<div className='control-grid'>

					<div className='control-row'>
						<div className='control-cell'>
							<TextInput id='txtInput' label='Text Input' value={textInputValue} onChange={setTextInputValue} placeholder="Text Input Placeholder" {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(textInputValue)}
						</div>
						<div className='control-cell'>
							<NumberInput id='numInput' label='Number Input' value={numberInputValue} onChange={setNumberInputValue} placeholder="Number Input Placeholder" {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(numberInputValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
						<TextSelect id='selTextInput' label='Text Select' value={selectTextValue} onChange={setSelectTextValue} placeholder="Select Text Placeholder" selectOptions={textSelectOptions} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(selectTextValue)}
						</div>
						<div className='control-cell'>
							<NumberSelect id='selNumInput' label='Number Select' value={selectNumberValue} onChange={setSelectNumberValue} placeholder="Select Number Placeholder" selectOptions={numberSelectOptions} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(selectNumberValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<TextRadio id='rdInput' label='Text Radio' value={RadioValue} onChange={setRadioValue} {...sharedProperties} selectOptions={textSelectOptions}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(RadioValue)}
						</div>
						<div className='control-cell'>
							<NumberRadio id='selNumRadioInput' label='Number Radio' value={NumberRadioValue} onChange={setNumberRadioValue} selectOptions={numberSelectOptions} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(NumberRadioValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<TextArea id='txtAreaInput' label='Text Area' value={textAreaValue} onChange={setTextAreaValue} placeholder="Text Area Placeholder" {...sharedProperties} controlProps={{rows: 5, title: 'text area title check'}} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(textAreaValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<FileInput id='fileInput' label='File Input' value={fileValue} onChange={setFileValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(fileValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<MaskedInput id='txtMaskedInput' label='Masked Input (X12)' value={textMaskedValue} onChange={setMaskedValue} mask='a00' {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(textMaskedValue)}
						</div>
						<div className='control-cell'>
							<CheckBox id='chkInput' label='Checkbox Input' value={checkboxValue} onChange={setCheckboxValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(checkboxValue)}
						</div>
					</div>

					<div className='control-row'>
						<div className='control-cell'>
							<DateInput id='datInput' label='Date' value={dateInputValue} onChange={setDateInputValue} {...sharedProperties}  />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(dateInputValue)}<br/>
							ISO GMT DATE: {dateToIsoGmtShortDateString(dateInputValue)}
						</div>
						<div className='control-cell'>
							<LocalizedDateInput locale={dateLocales[locale]} id='locDatInput' label='Localized Date' value={localizedDateInputValue} onChange={setLocalizedDateInputValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(localizedDateInputValue)}<br/>
							ISO GMT DATE: {dateToIsoGmtShortDateString(localizedDateInputValue)}
						</div>
					</div>
					<div className='control-row'>
						<div className='control-cell'>
							<PostalCode id='txtPostalCode' label='Postal Code' value={postalCodeValue} onChange={setPostalCodeValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(postalCodeValue)}
						</div>
						<div className='control-cell'>
							<EmailAddress id='txtEmail' label='Email' value={emailValue} onChange={setEmailValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(emailValue)}
						</div>
					</div>
					<div className='control-row'>
						<div className='control-cell'>
							<PhoneNumber id='txtPhoneNumber' label='Phone Number' value={phoneValue} onChange={setPhoneValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(phoneValue)}
						</div>
						<div className='control-cell'>
							<Currency id='txtCurrency' label='Currency' value={dollarValue} onChange={setDollarValue} {...sharedProperties} />
						</div>
						<div className='control-cell'>
							{nullableValueMessage(dollarValue)}
						</div>
					</div>
				</div>

				{buttonDefs.map((bd, ix) => <button key={ix} onClick={bd.onClick}>{bd.text}</button>)}
		</div>
	)
}

function nullableValueMessage(val: any) {
	let output = `Value: '${val}' is of type: '${typeof val}.' `

	if (val === null) output += ' Value is null'

	return output
}

export default Controls
