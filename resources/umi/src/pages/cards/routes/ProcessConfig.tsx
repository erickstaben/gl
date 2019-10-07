import React, { useEffect, useState } from 'react';
import { Collapse, Spin, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import useForm from 'react-hook-form';
import FormField from '../components/FormField/FormField';
import styles from './ProcessConfig.less';


interface Props {
    match: {
        params: {
            id: number | string;
        }
    }
}

const ProcessesBoard = (props: Props) => {
    const { id } = props.match.params
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => {
        if(!id){
            dispatch({
                type: 'processes/store',
                payload:{
                    body: data
                }
            })
        }
        else{
            dispatch({
                type: 'processes/update',
                payload:{
                    body: data,
                    path_id: [id]
                }
            })
        }
    }
    useEffect(() => {
        if(id){
            dispatch({
                type: 'processes/show',
                payload: {
                    path_id: [id],
                }
            })
        }
    }, [])
    return (
        <div className={styles.processBoardContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                    <input name='name' ref={register} />
                </FormField>
                <FormField>
                    <button type='submit'>Salvar mudanças</button>
                </FormField>
            </form>            
        </div>
    )
}

export default ProcessesBoard 