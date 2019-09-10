import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'dva'
import { ID } from '@/models/database'

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
        dispatch({
            type: 'phases/phaseConfig',
            payload: {
                path_id: [id]
            }
        })
    },[])

    const config = useSelector((state:any) => state.phases.loaded.config)

    return (
        <div>
            asdasd
        </div>
    )
}

export default PhaseConfig