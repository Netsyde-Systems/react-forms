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
import Button from '../inputs/Button';
import useReactForms from '../hooks/useReactForms';
import FormInspector from '../utility-controls/FormInspector';
import './SubForms.scss';
var formDefinition = {
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
        language: {
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
    },
    subForms: {
        subForms: {
            formDefinition: {
                fields: {
                    date: {
                        collapseLabels: true
                    },
                    exclude: {
                        // in order to make radio/checkbox labels clickable we need unique ids
                        id: function (_a) {
                            var subFormIndex = _a.subFormIndex;
                            return "bool_".concat(subFormIndex);
                        },
                        collapseLabels: true
                    },
                    cost: {
                        collapseLabels: true,
                        validators: function (_a) {
                            var fieldValue = _a.fieldValue;
                            return fieldValue > 100 ? ['Error'] : [];
                        }
                    }
                }
            }
        }
    }
};
var sumCosts = function (subForms) {
    if (!subForms || subForms.length === 0)
        return 0;
    else
        return subForms.reduce(function (partialSum, subForm) {
            if (subForm.exclude || !subForm.cost)
                return partialSum;
            else
                return partialSum + subForm.cost;
        }, 0);
};
var subFormHeaders = {
    date: { en: 'Date', fr: 'Date' },
    cost: { en: 'Cost', fr: 'Coût' },
    exclude: { en: 'Exclude', fr: 'Exclure' },
};
var SumLabel = {
    en: 'Sum: ',
    fr: 'Somme: '
};
var testFormData = { language: 'en', subForms: [{}] };
export function Localization() {
    var _a;
    var rf = useReactForms(formDefinition, testFormData);
    if (rf.language !== rf.formData.language) {
        rf.setLanguage(rf.formData.language);
    }
    return (_jsxs(FormInspector, __assign({ formBuilder: rf }, { children: [_jsxs("div", __assign({ className: 'forms page' }, { children: [_jsx("h1", { children: "SubForms" }), _jsxs("div", __assign({ className: 'control-grid' }, { children: [_jsx("h2", { children: "Main Form" }), _jsxs("div", __assign({ className: 'control-row' }, { children: [_jsx("div", __assign({ className: 'control-cell' }, { children: rf.textInput('stringProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.numberInput('numberProperty') })), _jsx("div", __assign({ className: 'control-cell' }, { children: rf.textSelect('language') }))] })), _jsx("h2", { children: "Sub Forms" }), rf.subFormPanel('subForms', function (controller) {
                                return (_jsx(Button, { text: 'Add New', onClick: controller.addInstance }));
                            }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: rf.localize(subFormHeaders.date) }), _jsx("th", { children: rf.localize(subFormHeaders.cost) }), _jsx("th", { children: rf.localize(subFormHeaders.exclude) }), _jsx("th", {})] }) }), _jsx("tbody", { children: rf.subFormLoop('subForms', function (srf, controller) {
                                            return (_jsxs("tr", { children: [_jsx("td", { children: srf.dateInput('date') }), _jsx("td", { children: srf.currency('cost') }), _jsx("td", { children: srf.checkbox('exclude') }), _jsx("td", { children: _jsx(Button, { text: 'Delete', onClick: controller.deleteInstance }) })] }, controller.subFormIndex));
                                        }) }), _jsx("tfoot", { children: _jsxs("tr", { children: [_jsx("td", {}), _jsxs("td", { children: [rf.localize(SumLabel), " $", sumCosts((_a = rf.formData) === null || _a === void 0 ? void 0 : _a.subForms)] }), _jsx("td", {}), _jsx("td", {})] }) })] })] }))] })), _jsx("hr", {}), _jsx("div", { children: "TODO:  Figure out why we have to pass the SubFormShape as a generic constraint" }), _jsx("div", { children: "TODO:  Figure out how to infer the shape from the field name instead" }), _jsx("div", { children: "TODO:  Figure out why subform validation not working" })] })));
}
export default Localization;
