import React, { useEffect } from 'react'
import { Drawer, Checkbox } from 'antd';
import useForm from 'react-hook-form';
import { ID } from '@/models/database';
import { useDispatch, useSelector } from 'dva';
import { PhaseInterface } from '@/models/database'
import { FormListPreview, ReorderComponent } from '../../components'
import styles from './PhaseLane.less';
import PhaseForm from './PhaseForm';

type Props = {
    setVisibility: (b:boolean) => void;    
    withModal: boolean;
    pipe_id: ID;
    isVisible: boolean;
}

const PhaseLaneModal = (props:Props) => {
    
    const dispatch = useDispatch();
    const { setVisibility, pipe_id, isVisible} = props
    const onSubmit = (data) => {
        dispatch({
            type: 'phases/create',
            payload: {
                body: data,
                params: {}
            }
        })
    }
    return (    
        <Drawer
            title={'Adicionar nova fase'}
            placement="right"
            closable={false}
            width={600}
            height={600}
            onClose={() => setVisibility(false)}
            visible={isVisible}
        >
            <PhaseForm submit={onSubmit} pipe_id={pipe_id} editing={true}/>
        </Drawer> 
        
    )
}
PhaseLaneModal.defaultProps = {
    withModal: true
}

export default PhaseLaneModal