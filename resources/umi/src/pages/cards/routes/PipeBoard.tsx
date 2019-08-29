
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva'
import { orderBy } from 'lodash';
import { Modal } from 'antd';
import styles from './PipeBoard.less';
import { PhaseLane, PipeContainer, ActionCard, EndCard } from '../components'
import { ConnectState } from '@/models/connect';

import { PhaseInterface, ID } from '@/models/database';

const renderPhases = (phases: PhaseInterface[], toggleModal:Function):React.ReactChild[] => orderBy(phases, ['order']).map((phase, phaseIndex) => {
    if (!phase.is_final) {
      return (
        <PhaseLane key={phaseIndex} index={phaseIndex} phase_id={phase.id}>
          {phase.cards ? phase.cards.map((card, cardIndex) => (
              <ActionCard toggleModal={toggleModal} card={card}/>
            )) : null}
        </PhaseLane>
      )
    }

      return (
        <PhaseLane key={phaseIndex} index={phaseIndex} phase_id={phase.id}>
          {phase.cards ? phase.cards.map((card, cardIndex) => (
              <EndCard toggleModal={toggleModal} card={card}/>
            )) : null}
        </PhaseLane>
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
        {renderPhases(phases, toggleModal)}
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
