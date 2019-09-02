
import React from 'react';
import classnames from 'classnames';
import styles from './PhaseLane.less';
import SpanEdit from '@/components/SpanEdit';
import { ID } from '@/models/database';

interface InnerPhase {
    id: ID;
    index: number;
}
export interface PhaseInnerProps { 
    previousPhase?: InnerPhase;
    nextPhase?: InnerPhase;
    phaseInfo: InnerPhase;
}
type Props = {
    children : React.ReactChild[] | React.ReactChild | null;   
} & PhaseInnerProps;

const PhaseLane = (props:Props):React.ReactElement => {
    const { children, previousPhase, nextPhase, phaseInfo } = props
    return (
        <li className={styles.phaseContent}>
            <header className={styles.phaseHeader}>
                <SpanEdit dispatch={{ name: `phases.list[${phaseInfo.index}].name`, type: 'phases/phaseNameUpdate', id: phaseInfo.id }}/>
            </header>
            <div className={classnames(styles.phaseLane, styles.scrollBar)}>
            {children}
            </div>
        </li>
    );
}

export default PhaseLane
