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
import { jsx as _jsx } from "react/jsx-runtime";
export function LanguageToggle(props) {
    var currentLanguage = props.currentLanguage, languages = props.languages, onLanguageChange = props.onLanguageChange;
    var languageIndex = languages.indexOf(currentLanguage);
    var nextLanguageIndex = languageIndex + 1;
    if (nextLanguageIndex >= languages.length)
        nextLanguageIndex = 0;
    var nextLanguage = languages[nextLanguageIndex];
    return _jsx("button", __assign({ onClick: function () { return onLanguageChange(nextLanguage); } }, { children: "Toggle Language ".concat(currentLanguage, " -> ").concat(nextLanguage) }));
}
