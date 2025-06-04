export function convertToSelectOption(localizedOption, language) {
    var _a;
    var localizedText = localizedOption.text, value = localizedOption.value, disabled = localizedOption.disabled;
    var text = (_a = getString(localizedText, language)) !== null && _a !== void 0 ? _a : '';
    return { value: value, text: text, disabled: disabled };
}
export function isLocaleLookup(locales) {
    return typeof locales === 'object';
}
// TODO: make this more specific so that only LangSpec can be input?
export function isLocalizedString(langSpec) {
    return typeof langSpec === 'object';
}
export function getString(langSpec, language) {
    if (typeof language === 'string' && isLocalizedString(langSpec))
        return langSpec[language];
    else if (typeof langSpec === 'string')
        return langSpec;
}
