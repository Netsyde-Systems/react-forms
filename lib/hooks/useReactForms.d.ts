import { FormData, FormDefinition } from '../formbuilder/FormBuilderTypes';
import { FormBuilder } from '../formbuilder/FormBuilder';
export declare function useReactForms<FormT, LanguageT extends string | undefined = undefined>(formDefinition: FormDefinition<FormT, LanguageT>, initialFormData?: FormData<FormT>, initialLanguage?: LanguageT | undefined): FormBuilder<FormT, LanguageT>;
export default useReactForms;
