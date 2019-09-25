
import { MdExtension} from 'react-icons/md'
import styles from './index.less'
import React from 'react'
import { Icon } from 'antd';

interface Props {
    icon ?: string;
    text ?: string;
    contentHeight ?: number;
}
const Developing = (props: Props) => {
    const { icon, text, contentHeight } = props
    return (
        <div style={contentHeight ? {height: contentHeight} : {}} className={styles.container}>
                <i className={styles.icon}>
                    {icon ? <Icon type={icon}/> : <MdExtension/>}
                </i>
                <div className={styles.text}>
                    {text || 'Em desenvolvimento'}
                </div>
        </div>
    )
}




export default Developing

