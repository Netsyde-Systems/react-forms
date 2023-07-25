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
import { render, cleanup /*, fireEvent */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextSelect from './TextSelect';
it('has the correct label', function () {
    var options = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    // empty when no label provided
    var control = render(_jsx(TextSelect, { id: 'ctlId', value: 'Value Two', onChange: function () { return null; }, selectOptions: options }));
    var label = control.container.querySelector('label');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(label).toHaveTextContent(/^\s*$/);
    cleanup();
    // text matches when provided
    control = render(_jsx(TextSelect, { id: 'ctlId', value: 'Value Three', onChange: function () { return null; }, label: 'Expected Label Value', selectOptions: options }));
    label = control.container.querySelector('label');
    expect(label).toHaveTextContent('Expected Label Value');
});
it('displays supplied value', function () {
    var options = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var rendered = render(_jsx(TextSelect, { id: 'ctlId', label: 'Control Label', value: 'Value Two', onChange: function () { return null; }, selectOptions: options }));
    var input = rendered.getByLabelText('Control Label');
    expect(input).toHaveDisplayValue('Option Two');
});
it('has correct id', function () {
    var options = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var rendered = render(_jsx(TextSelect, { id: 'ctlId', label: 'Control Label', value: 'Value One', onChange: function () { return null; }, selectOptions: options }));
    var input = rendered.getByLabelText('Control Label');
    expect(input).toHaveAttribute('id', 'ctlId');
});
it('displays error message when specified', function () {
    var options = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var rendered = render(_jsx(TextSelect, { id: 'selTextInput', value: 'Value One', onChange: function () { return null; }, selectOptions: options }));
    var errorMessage = rendered.container.querySelector('.error-message');
    // label inner content is actually ' ', to keep it from collapsing
    // the below regex matches any number of whitespace characters
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch(/^\s*$/);
    cleanup();
    rendered = render(_jsx(TextSelect, { id: 'selTextInput', value: 'Value One', onChange: function () { return null; }, errorMessage: 'Error!!', selectOptions: options }));
    errorMessage = rendered.container.querySelector('.error-message');
    expect(errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.textContent).toMatch('Error!!');
});
it('is hidden when specified', function () {
    var options = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var rendered = render(_jsx(TextSelect, { id: 'selTextInput', label: 'Control Label', value: 'Value Two', onChange: function () { return null; }, selectOptions: options }));
    var input = rendered.getByLabelText('Control Label');
    expect(input).toBeVisible();
    cleanup();
    rendered = render(_jsx(TextSelect, { id: 'selTextInput', label: 'Control Label', value: 'Value Two', onChange: function () { return null; }, selectOptions: options }));
    input = rendered.getByLabelText('Control Label');
    // TODO: Figure out why hidden isn't being respected... css isn't being loaded or interpreted perhaps?
    // expect(input).not.toBeVisible()
});
it('is required when specified', function () {
    var options = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var rendered = render(_jsx(TextSelect, { id: 'selTextInput', value: 'Value Three', label: 'Control Label', onChange: function () { return null; }, selectOptions: options }));
    var input = rendered.getByLabelText('Control Label');
    expect(input).not.toBeRequired();
    cleanup();
    rendered = render(_jsx(TextSelect, { id: 'selTextInput', value: 'Value Three', label: 'Control Label', onChange: function () { return null; }, selectOptions: options, required: true }));
    input = rendered.getByLabelText('Control Label');
    expect(input).toBeRequired();
});
it('label has asterisk indicator when required', function () {
    var options = [
        { value: 'Value One', text: 'Option One' },
        { value: 'Value Two', text: 'Option Two' },
        { value: 'Value Three', text: 'Option Three' },
    ];
    var rendered = render(_jsx(TextSelect, { id: 'selTextInput', value: 'Value Three', label: 'A Label', onChange: function () { return null; }, selectOptions: options }));
    var label = rendered.container.querySelector('label');
    expect(label).not.toHaveTextContent(/\*/);
    cleanup();
    rendered = render(_jsx(TextSelect, { id: 'selTextInput', value: 'Value Three', label: 'A Label', onChange: function () { return null; }, required: true, selectOptions: options }));
    label = rendered.container.querySelector('label');
    // TODO: Figure out how to check for label's css '::before' content
    // expect(control).toHaveTextContent(/\*/)
    // expect(label).toHaveStyle("content: '✷'")
    // expect(label).toHaveStyle("font-weight: bold;")
});
it('calls onChange function', function () { return __awaiter(void 0, void 0, void 0, function () {
    var options, user, handleChange, rendered, input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = [
                    { value: 'Value One', text: 'Option One' },
                    { value: 'Value Two', text: 'Option Two' },
                    { value: 'Value Three', text: 'Option Three' },
                ];
                user = userEvent.setup();
                handleChange = vi.fn();
                rendered = render(_jsx(TextSelect, { id: 'ctlId', label: 'Control Label', value: 'Value Three', onChange: handleChange, selectOptions: options }));
                input = rendered.getByLabelText('Control Label');
                // fireEvent.change(input, { target: { value: 'Value Two' } })
                return [4 /*yield*/, user.selectOptions(input, 'Option Two')];
            case 1:
                // fireEvent.change(input, { target: { value: 'Value Two' } })
                _a.sent();
                expect(handleChange).toHaveBeenCalledWith('Value Two');
                return [2 /*return*/];
        }
    });
}); });
