
import React from 'react';
import classnames from 'classnames';
import { Dropdown, Icon, Menu, List, Checkbox } from 'antd';
import moment from 'moment';
import { useDispatch } from 'dva';
import styles from './EndCard.less';
import { CardInterface, ID, PhaseFieldInterface } from '@/models/database';
import SpanText from '@/components/SpanText';
import ProgressBar, { uncompleted } from '../ProgressBar/ProgressBar'
import { getFirstLetters } from '@/utils/utils';
import { PhaseInnerProps } from '../PhaseLane/PhaseLane';


type Props = {
    card: CardInterface,
    toggleModal: Function,
} & PhaseInnerProps;

const EndCard = (props:Props):React.ReactElement => {
    const { card, toggleModal } = props
    const { due_date, assigned_users, company, fields, id } = card

    return (
        <div className={styles.card} >
            <span style={{ height: '100%', width: '80%' }} onClick={() => alert('oi')}></span>
            <div className={styles.cardHeader}>
                <span className={styles.moveArrow}>
                    <Dropdown trigger={['click']} overlay={getArrowDropDown(id)}>
                        <Icon type="arrow-left" />
                    </Dropdown>
                </span>
                <div className={styles.title}>
                    <SpanText text={company ? company.name : 'Sem nome'} className={styles.cardName}/>
                    <SpanText text={company ? company.cnpj : 'CNPJ sem cadastro'} className={styles.cardCNPJ}/>
                </div>
                <Dropdown className={styles.progressBar} overlay={getMoreDropDown(toggleModal, id)} trigger={['click']}>
                    <span className={styles.showMore}>
                        <Icon type="more" />
                    </span>
                </Dropdown>
            </div>
        </div>
    );
}

const getMoreDropDown = (toggleModal:Function, card_id:ID) => {
    const showModal = () => toggleModal(true)
    const dispatch = useDispatch()
    const deleteCard = () => {
        dispatch({ type: 'cards/delete',
payload: {
            path_id: [card_id],
        } })
    }
    const menu = <Menu>
        <Menu.Item onClick={showModal}>
            <Icon type="edit"/>
            <b>Ver detalhes</b>
        </Menu.Item>
        <Menu.Item onClick={deleteCard}>
            <Icon type="delete"/>
            Excluir atividade
        </Menu.Item>
    </Menu>
    return menu
}


const getArrowDropDown = (card_id:ID) => {
    const dispatch = useDispatch()
    const moveToPreviousPhase = () => {
        dispatch({ type: 'cards/movePrevious',
payload: {
            path_id: [card_id],
        } })
    }
    const moveToFirstPhase = () => {
        dispatch({ type: 'cards/moveFirst',
payload: {
            path_id: [card_id],
        } })
    }
    const menu = <Menu>
        <Menu.Item onClick={moveToPreviousPhase}>
            <b>Mover para fase anterior</b>
        </Menu.Item>
        <Menu.Item onClick={moveToFirstPhase}>
            Mover para a fase inicial
        </Menu.Item>
    </Menu>
    return menu
}


export default EndCard
