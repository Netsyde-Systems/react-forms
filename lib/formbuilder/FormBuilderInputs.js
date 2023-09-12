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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx } from "react/jsx-runtime";
import { convertToSelectOption, isLocaleLookup } from './FormBuilderTypes';
import { isLocalizedString, getString } from "./FormBuilderTypes";
import { NumberSelect } from '../inputs/NumberSelect';
import { TextSelect } from '../inputs/TextSelect';
import { MaskedInput } from '../inputs/MaskedInput';
import { FileInput } from '../inputs/FileInput';
import { getDefaultMaxLengthValidator, getDefaultMaxValidator, getDefaultMinLengthValidator, getDefaultMinValidator, defaultRequiredFieldValidator } from '../validation/validation';
import { getUnique } from '../utilities';
export function createStandardInput(formDefinition, formData, formState, fieldName, onChange, InputControl, customInputProps, subFormName, subFormIndex, rootFormData, controlProps, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    props = Object.assign({}, props, customInputProps);
    props.controlProps = Object.assign({}, controlProps);
    return InputControl(props);
}
export function createMaskedInput(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, mask, controlProps, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    props.controlProps = controlProps;
    var maskedProps = __assign(__assign({}, props), { mask: mask });
    return MaskedInput(maskedProps);
}
export function createFileInput(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, fileInputConfig, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    var fileProps = __assign(__assign({}, props), fileInputConfig);
    return FileInput(fileProps);
}
export function createOptionInput(formDefinition, formData, formState, fieldName, onChange, OptionControl, subFormName, subFormIndex, rootFormData, controlProps, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    props.controlProps = controlProps;
    var selectOptions = getSelectOptions(formDefinition, formData, formState, fieldName, formState.language, externalData);
    return _jsx(OptionControl, __assign({}, props, { selectOptions: selectOptions }));
}
export function createTextSelect(formDefinition, formData, formState, fieldName, onChange, language, subFormName, subFormIndex, rootFormData, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    var selectOptions = getSelectOptions(formDefinition, formData, formState, fieldName, language, externalData);
    return _jsx(TextSelect, __assign({}, props, { selectOptions: selectOptions }));
}
export function createNumberSelect(formDefinition, formData, formState, fieldName, onChange, language, subFormName, subFormIndex, rootFormData, externalData) {
    var props = getInputProps(formDefinition, formData, formState, fieldName, onChange, subFormName, subFormIndex, rootFormData, externalData);
    var selectOptions = getSelectOptions(formDefinition, formData, formState, fieldName, language, externalData);
    return _jsx(NumberSelect, __assign({}, props, { selectOptions: selectOptions }));
}
export function getLabel(formDefinition, formData, formState, fieldName, language) {
    var _a;
    var fieldDefinitions = formDefinition.fields;
    var fieldDef = fieldDefinitions[fieldName];
    var fieldValue = formData[fieldName];
    // label is titleized fieldName if not provided
    var label = fieldName.toString();
    if (fieldDef) {
        if (typeof fieldDef.label == 'string')
            label = fieldDef.label;
        else if (typeof language === 'string' && isLocalizedString(fieldDef.label))
            label = fieldDef.label[language];
        else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.label) == 'function') {
            var langSpec = fieldDef.label({ fieldValue: fieldValue, fieldName: fieldName, formData: formData, formState: formState, formDefinition: formDefinition });
            label = (_a = getString(langSpec, language)) !== null && _a !== void 0 ? _a : label;
        }
    }
    return label;
}
export function getInputProps(formDefinition, formData, formState, fieldName, onFormChange, subFormName, subFormIndex, rootFormData, externalData) {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    var fieldDefinitions = formDefinition.fields;
    var fieldDef = fieldDefinitions[fieldName];
    var fieldValue = formData[fieldName];
    var language = formState.language;
    var label = getLabel(formDefinition, formData, formState, fieldName, language);
    function getFieldSpecArgs() {
        return { fieldValue: fieldValue, fieldName: fieldName, formData: formData, formState: formState, formDefinition: formDefinition, language: language, subFormIndex: subFormIndex, rootFormData: rootFormData, externalData: externalData };
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
    if (formState.isReadOnly)
        readOnly = true;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isReadOnly) == 'boolean')
        readOnly = fieldDef.isReadOnly;
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isReadOnly) == 'function')
        readOnly = (_b = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isReadOnly) === null || _b === void 0 ? void 0 : _b.call(fieldDef, getFieldSpecArgs());
    var placeholder;
    if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.placeholder) == 'string')
        placeholder = fieldDef.placeholder;
    else if (typeof language === 'string' && isLocalizedString(fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.placeholder))
        placeholder = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.placeholder[language];
    else if (typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.placeholder) == 'function') {
        var langSpec = fieldDef.placeholder(getFieldSpecArgs());
        placeholder = (_c = getString(langSpec, language)) !== null && _c !== void 0 ? _c : placeholder;
    }
    var locale = undefined;
    if (language && isLocaleLookup(fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.locales)) {
        // type hack; only seems to be necessary for babel runtime.  
        // TODO: Investigate
        locale = (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.locales)[language];
    }
    // let's check for validation messsages
    var externalErrorMap = (_d = formState.externalErrorConditions) === null || _d === void 0 ? void 0 : _d[fieldName];
    var externalError = externalErrorMap === null || externalErrorMap === void 0 ? void 0 : externalErrorMap.get(fieldValue);
    var errors = externalError ? [externalError] : [];
    if (required) {
        var requiredFieldValidator = (_h = (_f = (_e = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.defaultValidators) === null || _e === void 0 ? void 0 : _e.requiredFieldValidator) !== null && _f !== void 0 ? _f : (_g = formDefinition.defaultValidators) === null || _g === void 0 ? void 0 : _g.requiredFieldValidator) !== null && _h !== void 0 ? _h : defaultRequiredFieldValidator;
        // if (requiredMessages.length > 0) errors.push(...requiredMessages)
        errors.push.apply(errors, requiredFieldValidator(getFieldSpecArgs()));
    }
    if (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validators) {
        // validators can be a single function
        if (typeof fieldDef.validators === 'function') {
            errors.push.apply(errors, (_j = fieldDef.validators) === null || _j === void 0 ? void 0 : _j.call(fieldDef, getFieldSpecArgs()));
        }
        // or an array of functions
        else if (Array.isArray(fieldDef.validators)) {
            errors.push.apply(errors, fieldDef.validators.flatMap(function (err) { return err(getFieldSpecArgs()); }));
        }
        // or a simple object specifier (for min/max and possible other things)
        else {
            switch (typeof fieldValue) {
                case 'string':
                    var getMaxLengthValidator = (_o = (_l = (_k = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.defaultValidators) === null || _k === void 0 ? void 0 : _k.getMaxLengthValidator) !== null && _l !== void 0 ? _l : (_m = formDefinition.defaultValidators) === null || _m === void 0 ? void 0 : _m.getMaxLengthValidator) !== null && _o !== void 0 ? _o : getDefaultMaxLengthValidator;
                    var getMinLengthValidator = (_s = (_q = (_p = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.defaultValidators) === null || _p === void 0 ? void 0 : _p.getMinLengthValidator) !== null && _q !== void 0 ? _q : (_r = formDefinition.defaultValidators) === null || _r === void 0 ? void 0 : _r.getMinLengthValidator) !== null && _s !== void 0 ? _s : getDefaultMinLengthValidator;
                    if (fieldDef.validators.max)
                        errors.push.apply(errors, getMaxLengthValidator(fieldDef.validators.max, label || ' ')(getFieldSpecArgs()));
                    if (fieldDef.validators.min)
                        errors.push.apply(errors, getMinLengthValidator(fieldDef.validators.min, label || ' ')(getFieldSpecArgs()));
                    break;
                case 'number':
                    var getMaxValidator = (_w = (_u = (_t = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.defaultValidators) === null || _t === void 0 ? void 0 : _t.getMaxValidator) !== null && _u !== void 0 ? _u : (_v = formDefinition.defaultValidators) === null || _v === void 0 ? void 0 : _v.getMaxValidator) !== null && _w !== void 0 ? _w : getDefaultMaxValidator;
                    var getMinValidator = (_0 = (_y = (_x = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.defaultValidators) === null || _x === void 0 ? void 0 : _x.getMinValidator) !== null && _y !== void 0 ? _y : (_z = formDefinition.defaultValidators) === null || _z === void 0 ? void 0 : _z.getMinValidator) !== null && _0 !== void 0 ? _0 : getDefaultMinValidator;
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
    var errorCondition = undefined;
    if (errors.length > 0) {
        var localizedErrors = errors.map(function (err) { return getString(err, language); }).filter(function (err) { return !!err; });
        errorCondition = getUnique(localizedErrors).join(" | ");
    }
    var hidden = (_1 = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.isHidden) === null || _1 === void 0 ? void 0 : _1.call(fieldDef, getFieldSpecArgs());
    // error message is only shown if 
    // 1. We want it to be shown immediately and the field has been touched (we give user immediate input as they're typing)
    // 2. Form has been validated (give user feedback only after submit attempt)
    var errorMessage = errorCondition;
    var hasError = !!errorCondition;
    if (((fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.validateImmediately) && ((_2 = formState.fieldsTouched) === null || _2 === void 0 ? void 0 : _2[fieldName])) || formState.hasBeenValidated || externalError) {
        /* errorMessage already initiated at this point */
    }
    else {
        errorMessage = undefined;
        hasError = false;
    }
    var onChange = function (newFieldValue, rawValue) { return __awaiter(_this, void 0, void 0, function () {
        var coercedFieldValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    coercedFieldValue = newFieldValue;
                    if (!(typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.disallowChange) === 'object' && (coercedFieldValue === null || coercedFieldValue === void 0 ? void 0 : coercedFieldValue.toString().length) > fieldDef.disallowChange.maxLength)) return [3 /*break*/, 1];
                    return [2 /*return*/]; // don't perform change because we've exceeded max length
                case 1:
                    if (!(typeof (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.disallowChange) === 'function' && fieldDef.disallowChange({ fieldValue: coercedFieldValue, rawValue: rawValue, fieldName: fieldName, formData: formData, formState: formState, formDefinition: formDefinition, language: language, subFormIndex: subFormIndex, rootFormData: rootFormData, externalData: externalData }))) return [3 /*break*/, 2];
                    return [2 /*return*/]; // don't perform change because custom disallow function has told us to
                case 2:
                    formData[fieldName] = coercedFieldValue;
                    if (!(fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.onChange)) return [3 /*break*/, 4];
                    return [4 /*yield*/, fieldDef.onChange({ fieldValue: formData[fieldName], rawValue: rawValue, fieldName: fieldName, formData: formData, formState: formState, formDefinition: formDefinition, language: language, subFormIndex: subFormIndex, rootFormData: rootFormData, externalData: externalData })];
                case 3:
                    formData = _a.sent();
                    _a.label = 4;
                case 4:
                    onFormChange(formData);
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var props = {
        id: id,
        value: formData[fieldName],
        label: (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.collapseLabels) ? false : label,
        placeholder: placeholder,
        errorMessage: (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.collapseLabels) ? false : errorMessage,
        hasError: hasError,
        onChange: onChange,
        hidden: hidden,
        disabled: disabled,
        readOnly: readOnly,
        required: required,
        locale: locale
    };
    (_3 = formState.fieldErrorConditions) !== null && _3 !== void 0 ? _3 : (formState.fieldErrorConditions = {});
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
function getSelectOptions(formDefinition, formData, formState, fieldName, language, externalData) {
    var _a;
    var fieldDef = (_a = formDefinition.fields) === null || _a === void 0 ? void 0 : _a[fieldName];
    var fieldValue = formData[fieldName];
    var localizedOptions = [];
    if (fieldDef) {
        if (typeof fieldDef.selectOptions == 'object') {
            // Type HACK.  TODO: investigate
            localizedOptions = fieldDef.selectOptions;
        }
        else if (typeof fieldDef.selectOptions == 'function') {
            // Type HACK.  TODO: investigate
            localizedOptions = fieldDef.selectOptions({ fieldValue: fieldValue, fieldName: fieldName, formData: formData, formState: formState, formDefinition: formDefinition, externalData: externalData });
        }
    }
    return localizedOptions.map(function (lo) { return convertToSelectOption(lo, language); });
}
