import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'dva'
import { ID } from '@/models/database'
import styles from './PhaseConfig.less'
import { Row, Spin, Switch  } from 'antd';
import { FormListPreview } from '@/pages/cards/components';
import useForm from 'react-hook-form';
import { PhaseInterface } from '@/models/database'
import { ReorderComponent } from '../../cards/components';

interface Props {
    match: {
        params: {
            id: ID;
        }
    }
}
const PhaseConfig = (props:Props) => {
    const dispatch = useDispatch()
    const { id } = props.match.params

    useEffect(() => {
        reset()
        dispatch({
            type: 'phases/phaseConfig',
            payload: {
                path_id: [id]
            }
        })
    },[id])    
    const onSubmit = (data: any) => {
        const newData = {
            ...data,
            pipe_id: config.pipe_id
        }
        dispatch({
            type: 'phases/update',
            payload: {
                body: newData,
                path_id: [config.id]
            }
        })
    };
    const saving = useSelector((state:any) => state.loading.effects['phases/update'])
    const loading = useSelector((state:any) => state.loading.effects['phases/phaseConfig'])
    const config = useSelector((state:any) => state.phases.loaded.config)
    const { register, handleSubmit, errors, setValue, setError, reset } = useForm();
    useEffect(() => {
        register({ name: "phaseFields" })
        register({ name: "is_final" })
    },[])
    return (
        <Spin spinning={saving || loading || false} className={styles.configContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <div className={styles.formInput}>
                    <label>Nome da fase:</label>
                    <input defaultValue={config.name} name='name' ref={register}/>
                </div>
            </Row>
            <Row>
                <div className={styles.formInput}>
                    <label>Descrição:</label>
                    <input defaultValue={config.description} name='description' ref={register}/>
                </div>
            </Row>
            <Row>
                <div className={styles.formInput}>
                    <label>Status para o cliente:</label> 
                    <input defaultValue={config.client_status} name='client_status' ref={register}/>
                </div>                
            </Row>
            <Row>
                <FormListPreview initialState={config.phase_fields} setValue={setValue} setError={setError}/>
            </Row>
            <Row> 
                <label className={styles.defaultLabel}>Fase final:</label>               
                <div><Switch defaultChecked={config.is_final} onChange={(value) => setValue('is_final',value)}/></div>
            </Row>
            <Row>
                <button type='submit' className={styles.saveButton}>Salvar</button>
            </Row>
            </form>
        </Spin>
    )
}

export default PhaseConfig