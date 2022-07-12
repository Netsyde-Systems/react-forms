export declare const Languages: {
    'en-CA': string;
    'fr-CA': string;
};
export declare type Locale = keyof typeof Languages;
export declare const toIsoGmtDateString: (date?: Date | null) => string;
export declare function iterateObject<T>(obj: T, iteratorFunction: (fieldName: keyof T, fieldValue: T[keyof T], obj: T) => void): void;
