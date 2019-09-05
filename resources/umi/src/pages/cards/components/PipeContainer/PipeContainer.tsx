
import React, {useState} from 'react';
import styles from './PipeContainer.less';
import { ID, PhaseInterface, CardInterface } from '@/models/database';
import { findIndex, orderBy } from 'lodash';
import { PhaseInnerProps } from '../../components/PhaseLane/PhaseLane';
import PhaseLane from '../PhaseLane/PhaseLane';
import { DragDropContext, Droppable, DroppableProvided, DraggingStyle, DropResult, NotDraggingStyle } from 'react-beautiful-dnd';
import { useDispatch } from 'dva';
import PhaseLaneModal from '../PhaseLane/PhaseLaneModal';

interface Props {
    pipe_id: ID;
    phases: PhaseInterface[];
    toggleModal: Function ;   
}

interface InnerPhase {
    index: number,
    id: ID,
}


const getPhaseProps = (phase: PhaseInterface, phases: Array<PhaseInterface>): PhaseInnerProps => {

    const phaseIndex = findIndex(phases, { id: phase.id })
    let previousPhase: InnerPhase | undefined, nextPhase: InnerPhase | undefined = undefined
    // Verifica se não é o primeira fase
    if (phase.order !== 1) {
        //Acha o index da fase anterior e salva no objeto
        const previousPhaseIndex = findIndex(phases, { order: phase.order - 1 })
        previousPhase = {
            index: previousPhaseIndex,
            id: phases[previousPhaseIndex].id
        }
    }
    const phaseInfo = {
        index: phaseIndex,
        id: phases[phaseIndex].id
    }
    // Verifica se não é a ultima fase
    if (phase.order !== (phases.length)) {
        const nextPhaseIndex = findIndex(phases, { order: phase.order + 1 })
        nextPhase = {
            index: nextPhaseIndex,
            id: phases[nextPhaseIndex].id
        }
    }
    //Retorna o objeto de identificação
    return {
        previousPhase,
        phaseInfo,
        nextPhase,
    }
}

const renderPhases = (phases: PhaseInterface[], toggleModal: Function, pipe_id: ID, setVisibility: Function): React.ReactChild[] => orderBy(phases, 'order').map((phase, index) => {
    const phaseProps = getPhaseProps(phase, phases)
    return (            
        <Droppable droppableId={phase.id}>
            {(provided:DroppableProvided) => (
                <PhaseLane
                    passingRef={provided.innerRef}
                    getItemStyle={getItemStyle}
                    key={index}
                    setVisibility={setVisibility}
                    pipe_id={pipe_id}
                    order={phase.order}
                    cards={phase.cards || []}
                    is_final={phase.is_final}
                    toggleModal={toggleModal}
                    {...phaseProps}
                /> 
            )}
        </Droppable>        
    )
})

const getItemStyle = (isDragging:boolean, draggableStyle:DraggingStyle| NotDraggingStyle | undefined) => ({ 
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '',
    paddingTop: 16,
    // styles we need to apply on draggables
    ...draggableStyle
});

const PipeContainer = (props:Props) => {

    const dispatch = useDispatch();
    const getList = (id:ID):CardInterface[] => {
        return props.phases[findIndex(props.phases,{id: id})].cards || []
    };

    const [isVisible, setVisibility] = useState(false)
    const onDragEnd = (result:DropResult) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            /*const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }
            
            this.setState(state);*/
            return;
        } else {
            const card = getList(source.droppableId)[source.index]
            if(card){
                dispatch({
                    type: 'pipes/cardMove',
                    payload: {//change
                        path_id: [card.id, destination.droppableId],
                        card: card,
                        oldPhase: source,
                        newPhase: destination,
                    }
                })
            }
            
        }
    };
    let ref
    const { phases, toggleModal, pipe_id } = props
    return (
        <>
            <h1>Identificador do pipe: {pipe_id}</h1>
            <ul className={styles.pipeContainer}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {renderPhases(phases, toggleModal, pipe_id, setVisibility)}                        
                </DragDropContext>                
            </ul>
            <div ref={(r) => ref = r} style={{
                position: 'relative',height: '100%'}}>
                <PhaseLaneModal ref={ref} isVisible={isVisible} pipe_id={pipe_id} setVisibility={setVisibility} />
            </div>
        </>

    );    
}

export default PipeContainer
