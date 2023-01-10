/// <reference types="react" />
export interface LanguageToggleProps<LanguageT extends string> {
    currentLanguage: LanguageT;
    languages: Array<LanguageT>;
    onLanguageChange: (language: LanguageT) => void;
}
export declare function LanguageToggle<LanguageT extends string>(props: LanguageToggleProps<LanguageT>): JSX.Element;
