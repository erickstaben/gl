
import { Input, Spin } from 'antd';
import React, { useState } from 'react'


import { get, last } from 'lodash';
import { useSelector, useDispatch } from 'dva';
import styles from './index.less';
import { ID } from '@/models/database';

interface Props {
    inputStyle ?: object;
    divStyle ?: object;
    dispatch: {
        name: string;
        type: string;
        id: ID;
    };
}

const SpanEdit = (props:Props) => {
    const reduxDispatch = useDispatch()

    const { dispatch } = props

    const [isEditing, toggleEdit] = useState(false)
    const fieldValue = useSelector(state => get(state, dispatch.name))
    const loading = useSelector(state => state.loading.effects[dispatch.type])
    const [partialText, setText] = useState(fieldValue)

    const saveChanges = (e:React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        reduxDispatch({
            type: dispatch.type,
            payload: {
                params: {
                    value: target.value,
                    name: last(dispatch.name.split('.')),
                },
                path_id: [dispatch.id],
            },
        })
        toggleEdit(!isEditing)
    }
    return (
        <div style={{flexGrow: 2}}>
            {isEditing ?
                <span style={{ display: 'flex', flexDirection: 'column', marginRight: 8, maxWidth: 230 }}>
                    <Spin spinning={loading}>
                    <Input className={styles.input} autoFocus onBlur={saveChanges} defaultValue={fieldValue} onChange={e => setText(e.target.value)} value={partialText}/>
                    <span className={styles.inputLabel}>Aperte enter para salvar</span>
                    </Spin>
                </span>
            :
                <div className={styles.title} onClick={e => toggleEdit(!isEditing)}>{fieldValue}</div>}
        </div>
    )
}

export default SpanEdit
