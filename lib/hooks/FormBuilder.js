import { createCheckboxInput, createDateInput, createNumberInput, createSelectNumberInput, createSelectTextInput, createTextInput } from "./FormBuilderInputs";
// The FormBuilder class links form data to actual form fields that we can render in react.
var FormBuilder = /** @class */ (function () {
    function FormBuilder(formDefinition, formData, formState, setFormData, setFormState) {
        this.formDefinition = formDefinition;
        this.formData = formData;
        this.formState = formState;
        this.setFormData = setFormData;
        this.setFormState = setFormState;
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
    FormBuilder.prototype.textInput = function (fieldName) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            newFormState.fieldsTouched[fieldName] = true;
            _this.setFormData(formData);
            _this.setFormState(newFormState);
        };
        var _a = createTextInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange), inputControl = _a[0], isValid = _a[1];
        this.updateValidity(isValid);
        return inputControl;
    };
    FormBuilder.prototype.numberInput = function (fieldName) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            newFormState.fieldsTouched[fieldName] = true;
            _this.setFormData(formData);
            _this.setFormState(newFormState);
        };
        var _a = createNumberInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange), inputControl = _a[0], isValid = _a[1];
        this.updateValidity(isValid);
        return inputControl;
    };
    FormBuilder.prototype.dateInput = function (fieldName) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            newFormState.fieldsTouched[fieldName] = true;
            _this.setFormData(formData);
            _this.setFormState(newFormState);
        };
        var _a = createDateInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange), inputControl = _a[0], isValid = _a[1];
        this.updateValidity(isValid);
        return inputControl;
    };
    FormBuilder.prototype.selectTextInput = function (fieldName) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            newFormState.fieldsTouched[fieldName] = true;
            _this.setFormData(formData);
            _this.setFormState(newFormState);
        };
        var _a = createSelectTextInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange), inputControl = _a[0], isValid = _a[1];
        this.updateValidity(isValid);
        return inputControl;
    };
    FormBuilder.prototype.selectNumberInput = function (fieldName) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            newFormState.fieldsTouched[fieldName] = true;
            _this.setFormData(formData);
            _this.setFormState(newFormState);
        };
        var _a = createSelectNumberInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange), inputControl = _a[0], isValid = _a[1];
        this.updateValidity(isValid);
        return inputControl;
    };
    FormBuilder.prototype.checkboxInput = function (fieldName) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            newFormState.fieldsTouched[fieldName] = true;
            _this.setFormData(formData);
            _this.setFormState(newFormState);
        };
        var _a = createCheckboxInput(this.formDefinition, newFormData, newFormState, fieldName, handleChange), inputControl = _a[0], isValid = _a[1];
        this.updateValidity(isValid);
        return inputControl;
    };
    FormBuilder.prototype.validate = function () {
        if (!this.formState.hasBeenValidated) {
            var newFormState = Object.assign({}, this.formState);
            newFormState.hasBeenValidated = true;
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
