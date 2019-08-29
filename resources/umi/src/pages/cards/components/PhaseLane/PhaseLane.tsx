
import React from 'react';
import classnames from 'classnames';
import styles from './PhaseLane.less';
import SpanEdit from '@/components/SpanEdit';
import { ID } from '@/models/database';


interface Props {
    children : React.ReactChild[] | React.ReactChild | null;
    phase_id: ID,
    index: number,
}

const PhaseLane = (props:Props):React.ReactElement => {
    const { children, phase_id = 1, index } = props
    return (
        <li className={styles.phaseContent}>
            <header className={styles.phaseHeader}>
                <SpanEdit dispatch={{ name: `phases.list[${index}].name`, type: 'phases/phaseNameUpdate', id: phase_id }}/>
            </header>
            <div className={classnames(styles.phaseLane, styles.scrollBar)}>
            {children}
            </div>
        </li>
    );
}

export default PhaseLane
