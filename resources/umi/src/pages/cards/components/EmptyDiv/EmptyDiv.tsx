import React from 'react';
import styles from './EmptyDiv.less'
import classnames from 'classnames';
import { Icon } from 'antd';


interface Props {
    text: string
    bodyClassName ?: string;
    icon ?: string
}

const EmptyDiv = (props:Props) => {
    const {text,icon = null,bodyClassName = ''} = props
    return (
        <div className={classnames(styles.emptyDiv, bodyClassName)}>{icon ? <div className={styles.flexBox}>
            <Icon type={icon}/>{text}
            </div> : text}</div>
    )
}
export default EmptyDiv