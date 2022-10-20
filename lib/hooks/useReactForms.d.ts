import { FormShape, FormData, FormDefinition } from '../formbuilder/FormBuilderTypes';
import { FormBuilder } from '../formbuilder/FormBuilder';
export declare function useReactForms<FormT extends FormShape>(formDefinition: FormDefinition<FormT>, initialFormData?: FormData<FormT>): FormBuilder<FormT>;
export default useReactForms;
