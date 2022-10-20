import { FormShape, FormData, FormDefinition } from './FormBuilderTypes';
import { FormBuilder } from './FormBuilder';
export declare function useReactForms<FormT extends FormShape>(formDefinition: FormDefinition<FormT>, initialFormData?: FormData<FormT>): FormBuilder<FormT>;
export default useReactForms;
