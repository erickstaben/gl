import React, { useEffect, useState } from 'react';
import CardModalStructure from './CardModalStructure';
import styles from './CardModal.less';
import { Icon } from 'antd';
import { useSelector } from 'dva';
import moment from 'moment';
import {getFirstLetters} from '@/utils/utils'
import EmptyDiv from '../EmptyDiv/EmptyDiv';
import { CardEmailInterface, CardEventInterface } from '@/models/database';
import RenderFields from '../RenderField/RenderField';
import { findIndex } from 'lodash';

interface Props {
    isVisible: boolean;
    toggleModal: (a: boolean) => void;
}

const CardModal = (props:Props) => {
    const card = useSelector(state => state.cards.loaded) || {}
    const { company, phase, assigned_users, due_date, card_emails,history = [],fields } = card
    const { phase_fields = [] } = phase ? phase : []
    const leftBodyContent = (
        <div>
            <div className={styles.actionLabelsContainer}>
                {assigned_users && <div className={styles.actionLabel}>
                    <label className={styles.label}>Responsáveis</label>
                    <div style={{display: 'flex',padding: '4px 0'}}>
                    {assigned_users.map(user => <span>
                        <div className={styles.userAvatar}>
                            <span>{getFirstLetters(user.name)}</span>
                        </div>                        
                    </span>)}
                    <div style={{display: 'flex',alignItems: 'center'}}>
                        <div className={styles.userMore}>
                            +
                        </div>
                    </div>
                    </div>
                </div>}
                {due_date && <div className={styles.actionLabel}>
                    <label className={styles.label}>Vencimento:</label>
                    <div className={styles.dateContainer}>
                        <span className={styles.dateBagde}>{moment(due_date).format('D MMM')}</span>
                        <span className={styles.label}>{moment(due_date).fromNow()}</span>
                    </div>
                </div>}
            </div>
            <div className={styles.internalCard}>
                <label className={styles.label}>Emails</label>
                {card_emails ? card_emails.length > 0 ? <div className={styles.emailContainer}>
                    {card_emails.map((email:CardEmailInterface) => <div>{email.content}</div>)}    
                </div> : <EmptyDiv text={'Nenhum email encontrado'} icon={'mail'}/>: null }                    
                <div>
                    <label className={styles.label}>Histórico</label>
                    {history.length > 0 ? history.map((event:CardEventInterface) => <div className={styles.historyContainer}>
                        <span className={styles.historyIcon}>
                            <Icon type='arrow-up'/>
                        </span>
                        <div>
                            <p><b>{event.agent + ' '}</b>{event.description}<b>{' ' +event.subject}</b></p>
                            <span>{moment(event.created_at).fromNow()}</span>
                        </div>                        
                    </div>) : <EmptyDiv text={'Nenhum email encontrado'} icon={'email'} />}
                </div>
            </div>
        </div>
    )

    const rightBodyContent = <div>
        <div className={styles.rightBodyContentContainer}>
            <div className={styles.fieldsContainer}>
                {phase_fields.map(field => {
                    const index = findIndex(fields,{id: field.id})
                    const value = index >= 0 ? fields[index].pivot.value : null
                    return <RenderFields field={field} fieldValue={value} card_id={card.id}/>                   
                })}
            </div>
        </div>
    </div>

    return (
        <div>
            <CardModalStructure {...props} 
                leftBodyContent={leftBodyContent} 
                rightBodyContent={rightBodyContent} 
                cardTitle={card.title} 
                company={company} 
                phase={phase}
            />
        </div>
    )
}
export default CardModal;