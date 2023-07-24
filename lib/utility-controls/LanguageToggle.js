import { jsx as _jsx } from "react/jsx-runtime";
import { TextSelect } from '../inputs/TextSelect';
export function LanguageToggle(props) {
    var currentLanguage = props.currentLanguage, languages = props.languages, onLanguageChange = props.onLanguageChange;
    var languageIndex = languages.indexOf(currentLanguage);
    var nextLanguageIndex = languageIndex + 1;
    if (nextLanguageIndex >= languages.length)
        nextLanguageIndex = 0;
    var nextLanguage = languages[nextLanguageIndex];
    return _jsx("button", { onClick: function () { return onLanguageChange(nextLanguage); }, children: "Toggle Language ".concat(currentLanguage, " -> ").concat(nextLanguage) });
}
export function LanguageSelect(props) {
    var currentLanguage = props.currentLanguage, languages = props.languages, onLanguageChange = props.onLanguageChange, languageNames = props.languageNames;
    var languageOptions = languages.map(function (lang) {
        var _a;
        var langOption = {
            value: lang,
            text: (_a = languageNames === null || languageNames === void 0 ? void 0 : languageNames[lang]) !== null && _a !== void 0 ? _a : lang
        };
        return langOption;
    });
    return _jsx(TextSelect, { id: 'lang-select', value: currentLanguage, onChange: function (val) { return onLanguageChange(val); }, selectOptions: languageOptions, disallowBlank: true, errorMessage: false, label: false });
}
