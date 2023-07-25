import React from 'react';
import { FormBuilder } from '..';
import './FormInspector.scss';
export interface FormInspectorProps extends React.PropsWithChildren {
    formBuilder: FormBuilder<any, any>;
}
export declare const FormInspector: React.FC<FormInspectorProps>;
export default FormInspector;
