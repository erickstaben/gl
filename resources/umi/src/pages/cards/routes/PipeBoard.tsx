
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva'
import { orderBy } from 'lodash';
import { Modal } from 'antd';
import styles from './PipeBoard.less';
import { PhaseLane, PipeContainer, ActionCard, EndCard } from '../components'
import { ConnectState } from '@/models/connect';

import { PhaseInterface, ID } from '@/models/database';
import { PhaseInnerProps } from '../components/PhaseLane/PhaseLane';

const getPhaseProps = (phaseIndex: number, phases: Array<PhaseInterface>):PhaseInnerProps => {
  const previousPhase = phaseIndex !== 0 ? {
    index: phaseIndex - 1,
    id: phases[phaseIndex - 1].id
  } : undefined
  const phaseInfo = {
    index: phaseIndex,
    id: phases[phaseIndex].id
  }
  const nextPhase = (phases.length - 1 !== phaseIndex) ? {
    index: phaseIndex + 1,
    id: phases[phaseIndex + 1].id,
  }: undefined; 
  return {
    previousPhase,
    phaseInfo,
    nextPhase,
  }
}
const renderPhases = (phases: PhaseInterface[], toggleModal:Function):React.ReactChild[] => phases.map((phase, phaseIndex) => {
  const phaseProps = getPhaseProps(phaseIndex,phases)
  return (
    <PhaseLane
      key={phaseIndex} 
      cards={phase.cards || []}
      is_final={phase.is_final}
      toggleModal={toggleModal}
      {...phaseProps}
    />
  )
})
interface Props {
  match: {
    params: {
      id: ID;
    }
  }
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
  const phases:PhaseInterface[] = useSelector((state:ConnectState) => state.pipes.loaded.phases)
  const [isVisible, toggleModal] = useState(false)

  return (<>
      <PipeContainer pipe_id={id}>
        {renderPhases(phases || [], toggleModal)}
      </PipeContainer>
      <Modal onCancel={() => toggleModal(false)} visible={isVisible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default PipeBoard
