import React from 'react';
import { ButtonProps } from '../inputs/Button';
import './Well.scss';
export interface WellProps extends React.PropsWithChildren {
    title?: string;
    buttonDefs?: Array<ButtonProps>;
}
export declare function Well(props: WellProps): JSX.Element;
export default Well;
