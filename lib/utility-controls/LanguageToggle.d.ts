export interface LanguageToggleProps<LanguageT extends string> {
    currentLanguage: LanguageT;
    languages: Array<LanguageT>;
    onLanguageChange: (language: LanguageT) => void;
}
export declare function LanguageToggle<LanguageT extends string>(props: LanguageToggleProps<LanguageT>): import("react/jsx-runtime").JSX.Element;
export interface LanguageSelectProps<LanguageT extends string> extends LanguageToggleProps<LanguageT> {
    languageNames?: Record<LanguageT, string>;
}
export declare function LanguageSelect<LanguageT extends string>(props: LanguageSelectProps<LanguageT>): import("react/jsx-runtime").JSX.Element;
