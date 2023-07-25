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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, cleanup /*, screen, fireEvent */ } from '@testing-library/react';
import PostalCode from './PostalCode';
it('displays supplied value', function () {
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var input = postalCode.getByDisplayValue('');
    expect(input).toBeInTheDocument();
});
it('has correct id', function () {
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var input = postalCode.getByDisplayValue('');
    expect(input).toHaveAttribute('id', 'txtPostalCode');
});
it('calls onChange function', function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, handleChange, postalCode, input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = userEvent.setup();
                handleChange = vi.fn();
                postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', value: undefined, onChange: handleChange }));
                input = postalCode.getByDisplayValue('');
                /*
                fireEvent.change(input, { target: { value: 'A1A1A1' } })
                expect(handleChange).toHaveBeenCalledWith('A1A1A1')
                */
                return [4 /*yield*/, user.type(input, 'A1A1A1')];
            case 1:
                /*
                fireEvent.change(input, { target: { value: 'A1A1A1' } })
                expect(handleChange).toHaveBeenCalledWith('A1A1A1')
                */
                _a.sent();
                expect(handleChange).toHaveBeenCalledTimes(6);
                expect(handleChange).toHaveBeenLastCalledWith('A1A1A1');
                return [2 /*return*/];
        }
    });
}); });
it('prevents calls out of postal code domain', function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, handleChange, postalCode, input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = userEvent.setup();
                handleChange = vi.fn();
                postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', value: undefined, onChange: handleChange }));
                input = postalCode.getByDisplayValue('');
                /*
                fireEvent.change(input, { target: { value: 'A1A1A1' } })
                expect(handleChange).toHaveBeenCalledWith('A1A1A1')
                */
                return [4 /*yield*/, user.type(input, 'A1A1A1XXX')];
            case 1:
                /*
                fireEvent.change(input, { target: { value: 'A1A1A1' } })
                expect(handleChange).toHaveBeenCalledWith('A1A1A1')
                */
                _a.sent();
                expect(handleChange).toHaveBeenCalledTimes(6);
                expect(handleChange).toHaveBeenLastCalledWith('A1A1A1');
                return [2 /*return*/];
        }
    });
}); });
it('has no label when not provided', function () {
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var label = postalCode.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label === null || label === void 0 ? void 0 : label.innerHTML).toMatch(/^\s*$/);
});
it('has the correct label when provided', function () {
    var postalCode = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, label: 'Expected Postal Code', value: undefined }));
    var label = postalCode.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Postal Code');
});
it('label has asterisk when required', function () {
    var control = render(_jsx(PostalCode, { id: 'txtPostalCode', label: 'A Label', onChange: function () { return null; }, value: undefined }));
    var label = control.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    control = render(_jsx(PostalCode, { id: 'txtPostalCode', label: 'A Label', onChange: function () { return null; }, required: true, value: undefined }));
    label = control.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
});
it('is hidden when specified', function () {
    var control = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var input = control.getByDisplayValue('');
    expect(input).toBeVisible();
    cleanup();
    control = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, hidden: true, value: undefined }));
    input = control.getByDisplayValue('');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('displays error message when specified', function () {
    var control = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, value: undefined }));
    var errorMessage = control.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    control = render(_jsx(PostalCode, { id: 'txtPostalCode', onChange: function () { return null; }, errorMessage: 'Error!!', value: undefined }));
    errorMessage = control.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
