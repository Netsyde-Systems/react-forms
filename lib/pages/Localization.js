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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useReactForms from '../hooks/useReactForms';
import { getTypeMap } from '../utilities';
import './Localization.scss';
var testFormDefinition = {
    stringProperty: {
        label: {
            en: 'a String',
            fr: 'une chaîne'
        }
    },
    numberProperty: {
        label: {
            en: 'a Number',
            fr: 'un nombre'
        }
    },
    languageProperty: {
        label: {
            en: 'Language',
            fr: 'le langue'
        },
        selectOptions: [
            { value: 'en', text: 'English' },
            // lame type hack for now... TODO: Fix this
            { value: 'fr', text: 'Français' },
        ]
    },
};
var testFormData = {};
export function Localization() {
    var rf = useReactForms(testFormDefinition, testFormData);
    if (rf.language !== rf.formData.languageProperty) {
        rf.setLanguage(rf.formData.languageProperty);
    }
    return (_jsxs("div", __assign({ className: 'forms page' }, { children: [_jsx("h1", { children: "Form Tests" }), _jsx("div", __assign({ className: 'control-grid' }, { children: _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('stringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberInput('numberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textSelect('languageProperty') }))] })) })), _jsx("h2", { children: "Test Form Data" }), _jsx("pre", { children: JSON.stringify(rf.formData, null, 2) }), _jsx("h2", { children: "Test Form Types" }), _jsx("pre", { children: JSON.stringify(getTypeMap(rf.formData), null, 2) })] })));
}
export default Localization;
