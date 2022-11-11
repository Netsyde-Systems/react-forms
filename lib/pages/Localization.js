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
    fields: {
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
        stringDropdown: {
            label: {
                en: 'a String dropdown',
                fr: 'une sélecteur de chaîne'
            },
            selectOptions: [
                { value: 'opt1', text: {
                        en: 'Choice One',
                        fr: 'Choix Un'
                    }
                },
                { value: 'opt2', text: {
                        en: 'Choice Two',
                        fr: 'Choix Deux'
                    }
                },
                { value: 'opt3', text: {
                        en: 'Choice Three',
                        fr: 'Choix Trois'
                    }
                },
            ]
        },
        numberDropdown: {
            label: {
                en: 'a Number dropdown',
                fr: 'un sélecteur de nombre'
            },
            selectOptions: [
                { value: 1, text: {
                        en: 'Choice One',
                        fr: 'Choix Un'
                    }
                },
                { value: 2, text: {
                        en: 'Choice Two',
                        fr: 'Choix Deux'
                    }
                },
                { value: 3, text: {
                        en: 'Choice Three',
                        fr: 'Choix Trois'
                    }
                },
            ]
        },
        languageProperty: {
            label: {
                en: 'Language',
                fr: 'le langue'
            },
            selectOptions: [
                // Language name always appears in its own language (as is usually the convention)
                { value: 'en', text: { en: 'English', fr: 'English' } },
                // Hack to make typescript happy that types agree
                { value: 'fr', text: { en: 'Français', fr: 'Français' } },
            ]
        },
    }
};
export function Localization() {
    var rf = useReactForms(testFormDefinition, { languageProperty: 'en' });
    if (rf.language !== rf.formData.languageProperty) {
        rf.setLanguage(rf.formData.languageProperty);
    }
    return (_jsxs("div", __assign({ className: 'forms page' }, { children: [_jsx("h1", { children: rf.localize({ en: 'Locationlization Tests', fr: 'Tests de Localization' }) }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('stringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberInput('numberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textSelect('languageProperty') }))] })), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textSelect('stringDropdown') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberSelect('numberDropdown') })), _jsx("div", { className: 'control-cell' })] }))] })), _jsx("h2", { children: "Test Form Data" }), _jsx("pre", { children: JSON.stringify(rf.formData, null, 2) }), _jsx("h2", { children: "Test Form Types" }), _jsx("pre", { children: JSON.stringify(getTypeMap(rf.formData), null, 2) })] })));
}
export default Localization;
