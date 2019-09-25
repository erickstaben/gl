import React from 'react'
import styles from './ScriptsHome.less';
import Developing from '@/components/Developing';

interface Props {

}
const ScriptsHome = (props:Props) => (
        <div className={styles.mainDiv}>
            <h2>Automações</h2>
            <div className={styles.cardContainer}>
                <Developing/>
            </div>
            <span>
                Em desenvolvimento
            A fazer:
                - Executar scripts via python.
            </span>
        </div>
    )

export default ScriptsHome
