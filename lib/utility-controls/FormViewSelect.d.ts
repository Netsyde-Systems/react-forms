/// <reference types="react" />
declare const ALL_FORM_VIEWS: readonly ["Edit", "ReadOnly", "Disabled"];
export declare type FormView = typeof ALL_FORM_VIEWS[number];
export interface FormViewState {
    isDisabled: boolean;
    isReadOnly: boolean;
}
export declare function getFormViewState(formView: FormView): FormViewState;
export interface FormViewSelectProps {
    currentFormView: FormView;
    onFormViewChange: (formView: FormView) => void;
}
export declare function FormViewSelect(props: FormViewSelectProps): JSX.Element;
export {};
