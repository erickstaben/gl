import React, { ReactElement } from 'react';
import styles from './FormField.less';

interface Props {
    children: ReactElement | ReactElement[];
}

const FormField = (props:Props) => {
    const { children } = props
    return (
        <div className={styles.formInput}>
            {children}
        </div>
    )
}

export default FormField 