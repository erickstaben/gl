import React from 'react'
import styles from './CustomerList.less';

interface Props {

}
const CustomerList = (props:Props) => (
        <div className={styles.mainDiv}>
            Em desenvolvimento
            A fazer:
                - Lista de todos os clientes cadastrados
                - Possibilita edição, cadastro de novos e delete.
        </div>
    )
export default CustomerList
