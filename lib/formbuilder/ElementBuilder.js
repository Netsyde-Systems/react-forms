var ElementBuilder = /** @class */ (function () {
    function ElementBuilder(formBuilder) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.TextInput = function (props) { return _this.formBuilder.textInput(props.field); };
        this.TextArea = function (props) { return _this.formBuilder.textArea(props.field); };
        this.NumberInput = function (props) { return _this.formBuilder.numberInput(props.field); };
        this.DateInput = function (props) { return _this.formBuilder.dateInput(props.field); };
        this.LocalizedDateInput = function (props) { return _this.formBuilder.localizedDateInput(props.field); };
        this.PostalCode = function (props) { return _this.formBuilder.postalCode(props.field); };
        this.PhoneNumber = function (props) { return _this.formBuilder.phoneNumber(props.field); };
        this.EmailAddress = function (props) { return _this.formBuilder.emailAddress(props.field); };
        this.Currency = function (props) { return _this.formBuilder.currency(props.field); };
        this.TextSelect = function (props) { return _this.formBuilder.textSelect(props.field); };
        this.NumberSelect = function (props) { return _this.formBuilder.numberSelect(props.field); };
        this.TextRadio = function (props) { return _this.formBuilder.textRadio(props.field); };
        this.NumberRadio = function (props) { return _this.formBuilder.numberRadio(props.field); };
        this.CheckBox = function (props) { return _this.formBuilder.checkbox(props.field); };
        this.Files = function (props) { return _this.formBuilder.files(props.field); };
    }
    return ElementBuilder;
}());
export { ElementBuilder };
