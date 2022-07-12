import React from 'react';
import { initFormState } from './FormBuilderTypes';
import { FormBuilder } from './FormBuilder';
export function useFormBuilder(formDefinition, initialFormData) {
    var _a = React.useState(initialFormData), formData = _a[0], setFormData = _a[1];
    var _b = React.useState(initFormState(initialFormData)), formState = _b[0], setFormState = _b[1];
    var formBuilder = new FormBuilder(formDefinition, formData, formState, setFormData, setFormState);
    return formBuilder;
}
export default useFormBuilder;
