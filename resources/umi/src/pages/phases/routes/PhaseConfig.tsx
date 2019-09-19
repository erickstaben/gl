import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'dva'
import { ID } from '@/models/database'
import styles from './PhaseConfig.less'
import { Row, Spin, Switch  } from 'antd';
import { FormListPreview } from '@/pages/cards/components';
import useForm from 'react-hook-form';
import { PhaseInterface } from '@/models/database'
import { ReorderComponent } from '../../cards/components';
import PhaseForm from '@/pages/cards/components/PhaseLane/PhaseForm';

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
        dispatch({
            type: 'phases/update',
            payload: {
                body: data,
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
        register({ name: "extends" })
    },[])
    return (
        <Spin spinning={saving || loading || false} className={styles.configContainer}>
            <PhaseForm editing={false} values={config} pipe_id={config.pipe_id} submit={onSubmit}/>
        </Spin>
    )
}

export default PhaseConfig