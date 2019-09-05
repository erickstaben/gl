import React, { useEffect } from 'react';
import CardModalStructure from './CardModalStructure';
import styles from './CardModal.less';
import { Icon } from 'antd';
import { useSelector } from 'dva';
import moment from 'moment';
import {getFirstLetters} from '@/utils/utils'

interface Props {
    isVisible: boolean;
    toggleModal: (a: boolean) => void;
}

const CardModal = (props:Props) => {
    const card = useSelector(state => state.cards.loaded) || {}
    const { company, phase, assigned_users, due_date, card_emails,history = [] } = card
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
                    {card_emails.map(email => <div>{email.content}</div>)}    
                </div> : <div className={styles.emptyDiv}>Nenhum email registrado</div>: null }                    
                <div>
                    <label className={styles.label}>Histórico</label>
                    {history.length > 0 ? history.map(event => <div className={styles.historyContainer}>
                        <span className={styles.historyIcon}>
                            <Icon type='arrow-up'/>
                        </span>
                        <div>
                            <p><b>{event.title}{" "}</b>{event.description}</p>
                            <span>{moment(event.created_at).fromNow()}</span>
                        </div>                        
                    </div>) : <div className={styles.emptyDiv}>Nada no histórico</div>}
                </div>
            </div>
        </div>
    )

    const rightBodyContent = <div>
        <div className={styles.actionLabelsContainer}>
            <div>

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