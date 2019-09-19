import React from 'react';
import styles from './AuthLayout.less';

interface Props {
    children: React.ReactElement;
}

const AuthLayout = (props:Props) => {
    const { children } = props
    return (
        <div className={styles.layoutContainer}>
            <div className={styles.logoContainer}>
                <img src='https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png'/>
            </div>            
            <div className={styles.formContainer}>
                {children}
            </div>
        </div>
    )
};

export default AuthLayout;
