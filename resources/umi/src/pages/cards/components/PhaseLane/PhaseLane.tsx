
import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './PhaseLane.less';
import SpanEdit from '@/components/SpanEdit';
import { ID, CardInterface } from '@/models/database';
import { EndCard, ActionCard } from '@/pages/cards/components'
import { useSelector, shallowEqual, useDispatch } from 'dva';
import { findIndex } from 'lodash';
import PhaseLaneModal from './PhaseLaneModal';
import { Icon, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

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
    toggleModal: (a:boolean) => void;
} & PhaseInnerProps;


const compareArray = (left:Array<any>,right:Array<any>) => {
    if(left.length !== right.length){
        return true
    }
    return false
}

const PhaseLane = (props:Props):React.ReactElement => {
    const { previousPhase, nextPhase, phaseInfo, is_final, toggleModal } = props
    const phaseProps = {
        previousPhase,
        phaseInfo,
        nextPhase,
    }
    const [isVisible,setVisibility] = useState(false)
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
    const cards = useSelector((state:any) => state.pipes.loaded.phases[findIndex(state.pipes.loaded.phases,{id: phaseInfo.id})].cards, compareArray)
    const phases = useSelector((state:any) => state.pipes.loaded.phases)
    console.log(phaseInfo,is_final)
    return ( <>
        <li className={styles.phaseContent}>
            <header className={styles.phaseHeader}>
                <SpanEdit dispatch={{ name: `pipes.loaded.phases[${findIndex(phases,{id: phaseInfo.id})}].name`, type: 'pipes/phaseNameUpdate', id: phaseInfo.id }}/>
                <Dropdown overlay={getDropOverlay()}>
                    <span className={styles.phaseHeaderIcon}><Icon type='more'/></span>
                </Dropdown>
            </header>
            <div className={classnames(styles.phaseLane, styles.scrollBar)}>
            {is_final ? 
            cards ? cards.map((card, cardIndex) => (
                <EndCard {...phaseProps} toggleModal={toggleModal} card={card}/>
            )) : null
                : 
            cards ? cards.map((card, cardIndex) => (
                <ActionCard {...phaseProps} toggleModal={toggleModal} card={card}/>
            )) : null }
            </div>
        </li>
        {isVisible && <PhaseLaneModal setVisibility={setVisibility}/>}
        </>
    );
}

export default PhaseLane
