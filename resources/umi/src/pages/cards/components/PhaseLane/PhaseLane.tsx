
import React, { useState, RefObject } from 'react';
import classnames from 'classnames';
import styles from './PhaseLane.less';
import SpanEdit from '@/components/SpanEdit';
import { ID, CardInterface } from '@/models/database';
import { EndCard, ActionCard } from '@/pages/cards/components'
import { useSelector, useDispatch } from 'dva';
import { findIndex } from 'lodash';
import { Icon, Menu, Dropdown, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Draggable, DraggableProvided, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd'

interface InnerPhase {
    id: ID;
    index: number;
}
export interface PhaseInnerProps { 
    previousPhase?: InnerPhase;
    nextPhase?: InnerPhase;
    phaseInfo: InnerPhase;
}
type Props = {
    cards ?: CardInterface[];
    is_final: boolean;
    setVisibility: Function;
    pipe_id: ID;
    toggleModal: Function | any;
    passingRef: RefObject<HTMLLIElement>;
    getItemStyle: (isDragging:boolean,styleObject?:DraggingStyle | NotDraggingStyle) => object;
} & PhaseInnerProps;


const PhaseLane = (props:Props):React.ReactElement => {
    const { previousPhase, nextPhase, phaseInfo, is_final, toggleModal, cards, pipe_id, getItemStyle, passingRef, setVisibility } = props
    const phaseProps = {
        previousPhase,
        phaseInfo,
        nextPhase,
    }
    const [filter,setFilter] = useState('')
    const dispatch = useDispatch();
    const getDropOverlay = () => (
        <Menu>
            {previousPhase && 
                <Menu.Item onClick={() => dispatch({
                    type: 'phases/movePhase',
                    payload: {
                        path_id: [phaseInfo.id,previousPhase.id]
                    }
                })}>
                    <Icon type='arrow-left'/>Mover para esquerda
                </Menu.Item>
            }
            {nextPhase && 
                <Menu.Item onClick={() => dispatch({
                    type: 'phases/movePhase',
                    payload: {
                        path_id: [phaseInfo.id,nextPhase.id]
                    }
                })}>
                <Icon type='arrow-right'/>Mover para direita
                </Menu.Item>
            }
            <Menu.Item><Link to={`phases/${phaseInfo.id}/config`}>
                <Icon type='settings'/>Configurações dessa fase
            </Link></Menu.Item>
            <Menu.Item onClick={() => setVisibility(true)}>
                <Icon type="file-add" />
                <b>Criar nova fase</b>
            </Menu.Item>
        </Menu>
    ) 
    const filterCards = (cards,filter) => filter ? cards.filter(card => card.company ? card.company.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 : false) : cards
    const filteredCards = filterCards(cards,filter)
    const phases = useSelector((state:any) => state.pipes.loaded.phases)
    return ( <>
        
        <li ref={passingRef} className={styles.phaseContent}>
            <header className={styles.phaseHeader}>
                <SpanEdit dispatch={{ name: `pipes.loaded.phases[${findIndex(phases, { id: phaseInfo.id })}].name`, type: 'pipes/phaseNameUpdate', id: phaseInfo.id }} />
                <Dropdown overlay={getDropOverlay()}>
                    <span className={styles.phaseHeaderIcon}><Icon type='more' /></span>
                </Dropdown>                
            </header>
            <div className={styles.searchContainer}>
                <input onChange={(e) => setFilter(e.target.value)} className={styles.searchInput} placeholder='Digite algo para pesquisar'/>
                <Icon className={styles.searchIcon} type='search'/>
            </div>
            <div className={classnames(styles.phaseLane, styles.scrollBar)}>
                {is_final ?
                    filteredCards.length > 0 ? filteredCards.map((card, cardIndex) => (
                        <Draggable
                            key={card.id}
                            draggableId={card.id.toString()}
                            index={cardIndex}>
                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}>
                                    <EndCard {...phaseProps} toggleModal={toggleModal} card={card} />
                                </div>
                            )}
                        </Draggable>
        
                    )) : <div className={styles.noCards}>
                        {filter ? <span>Nada foi encontrado</span> : <span>Não há cards nessa fase</span>}
                    </div>
                    :
                    filteredCards.length > 0  ? filteredCards.map((card, cardIndex) => (
                        <Draggable
                            key={card.id}
                            draggableId={card.id.toString()}
                            index={cardIndex}>
                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}>
                                    <ActionCard {...phaseProps} toggleModal={toggleModal} card={card} />
                                </div>
                            )}
                        </Draggable>
                    )) : <div className={styles.noCards}>
                    {filter ? <span>Nada foi encontrado</span> : <span>Não há cards nessa fase</span>}
                    </div>}
            </div>
        </li>
        
        </>
    );
}

export default PhaseLane
