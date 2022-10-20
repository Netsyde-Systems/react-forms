import React, { useRef } from 'react';
import { initFormState } from './FormBuilderTypes';
import { FormBuilder } from './FormBuilder';
export function useReactForms(formDefinition, initialFormData) {
    if (initialFormData === void 0) { initialFormData = {}; }
    var _a = React.useState(initialFormData), formData = _a[0], setFormData = _a[1];
    var _b = React.useState(initFormState(initialFormData)), formState = _b[0], setFormState = _b[1];
    var formBuilderRef = useRef(new FormBuilder(formDefinition, formData, formState, setFormData, setFormState));
    return formBuilderRef.current;
}
export default useReactForms;
