
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva'
import { Modal } from 'antd';
import styles from './PipeBoard.less';
import { PipeContainer, CardModal } from '../components'
import { ConnectState } from '@/models/connect';
import { PhaseInterface, ID } from '@/models/database';
interface Props {
  match: {
    params: {
      id: ID;
    }
  }
}

const customCompare = (l: Array<any>, r: Array<any>) => {
  return l.filter((e, i) => r[i].order !== e.order) ? false : true
}
const PipeBoard = (props:Props) => {
  const dispatch = useDispatch()
  const { id } = props.match.params
  useEffect(() => {
    dispatch({
      type: 'pipes/pipeShow',
      payload: {
        path_id: [id],
      },
    })
  }, [])
  const phases: PhaseInterface[] = useSelector((state: ConnectState) => state.pipes.loaded.phases || [], customCompare)
  const [isVisible, toggleModal] = useState(false)
  return (
    <div style={{ overflowX: 'auto' }} className={styles.scrollBar}>
      <PipeContainer phases={phases} toggleModal={toggleModal} pipe_id={id}/>
      
      <CardModal toggleModal={toggleModal} isVisible={isVisible}/>
    </div>
  );
}

export default PipeBoard
