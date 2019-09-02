
import React from 'react';
import classnames from 'classnames';
import { Dropdown, Icon, Menu, List, Checkbox } from 'antd';
import moment from 'moment';
import { useDispatch } from 'dva';
import styles from './ActionCard.less';
import { CardInterface, ID, PhaseFieldInterface } from '@/models/database';
import SpanText from '@/components/SpanText';
import ProgressBar, { uncompleted } from '../ProgressBar/ProgressBar'
import { getFirstLetters } from '@/utils/utils';
import { PhaseInnerProps } from '@/pages/cards/components/PhaseLane/PhaseLane';

type Props = {
    card: CardInterface,
    toggleModal: Function,
} & PhaseInnerProps

const ActionCard = (props:Props):React.ReactElement => {
    const { card, toggleModal, phaseInfo, nextPhase, previousPhase } = props
    const { due_date, assigned_users, company, fields, id } = card
    const dispatch = useDispatch()
    
    const getArrowDropDown = () => {
        const moveToNextPhase = () => {
            dispatch({
                type: 'pipes/cardMove',
                payload: {
                    path_id: [card.id,nextPhase ? nextPhase.id : null],
                    card: card,
                    oldPhase: phaseInfo,
                    newPhase: nextPhase,
                }
            })
        }
        const moveToLastPhase = () => {
            dispatch({
                type: 'pipes/cardMove',
                payload: {
                    path_id: [card.id,'last'],
                    card: card,
                    oldPhase: phaseInfo,
                    newPhase: nextPhase,
                }
            })
        }
        const menu = <Menu>
            <Menu.Item onClick={moveToNextPhase}>
                <b>Mover para próxima fase</b>
            </Menu.Item>
            <Menu.Item onClick={moveToLastPhase}>
                Mover para fase final
        </Menu.Item>
        </Menu>
        return menu
    }

    return (
        <div className={styles.card} >
            <span style={{ height: '100%', width: '80%' }} onClick={() => alert('oi')}></span>
            <div className={styles.cardHeader}>
                <div className={styles.title}>
                    <SpanText text={company ? company.name : 'Sem nome'} className={styles.cardName}/>
                    <SpanText text={company ? company.cnpj : 'CNPJ sem cadastro'} className={styles.cardCNPJ}/>
                </div>
                <ProgressBar className={styles.progressBar} fields={fields}/>
                <Dropdown className={styles.progressBar} overlay={getMoreDropDown(toggleModal, id)} trigger={['click']}>
                    <span className={styles.showMore}>
                        <Icon type="more" />
                    </span>
                </Dropdown>
            </div>
            <div className={styles.cardActions}>
                <span className={styles.calendarShow}>
                    <Icon className={styles.icon} type="calendar"/>
                    <span>{moment(due_date).format('D MMM')}</span>
                </span>
                <span className={classnames(styles.calendarShow, styles.membersShow)}>
                    <Icon className={styles.icon} type="user" />
                    <span>{getFirstLetters(assigned_users ? assigned_users[0] ? assigned_users[0].name : '' : '')}</span>
                </span>
                <span className={styles.checkListShow}>
                    <Dropdown overlay={getProgressDropDown(fields || [])}>
                        <span className={styles.checkListShowCircle}>{uncompleted(fields)}</span>
                    </Dropdown>
                </span>
                <span className={styles.moveArrow}>
                    <Dropdown trigger={['click']} overlay={getArrowDropDown()}>
                        <Icon type="arrow-right" />
                    </Dropdown>
                </span>
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

const getProgressDropDown = (fields:PhaseFieldInterface[]) => {
    const menu = <List>
        {fields.map(field => (
            <List.Item>
                <Checkbox style={{ marginLeft: 8 }} checked={!!field.pivot.value}>{field.label}</Checkbox>
            </List.Item>
        ))}
    </List>
    return menu
}




export default ActionCard
