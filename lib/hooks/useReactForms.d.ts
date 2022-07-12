import { FormDefinition } from './FormBuilderTypes';
import { FormBuilder } from './FormBuilder';
export declare function useReactForms<FormT>(formDefinition: FormDefinition<FormT>, initialFormData: FormT): FormBuilder<FormT>;
export default useReactForms;
