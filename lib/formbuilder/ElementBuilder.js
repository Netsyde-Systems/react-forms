var ElementBuilder = /** @class */ (function () {
    function ElementBuilder(formBuilder) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.TextInput = function (props) { return _this.formBuilder.textInput(props.field, props); };
        this.TextArea = function (props) { return _this.formBuilder.textArea(props.field, props); };
        this.NumberInput = function (props) { return _this.formBuilder.numberInput(props.field, props); };
        this.IntegerInput = function (props) { return _this.formBuilder.integerInput(props.field, props); };
        this.DateInput = function (props) { return _this.formBuilder.dateInput(props.field, props); };
        // Note: Localized Date Input does not support standard controlProps like the other inputs do (at this time)
        this.LocalizedDateInput = function (props) { return _this.formBuilder.localizedDateInput(props.field); };
        this.PostalCode = function (props) { return _this.formBuilder.postalCode(props.field, props); };
        this.PhoneNumber = function (props) { return _this.formBuilder.phoneNumber(props.field, props); };
        this.EmailAddress = function (props) { return _this.formBuilder.emailAddress(props.field, props); };
        this.Currency = function (props) { return _this.formBuilder.currency(props.field, props); };
        this.TextSelect = function (props) { return _this.formBuilder.textSelect(props.field, props); };
        this.NumberSelect = function (props) { return _this.formBuilder.numberSelect(props.field, props); };
        this.TextRadio = function (props) { return _this.formBuilder.textRadio(props.field, props); };
        this.NumberRadio = function (props) { return _this.formBuilder.numberRadio(props.field, props); };
        this.CheckBox = function (props) { return _this.formBuilder.checkbox(props.field, props); };
        // Note: File Input does not support standard controlProps like the other inputs do (at this time)
        this.Files = function (props) { return _this.formBuilder.files(props.field); };
    }
    return ElementBuilder;
}());
export { ElementBuilder };
