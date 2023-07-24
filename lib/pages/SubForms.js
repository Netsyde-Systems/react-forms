import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useReactForms from '../hooks/useReactForms';
import FormInspector from '../utility-controls/FormInspector';
import './SubForms.scss';
var formDefinition = {
    fields: {
        stringProperty: {
            isRequired: true,
            label: {
                en: 'a Required String',
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
        subFormsProperty: {
            formDefinition: {
                fields: {
                    date: {
                        collapseLabels: true,
                        isRequired: true
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
                        isRequired: true
                    }
                }
            }
        },
        req2SubFormsProperty: {
            validators: function (_a) {
                var formData = _a.formData, language = _a.language;
                if (!formData.req2SubFormsProperty || formData.req2SubFormsProperty.length < 2) {
                    return [(language && min2SubForms[language]) || min2SubForms.en];
                }
                return [];
            },
            formDefinition: {
                fields: {
                    date: {
                        collapseLabels: true,
                        isRequired: true
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
                        isRequired: true
                    }
                }
            }
        },
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
var min2SubForms = {
    en: 'Minimum two subforms required',
    fr: 'FR: Un minimum de deux subforms sont necessaire [sp]'
};
var testFormData = { language: 'en', subFormsProperty: [{}] };
export function Localization() {
    var _a, _b;
    var rf = useReactForms(formDefinition, testFormData);
    if (rf.formState.language !== rf.formData.language) {
        rf.setLanguage(rf.formData.language);
    }
    return (_jsxs(FormInspector, { formBuilder: rf, children: [_jsxs("div", { className: 'forms page', children: [_jsxs("div", { className: 'control-grid', children: [_jsx("h2", { children: "Main Form" }), _jsxs("div", { className: 'control-row', children: [_jsx("div", { className: 'control-cell', children: rf.textInput('stringProperty') }), _jsx("div", { className: 'control-cell', children: rf.numberInput('numberProperty') }), _jsx("div", { className: 'control-cell', children: rf.textSelect('language') })] }), _jsx("h2", { children: "Sub Forms" }), rf.subFormPanel('subFormsProperty', function (controller) {
                                return (_jsx("button", { onClick: controller.addInstance, children: "Add New" }));
                            }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: rf.localize(subFormHeaders.date) }), _jsx("th", { children: rf.localize(subFormHeaders.cost) }), _jsx("th", { children: rf.localize(subFormHeaders.exclude) }), _jsx("th", {})] }) }), _jsx("tbody", { children: rf.subFormLoop('subFormsProperty', function (srf, controller) {
                                            return (_jsxs("tr", { children: [_jsx("td", { children: srf.dateInput('date') }), _jsx("td", { children: srf.currency('cost') }), _jsx("td", { children: srf.checkbox('exclude') }), _jsx("td", { children: _jsx("button", { onClick: controller.deleteInstance, children: "Delete" }) })] }, controller.subFormIndex));
                                        }) }), _jsx("tfoot", { children: _jsxs("tr", { children: [_jsx("td", {}), _jsxs("td", { children: [rf.localize(SumLabel), " $", sumCosts((_a = rf.formData) === null || _a === void 0 ? void 0 : _a.subFormsProperty)] }), _jsx("td", {}), _jsx("td", {})] }) })] }), _jsx("h2", { children: "Min 2 Required Sub Forms" }), rf.subFormPanel('req2SubFormsProperty', function (controller) {
                                return (_jsx("button", { onClick: controller.addInstance, children: "Add New" }));
                            }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: rf.localize(subFormHeaders.date) }), _jsx("th", { children: rf.localize(subFormHeaders.cost) }), _jsx("th", { children: rf.localize(subFormHeaders.exclude) }), _jsx("th", {})] }) }), _jsx("tbody", { children: rf.subFormLoop('req2SubFormsProperty', function (srf, controller) {
                                            return (_jsxs("tr", { children: [_jsx("td", { children: srf.dateInput('date') }), _jsx("td", { children: srf.currency('cost') }), _jsx("td", { children: srf.checkbox('exclude') }), _jsx("td", { children: _jsx("button", { onClick: controller.deleteInstance, children: "Delete" }) })] }, controller.subFormIndex));
                                        }) }), _jsx("tfoot", { children: _jsxs("tr", { children: [_jsx("td", {}), _jsxs("td", { children: [rf.localize(SumLabel), " $", sumCosts((_b = rf.formData) === null || _b === void 0 ? void 0 : _b.req2SubFormsProperty)] }), _jsx("td", {}), _jsx("td", {})] }) })] })] }), _jsx("button", { onClick: function () { return rf.validate(); }, children: "Validate" })] }), _jsx("hr", {}), _jsx("div", { children: "TODO:  Figure out why we have to pass the SubFormShape as a generic constraint" }), _jsx("div", { children: "TODO:  Figure out how to infer the shape from the field name instead" })] }));
}
export default Localization;
