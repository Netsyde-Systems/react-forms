import { jsx as _jsx } from "react/jsx-runtime";
import Button from '../inputs/Button';
export function LanguageToggle(props) {
    var currentLanguage = props.currentLanguage, languages = props.languages, onSelectLanguage = props.onSelectLanguage;
    var languageIndex = languages.indexOf(currentLanguage);
    var nextLanguageIndex = languageIndex + 1;
    if (nextLanguageIndex >= languages.length)
        nextLanguageIndex = 0;
    var nextLanguage = languages[nextLanguageIndex];
    return _jsx(Button, { text: "Toggle Language ".concat(currentLanguage, " -> ").concat(nextLanguage), onClick: function () { return onSelectLanguage(nextLanguage); } });
}
