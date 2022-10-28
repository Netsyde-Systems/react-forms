import React, { useRef } from 'react';
import { initFormState } from '../formbuilder/FormBuilderTypes';
import { FormBuilder } from '../formbuilder/FormBuilder';
export function useReactForms(formDefinition, initialFormData, initialLanguage) {
    if (initialFormData === void 0) { initialFormData = {}; }
    if (initialLanguage === void 0) { initialLanguage = undefined; }
    var _a = React.useState(initialFormData), formData = _a[0], setFormData = _a[1];
    var _b = React.useState(initFormState(initialFormData)), formState = _b[0], setFormState = _b[1];
    var _c = React.useState(initialLanguage), language = _c[0], setLanguage = _c[1];
    var formBuilderRef = useRef(new FormBuilder(formDefinition, formData, formState, language, setFormData, setFormState, setLanguage));
    return formBuilderRef.current;
}
export default useReactForms;
