var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { convertToSelectOption, isLocaleLookup } from './FormBuilderTypes';
import { isLocalizedString, getString } from "./FormBuilderTypes";
import { NumberSelect } from '../inputs/NumberSelect';
import { TextSelect } from '../inputs/TextSelect';
import { MaskedInput } from '../inputs/MaskedInput';
import { getMaxLengthValidator, getMaxValidator, getMinLengthValidator, getMinValidator, requiredFieldValidator } from '../validation/validation';
import { getUnique } from '../utilities';
export function createStandardInput(fieldDefinitions, formData, formState, fieldName, onChange, InputControl, customInputProps, subFormName, subFormIndex, rootFormData, controlProps, externalData) {
    var props = getInputProps(fieldDefinitions, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    props = Object.assign({}, props, customInputProps);
    props.controlProps = Object.assign({}, controlProps);
    return InputControl(props);
}
export function createMaskedInput(fieldDefinitions, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, mask, controlProps, externalData) {
    var props = getInputProps(fieldDefinitions, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    props.controlProps = controlProps;
    var maskedProps = __assign(__assign({}, props), { mask: mask });
    return MaskedInput(maskedProps);
}
export function createOptionInput(formDefinition, formData, formState, fieldName, onChange, OptionControl, subFormName, subFormIndex, rootFormData, controlProps, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    props.controlProps = controlProps;
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName, formState.language);
    return _jsx(OptionControl, __assign({}, props, { selectOptions: selectOptions }));
}
export function createTextSelect(formDefinition, formData, formState, fieldName, onChange, language, subFormName, subFormIndex, rootFormData, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName, language);
    return _jsx(TextSelect, __assign({}, props, { selectOptions: selectOptions }));
}
export function createNumberSelect(formDefinition, formData, formState, fieldName, onChange, language, subFormName, subFormIndex, rootFormData, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    var selectOptions = getSelectOptions(formDefinition, formData, fieldName, language);
    return _jsx(NumberSelect, __assign({}, props, { selectOptions: selectOptions }));
}
export function getLabel(formDefinition, formData, fieldName, language) {
    var _a;
    var fieldDef = formDefinition[fieldName];
    var fieldValue = formData[fieldName];
    // label is titleized fieldName if not provided
    var label = fieldName.toString();
    if (fieldDef) {
        if (typeof fieldDef.label == 'string')
            label = fieldDef.label;
        else if (typeof language === 'string' && isLocalizedString(fieldDef.label))
            label = fieldDef.label[language];
        else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.label) == 'function') {
            var langSpec = fieldDef.label({ fieldValue: fieldValue, fieldName: fieldName, formData: formData, formDefinition: formDefinition });
            label = (_a = getString(langSpec, language)) !== null && _a !== void 0 ? _a : label;
        }
    }
    return label;
}
export function getInputProps(fieldDefinitions, formData, formState, fieldName, onFormChange, subFormName, subFormIndex, rootFormData, externalData) {
    var _a, _b, _c, _d, _e, _f, _g;
    var fieldDef = fieldDefinitions[fieldName];
    var fieldValue = formData[fieldName];
    var language = formState.language;
    var label = getLabel(fieldDefinitions, formData, fieldName, language);
    // TODO!!! Figure out why it's permitting us to pass FieldDefinitions in place of a FormDefiniton
    var formDefinition = fieldDefinitions;
    function getFieldSpecArgs() {
        return { fieldValue: fieldValue, fieldName: fieldName, formData: formData, formDefinition: formDefinition, language: language, subFormIndex: subFormIndex, rootFormData: rootFormData, externalData: externalData };
    }
    // id defaults to fieldname if not provided
    var id = fieldName.toString();
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.id) == 'string')
        id = fieldDef.id;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.id) == 'function')
        id = fieldDef.id(getFieldSpecArgs());
    // fields aren't required unless they're specified as such with a boolean or a function
    var required = false;
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isRequired) == 'boolean')
        required = fieldDef.isRequired;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isRequired) == 'function')
        required = fieldDef.isRequired(getFieldSpecArgs());
    // fields aren't disabled unless they're specified as such with a boolean or a function
    var disabled = false;
    if (formState.isDisabled)
        disabled = true;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isDisabled) == 'boolean')
        disabled = fieldDef.isDisabled;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isDisabled) == 'function')
        disabled = (_a = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isDisabled) === null || _a === void 0 ? void 0 : _a.call(fieldDef, getFieldSpecArgs());
    // fields aren't readOnly unless they're specified as such with a boolean or a function
    var readOnly = false;
    if (formState.isReadonly)
        readOnly = true;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isReadOnly) == 'boolean')
        readOnly = fieldDef.isReadOnly;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isReadOnly) == 'function')
        readOnly = (_b = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isReadOnly) === null || _b === void 0 ? void 0 : _b.call(fieldDef, getFieldSpecArgs());
    var locale = undefined;
    if (language && isLocaleLookup(fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.locales)) {
        // type hack; only seems to be necessary for babel runtime.  
        // TODO: Investigate
        locale = (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.locales)[language];
    }
    // let's check for validation messsages
    var externalErrorMap = (_c = formState.externalErrorConditions) === null || _c === void 0 ? void 0 : _c[fieldName];
    var externalLocalizedError = externalErrorMap === null || externalErrorMap === void 0 ? void 0 : externalErrorMap.get(fieldValue);
    var externalError = externalLocalizedError && getString(externalLocalizedError, language);
    var errors = externalError ? [externalError] : [];
    var errorCondition = undefined;
    if (required) {
        errors.push.apply(errors, requiredFieldValidator(getFieldSpecArgs()));
    }
    if (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validators) {
        // validators can be a single function
        if (typeof fieldDef.validators === 'function') {
            errors.push.apply(errors, (_d = fieldDef.validators) === null || _d === void 0 ? void 0 : _d.call(fieldDef, getFieldSpecArgs()));
        }
        // or an array of functions
        else if (Array.isArray(fieldDef.validators)) {
            errors.push.apply(errors, fieldDef.validators.flatMap(function (err) { return err(getFieldSpecArgs()); }));
        }
        // or a simple object specifier (for min/max and possible other things)
        else {
            switch (typeof fieldValue) {
                case 'string':
                    if (fieldDef.validators.max)
                        errors.push.apply(errors, getMaxLengthValidator(fieldDef.validators.max, label || ' ')(getFieldSpecArgs()));
                    if (fieldDef.validators.min)
                        errors.push.apply(errors, getMinLengthValidator(fieldDef.validators.min, label || ' ')(getFieldSpecArgs()));
                    break;
                case 'number':
                    if (fieldDef.validators.max)
                        errors.push.apply(errors, getMaxValidator(fieldDef.validators.max, label || ' ')(getFieldSpecArgs()));
                    if (fieldDef.validators.min)
                        errors.push.apply(errors, getMinValidator(fieldDef.validators.min, label || ' ')(getFieldSpecArgs()));
                    break;
                case undefined:
                // put in this dummy case to resolve the typing issue with isHidden, below
                // not sure why this works
            }
        }
    }
    if (errors.length > 0)
        errorCondition = getUnique(errors).join(" | ");
    var hidden = (_e = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isHidden) === null || _e === void 0 ? void 0 : _e.call(fieldDef, getFieldSpecArgs());
    // error message is only shown if 
    // 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
    // 2. Form has been validated (give user feedback only after submit attempt)
    var errorMessage = errorCondition;
    var hasError = !!errorCondition;
    if (((fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validateImmediately) && ((_f = formState.fieldsTouched) === null || _f === void 0 ? void 0 : _f[fieldName])) || formState.hasBeenValidated) { /* errorMessage already initiated */ }
    else {
        errorMessage = undefined;
        hasError = false;
    }
    var onChange = function (newFieldValue, rawValue) {
        // some type hacks here... TODO: look into how to do this properly
        var coercedFieldValue = newFieldValue;
        // first we check if we should even perform the change
        if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.disallowChange) === 'object' && (coercedFieldValue === null || coercedFieldValue === void 0 ? void 0 : coercedFieldValue.toString().length) > fieldDef.disallowChange.maxLength) {
            return; // don't perform change because we've exceeded max length
        }
        else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.disallowChange) === 'function' && fieldDef.disallowChange({ fieldValue: coercedFieldValue, rawValue: rawValue, fieldName: fieldName, formData: formData, formDefinition: formDefinition, language: language, subFormIndex: subFormIndex, rootFormData: rootFormData, externalData: externalData })) {
            return; // don't perform change because custom disallow function has told us to
        }
        else {
            formData[fieldName] = coercedFieldValue;
            if (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.onChange) {
                formData = fieldDef.onChange({ fieldValue: formData[fieldName], rawValue: rawValue, fieldName: fieldName, formData: formData, formDefinition: formDefinition, language: language, subFormIndex: subFormIndex, rootFormData: rootFormData, externalData: externalData });
            }
            onFormChange(formData);
        }
    };
    var props = {
        id: id,
        value: formData[fieldName],
        label: (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.collapseLabels) ? false : label,
        errorMessage: (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.collapseLabels) ? false : errorMessage,
        hasError: hasError,
        onChange: onChange,
        hidden: hidden,
        disabled: disabled,
        readOnly: readOnly,
        required: required,
        locale: locale
    };
    (_g = formState.fieldErrorConditions) !== null && _g !== void 0 ? _g : (formState.fieldErrorConditions = {});
    formState.fieldErrorConditions[fieldName] = errorCondition;
    /*
    formState.fieldErrorConditions ??= {}
    if (subFormName === undefined) {
        formState.fieldErrorConditions[fieldName] = errorCondition
    }
    else {
        (formState.fieldErrorConditions as any)[subFormName] = errorCondition
    }
    */
    return props;
}
function getSelectOptions(formDefinition, formData, fieldName, language) {
    var fieldDef = formDefinition[fieldName];
    var fieldValue = formData[fieldName];
    var localizedOptions = [];
    if (fieldDef) {
        if (typeof fieldDef.selectOptions == 'object') {
            // Type HACK.  TODO: investigate
            localizedOptions = fieldDef.selectOptions;
        }
        else if (typeof fieldDef.selectOptions == 'function') {
            // Type HACK.  TODO: investigate
            localizedOptions = fieldDef.selectOptions({ fieldValue: fieldValue, fieldName: fieldName, formData: formData, formDefinition: formDefinition });
        }
    }
    return localizedOptions.map(function (lo) { return convertToSelectOption(lo, language); });
}
