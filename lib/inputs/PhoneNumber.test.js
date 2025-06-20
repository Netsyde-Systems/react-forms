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
import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import PhoneNumber from './PhoneNumber';
it('displays supplied value', function () {
    var phoneNumber = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', onChange: function () { return null; }, value: undefined }));
    var input = phoneNumber.getByDisplayValue('');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var phoneNumber = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', onChange: function () { return null; }, value: undefined }));
    var input = phoneNumber.getByDisplayValue('');
    expect(input).toHaveAttribute('id', 'txtPhoneNumber');
});
// TODO: investigate phone input not working as expected
xit('calls onchange function', function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, handlechange, phonenumber, input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = userEvent.setup();
                handlechange = jest.fn();
                phonenumber = render(_jsx(PhoneNumber, { id: 'txtphonenumber', value: undefined, onChange: handlechange }));
                input = phonenumber.getByDisplayValue('');
                /*
                fireEvent.change(input, { target: { value: '123' } })
                expect(handlechange).toHaveBeenCalledWith(123)
                */
                return [4 /*yield*/, user.type(input, '123')];
            case 1:
                /*
                fireEvent.change(input, { target: { value: '123' } })
                expect(handlechange).toHaveBeenCalledWith(123)
                */
                _a.sent();
                expect(handlechange).toHaveBeenCalledTimes(3);
                expect(handlechange).toHaveBeenLastCalledWith(123);
                return [2 /*return*/];
        }
    });
}); });
// TODO: investigate phone input not working as expected
xit('prevents onChange calls out of phone domain', function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, handlechange, phonenumber, input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = userEvent.setup();
                handlechange = jest.fn();
                phonenumber = render(_jsx(PhoneNumber, { id: 'txtphonenumber', value: undefined, onChange: handlechange }));
                input = phonenumber.getByDisplayValue('');
                /*
                fireEvent.change(input, { target: { value: '123' } })
                expect(handlechange).toHaveBeenCalledWith(123)
                */
                return [4 /*yield*/, user.type(input, '1234567890123456')];
            case 1:
                /*
                fireEvent.change(input, { target: { value: '123' } })
                expect(handlechange).toHaveBeenCalledWith(123)
                */
                _a.sent();
                expect(handlechange).toHaveBeenCalledTimes(15);
                expect(handlechange).toHaveBeenLastCalledWith(123456789012345);
                return [2 /*return*/];
        }
    });
}); });
it('has no label when not provided', function () {
    var phoneNumber = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', onChange: function () { return null; }, value: undefined }));
    var label = phoneNumber.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var phoneNumber = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', onChange: function () { return null; }, label: 'Expected Phone Number', value: undefined }));
    var label = phoneNumber.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Phone Number');
});
it('label has asterisk when required', function () {
    var control = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', label: 'A Label', onChange: function () { return null; }, value: undefined }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', label: 'A Label', onChange: function () { return null; }, required: true, value: undefined }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var control = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', onChange: function () { return null; }, value: undefined }));
    var input = control.getByDisplayValue('');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', onChange: function () { return null; }, hidden: true, value: undefined }));
    input = control.getByDisplayValue('');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var control = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', onChange: function () { return null; }, value: undefined }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(PhoneNumber, { id: 'txtPhoneNumber', onChange: function () { return null; }, errorMessage: 'Error!!', value: undefined }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
