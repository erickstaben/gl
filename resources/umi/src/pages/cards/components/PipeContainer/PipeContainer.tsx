
import React from 'react';
import styles from './PipeContainer.less';
import { ID } from '@/models/database';

interface Props {
    children : React.ReactChild[] | React.ReactChild | React.ReactNode | JSX.Element
    pipe_id: ID;
}

const PhaseLane = (props:Props):React.ReactElement => {
    const { children, pipe_id } = props
    return (
        <>
            <h1>Identificador do pipe: {pipe_id}</h1>
            <ul className={styles.pipeContainer}>
                {children}
            </ul>
        </>

    );
}

export default PhaseLane
