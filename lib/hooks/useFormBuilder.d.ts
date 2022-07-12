import { FormDefinition } from './FormBuilderTypes';
import { FormBuilder } from './FormBuilder';
export declare function useFormBuilder<FormT>(formDefinition: FormDefinition<FormT>, initialFormData: FormT): FormBuilder<FormT>;
export default useFormBuilder;
