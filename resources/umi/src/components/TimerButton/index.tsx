import React from 'react';
import { MdTimer } from 'react-icons/md';
import { useDispatch, useSelector } from 'dva';
import { ConnectState } from '@/models/connect';
import { find } from 'lodash';

interface Props {
    company_id: number;
    type: string;
    reference_id: number | null;
    reference_model: string | null;
    text ?: string;
    title ?: string;
}
const TimerButton = (props:Props) => {
    const { company_id, type, title, reference_id = null, reference_model = null } = props
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch({
            type: 'events/newTimer',
            payload: {
                params: {
                    company_id,
                    type,
                    title,
                    reference_id,
                    reference_model,
                }
            }
        })
    }    
    const timers = useSelector((state: ConnectState) => state.events.timers)
    return (
        <div style={{float: 'right',marginRight: 8,}}>
            {find(timers,{
                reference_id: reference_id,
                reference_model: reference_model
            }) ? <span> Timer já iniciado </span> :
            <button onClick={() => handleClick()}>
                <i><MdTimer /></i>
                <span>Iniciar timer</span>
            </button>
            }
            
        </div>
    )
}

export default TimerButton