
import EmptyDiv from '@/pages/cards/components/EmptyDiv/EmptyDiv'
import { orderBy } from 'lodash';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'dva'

interface Props {
    match: {
        params: {
            id: number | string;
        }
    }
}
const PhasesCenter = (props:Props) => {
    const dispatch = useDispatch()
    const phases = useSelector((state:any) => state.phases.list)
    return (
        <div>
            {
                phases.length > 0
            ? 
                orderBy(phases,'order').map((phase:any) => <div>
                    {phase.name}
                </div>)
             : 
                <EmptyDiv text={'Não há fases nesse pipe'}/>
            }
        </div>
    )
}
export default PhasesCenter