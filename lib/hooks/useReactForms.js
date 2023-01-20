import React, { useRef } from 'react';
import { FormBuilder } from '../formbuilder/FormBuilder';
export function useReactForms(formDefinition, initialFormState, initialFormData) {
    if (initialFormState === void 0) { initialFormState = { language: undefined }; }
    if (initialFormData === void 0) { initialFormData = {}; }
    var _a = React.useState(initialFormData), formData = _a[0], setFormData = _a[1];
    var _b = React.useState(initialFormState), formState = _b[0], setFormState = _b[1];
    var formBuilderRef = useRef(new FormBuilder(formDefinition, formData, formState, setFormData, setFormState));
    return formBuilderRef.current;
}
export default useReactForms;
