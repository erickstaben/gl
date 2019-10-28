import React, { ReactElement } from 'react';
import styles from './FormField.less';
import classnames from 'classnames';
import { ReactHookFormError } from 'react-hook-form/dist/types';

interface Props {
    children: ReactElement | ReactElement[];
    hasError ?: ReactHookFormError | boolean;
}

const FormField = (props:Props) => {
    const { children,hasError } = props
    return (
        <div className={classnames(styles.formInput,{ [styles.formError]: hasError })}>
            {children}
        </div>
    )
}

export const FormFieldContainer = (props:Props) => {
    const { children, hasError } = props
    return (
        <div className={classnames(styles.formContainer, { [styles.formError]: hasError})}>
            {children}
        </div>
    )
}
export default FormField 