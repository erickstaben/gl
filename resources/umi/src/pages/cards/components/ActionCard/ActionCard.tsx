
import React from 'react';
import classnames from 'classnames';
import { Dropdown, Icon, Menu, List, Checkbox, Spin } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'dva';
import styles from './ActionCard.less';
import { CardInterface, ID, PhaseFieldInterface } from '@/models/database';
import SpanText from '@/components/SpanText';
import ProgressBar, { uncompleted } from '../ProgressBar/ProgressBar'
import { getFirstLetters } from '@/utils/utils';
import { PhaseInnerProps } from '@/pages/cards/components/PhaseLane/PhaseLane';
import { ConnectState } from '@/models/connect';

type Props = {
    card: CardInterface,
    toggleModal: (a:boolean) => void,
} & PhaseInnerProps

const ActionCard = (props:Props):React.ReactElement => {
    const { card, toggleModal, phaseInfo, nextPhase, previousPhase } = props
    const { due_date, assigned_users = [], company, fields, id } = card
    const dispatch = useDispatch()
    
    const getArrowDropDown = () => {
        const moveToPreviousPhase = () => {
            dispatch({
                type: 'pipes/cardMove',
                payload: {
                    path_id: [card.id,previousPhase ? previousPhase.id : null],
                    card: card,
                    oldPhase: phaseInfo,
                    newPhase: previousPhase,
                }
            })
        }
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
            <Menu.Item onClick={moveToPreviousPhase}>
                Mover para fase anterior
            </Menu.Item>
            <Menu.Item onClick={moveToNextPhase}>
                <b>Mover para próxima fase</b>
            </Menu.Item>
            <Menu.Item onClick={moveToLastPhase}>
                Mover para fase final
        </Menu.Item>
        </Menu>
        return menu
    }
    const openCardModal = (id:ID) => {
        dispatch({
            type: 'cards/show',
            payload: {
                path_id: [id]                
            }
        })
        toggleModal(true)
    }

    const deleteCard = () => {
        dispatch({
            type: 'cards/delete',
            payload: {
                path_id: [card.id],
            }
        })
    }

    const isLoading = () => card.id === useSelector((state:ConnectState) => state.pipes.loadingCardId)

    return (
        <div className={styles.card} onClick={() => openCardModal(card.id)}>
            <Spin spinning={isLoading()}>
            <span style={{ height: '100%', width: '80%' }} onClick={() => alert('oi')}></span>
            <div className={styles.cardHeader}>
                <div className={styles.title}>
                    <SpanText text={company ? company.name : 'Sem nome'} className={styles.cardName}/>
                    <SpanText text={company ? company.cnpj : 'CNPJ sem cadastro'} className={styles.cardCNPJ}/>
                </div>
                <ProgressBar className={styles.progressBar} fields={fields}/>                
            </div>
            <div className={styles.cardActions}>
                <span className={styles.calendarShow}>
                    <Icon className={styles.icon} type="calendar"/>
                    <span>{moment(due_date).format('D MMM')}</span>
                </span>
                {assigned_users.length > 0 ? <span className={classnames(styles.calendarShow, styles.membersShow)}>
                    <Icon className={styles.icon} type="user" />
                    <span>{getFirstLetters(assigned_users ? assigned_users[0] ? assigned_users[0].name : '' : '')}</span>
                </span> : undefined}
                <span className={styles.checkListShow}>
                    <Dropdown overlay={getProgressDropDown(fields || [])}>
                        <span className={styles.checkListShowCircle}>{uncompleted(fields)}</span>
                    </Dropdown>
                </span>
            </div>
            </Spin>
        </div>
    );
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
