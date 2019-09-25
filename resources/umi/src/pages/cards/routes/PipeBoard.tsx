
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva'
import { Modal, Affix } from 'antd';
import styles from './PipeBoard.less';
import { PipeContainer, CardModal, NewCardModal  } from '../components'
import { ConnectState } from '@/models/connect';
import { PhaseInterface, ID } from '@/models/database';
import { MdAdd } from 'react-icons/md';
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
  const [isNewVisible, toggleNewCard] = useState(false)
  return (
    <div style={{ overflowX: 'auto' }} className={styles.scrollBar}>
      <PipeContainer phases={phases} toggleModal={toggleModal} pipe_id={id}/>
      
      <CardModal toggleModal={toggleModal} isVisible={isVisible}/>
      <NewCardModal toggleModal={toggleNewCard} isVisible={isNewVisible}/>
      <div onClick={() => toggleNewCard(true)} className={styles.affixButton}>
        <i><MdAdd/></i>
      </div>
    </div>
  );
}

export default PipeBoard
