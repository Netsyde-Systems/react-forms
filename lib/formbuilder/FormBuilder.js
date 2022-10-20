import TextInput from "../inputs/TextInput";
import NumberInput from "../inputs/NumberInput";
import TextArea from "../inputs/TextArea";
import DateInput from "../inputs/DateInput";
import CheckBox from "../inputs/CheckBox";
import TextSelect from "../inputs/TextSelect";
import NumberSelect from "../inputs/NumberSelect";
import TextRadio from "../inputs/TextRadio";
import NumberRadio from "../inputs/NumberRadio";
import PostalCode from "../inputs/PostalCode";
import PhoneNumber from "../inputs/PhoneNumber";
import EmailAddress from "../inputs/EmailAddress";
import { createOptionInput, createStandardInput } from "./FormBuilderInputs";
// The FormBuilder class links form data to actual form fields that we can render in react.
var FormBuilder = /** @class */ (function () {
    function FormBuilder(formDefinition, formData, formState, onFormDataUpdate, onFormStateUpdate) {
        var _this = this;
        this.formDefinition = formDefinition;
        this.formData = formData;
        this.formState = formState;
        this.onFormDataUpdate = onFormDataUpdate;
        this.onFormStateUpdate = onFormStateUpdate;
        this.setData = function (formData, formState) {
            var _a, _b;
            _this.formData = formData;
            _this.formState = formState !== null && formState !== void 0 ? formState : _this.formState;
            (_a = _this.onFormDataUpdate) === null || _a === void 0 ? void 0 : _a.call(_this, _this.formData);
            (_b = _this.onFormStateUpdate) === null || _b === void 0 ? void 0 : _b.call(_this, _this.formState);
        };
        this.setField = function (fieldName, fieldValue) {
            var newFormData = Object.assign({}, _this.formData);
            var newFormState = Object.assign({}, _this.formState);
            newFormData[fieldName] = fieldValue;
            newFormState.fieldsTouched[fieldName] = true;
            _this.setData(newFormData, newFormState);
        };
        this.textInput = function (fieldName) { return _this.linkStandardControl(fieldName, TextInput); };
        // TODO: Find out how to get around input losing focus issue
        this.TextInputElementTest = function (props) { return _this.linkStandardControl(props.field, TextInput); };
        this.textArea = function (fieldName) { return _this.linkStandardControl(fieldName, TextArea); };
        this.numberInput = function (fieldName) { return _this.linkStandardControl(fieldName, NumberInput); };
        this.dateInput = function (fieldName) { return _this.linkStandardControl(fieldName, DateInput); };
        this.postalCode = function (fieldName) { return _this.linkStandardControl(fieldName, PostalCode); };
        this.phoneNumber = function (fieldName) { return _this.linkStandardControl(fieldName, PhoneNumber); };
        this.emailAddress = function (fieldName) { return _this.linkStandardControl(fieldName, EmailAddress); };
        this.textSelect = function (fieldName) { return _this.linkOptionControl(fieldName, TextSelect); };
        this.numberSelect = function (fieldName) { return _this.linkOptionControl(fieldName, NumberSelect); };
        this.textRadio = function (fieldName) { return _this.linkOptionControl(fieldName, TextRadio); };
        this.numberRadio = function (fieldName) { return _this.linkOptionControl(fieldName, NumberRadio); };
        this.checkbox = function (fieldName) { return _this.linkStandardControl(fieldName, CheckBox); };
        this._isValid = undefined;
    }
    FormBuilder.prototype.updateValidity = function (isValid) {
        // form is set to field validity if this is the first control rendered
        if (this._isValid === undefined)
            this._isValid = isValid;
        // otherwise we or it with the validity of all other fields rendered to see if form as a whole is valid
        else
            this._isValid = this._isValid && isValid;
    };
    // We've factored out what needs to be done for every control type here
    FormBuilder.prototype.linkStandardControl = function (fieldName, InputControl) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            _this.setField(fieldName, formData[fieldName]);
        };
        var _a = createStandardInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange, InputControl), inputControl = _a[0], isValid = _a[1];
        this.updateValidity(isValid);
        return inputControl;
    };
    FormBuilder.prototype.linkOptionControl = function (fieldName, OptionControl) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            _this.setField(fieldName, formData[fieldName]);
        };
        var _a = createOptionInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange, OptionControl), inputControl = _a[0], isValid = _a[1];
        this.updateValidity(isValid);
        return inputControl;
    };
    FormBuilder.prototype.validate = function () {
        var _a;
        if (!this.formState.hasBeenValidated) {
            var newFormState = Object.assign({}, this.formState);
            newFormState.hasBeenValidated = true;
            this.formState = newFormState;
            (_a = this.onFormStateUpdate) === null || _a === void 0 ? void 0 : _a.call(this, newFormState);
        }
    };
    Object.defineProperty(FormBuilder.prototype, "isValid", {
        get: function () { return this._isValid; },
        enumerable: false,
        configurable: true
    });
    return FormBuilder;
}());
export { FormBuilder };
export default FormBuilder;