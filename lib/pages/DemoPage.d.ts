import { FC } from "react";
export type DemoPageType = 'controls' | 'forms' | 'validation' | 'localization' | 'subforms';
export interface DemoPageButtonProps {
    page: DemoPageType;
    selectedPage: DemoPageType;
    setPage: (page: DemoPageType) => void;
}
export declare const DemoPageButton: FC<DemoPageButtonProps>;
export declare const DemoPage: FC<{
    pageType: DemoPageType;
}>;
