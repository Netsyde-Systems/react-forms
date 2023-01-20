import { FormData, FormDefinition, FormState } from '../formbuilder/FormBuilderTypes';
import { FormBuilder } from '../formbuilder/FormBuilder';
export declare function useReactForms<FormT, LanguageT extends string | undefined = undefined>(formDefinition: FormDefinition<FormT, LanguageT>, initialFormState?: FormState<FormT, LanguageT>, initialFormData?: FormData<FormT>): FormBuilder<FormT, LanguageT>;
export default useReactForms;
