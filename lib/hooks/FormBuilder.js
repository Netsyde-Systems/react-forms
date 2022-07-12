import { createCheckbox, createDateInput, createNumberInput, createNumberSelect, createTextSelect, createTextInput } from "./FormBuilderInputs";
// The FormBuilder class links form data to actual form fields that we can render in react.
var FormBuilder = /** @class */ (function () {
    function FormBuilder(formDefinition, formData, formState, setFormData, setFormState) {
        var _this = this;
        this.formDefinition = formDefinition;
        this.formData = formData;
        this.formState = formState;
        this.setFormData = setFormData;
        this.setFormState = setFormState;
        this.textInput = function (fieldName) { return _this.linkControl(fieldName, createTextInput); };
        // TODO: Find out how to get around input losing focus issue
        this.TextInput = function (props) { return _this.linkControl(props.field, createTextInput); };
        this.numberInput = function (fieldName) { return _this.linkControl(fieldName, createNumberInput); };
        this.dateInput = function (fieldName) { return _this.linkControl(fieldName, createDateInput); };
        this.textSelect = function (fieldName) { return _this.linkControl(fieldName, createTextSelect); };
        this.numberSelect = function (fieldName) { return _this.linkControl(fieldName, createNumberSelect); };
        this.checkbox = function (fieldName) { return _this.linkControl(fieldName, createCheckbox); };
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
    FormBuilder.prototype.linkControl = function (fieldName, inputCreationFnc) {
        var _this = this;
        var newFormState = Object.assign({}, this.formState);
        var newFormData = Object.assign({}, this.formData);
        var handleChange = function (formData) {
            newFormState.fieldsTouched[fieldName] = true;
            _this.setFormData(formData);
            _this.setFormState(newFormState);
        };
        var _a = inputCreationFnc(this.formDefinition, newFormData, newFormState, fieldName, handleChange), inputControl = _a[0], isValid = _a[1];
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
