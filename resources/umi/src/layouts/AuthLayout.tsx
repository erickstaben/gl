import React from 'react';
import styles from './AuthLayout.less';

interface Props {
    children: React.ReactElement;
}

const AuthLayout = (props:Props) => {
    const { children } = props
    return (
        <div className={styles.layoutContainer}>
            {children}
        </div>
    )
};

export default AuthLayout;
