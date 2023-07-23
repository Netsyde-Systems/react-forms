export declare type SetQueryParamType<ParamT extends string | undefined> = (paramValue?: ParamT) => void;
export declare type QueryParamHookType<ParamT extends string | undefined> = [ParamT, SetQueryParamType<ParamT>];
export declare function useQueryParam<ParamT extends string | undefined>(paramName: string, defaultParamValue?: ParamT): QueryParamHookType<ParamT>;
