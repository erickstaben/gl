import React, { ReactElement } from 'react'
import { Modal } from 'antd';
import styles from './CardModalStructure.less';
import classnames from 'classnames';
import { PhaseInterface, CompanyInterface, CardInterface } from '@/models/database';

interface Props {
    isVisible: boolean;
    toggleModal: (a:boolean) => void;
    rightBodyContent: ReactElement;
    leftBodyContent: ReactElement;
    buttonText ?: string;
    phase: PhaseInterface;
    company: CompanyInterface;
    cardTitle: string;
}
const CardModalStructure = (props:Props) => {
    const { isVisible, toggleModal, cardTitle, company, phase, buttonText,leftBodyContent, rightBodyContent } = props 
    return (
        <Modal 
            wrapClassName={styles.modalWrap}
            bodyStyle={{display: 'inline-flex'}}
            onCancel={() => toggleModal(false)} 
            visible={isVisible}
            centered={true}
            closable={false}
            width={948}
            footer={null}
        >
            <div className={classnames(styles.leftSideModal,styles.modalDiv)}>
                
                <div className={styles.modalBodyContainer}>
                    <header>
                        <span className={styles.headerTitle}>{cardTitle || 'Sem título'}</span>
                        <span className={styles.headerDescription}>{company ? company.name: 'Sem company name'}</span>
                    </header>
                    <div className={styles.modalBody}>
                        {leftBodyContent || null}
                    </div>
                </div>

            </div>
            <div className={classnames(styles.rightSideModal, styles.modalDiv)}>
                <div className={styles.modalBodyContainer}>
                    <header>
                        <span className={styles.headerDescription}>A fase atual é</span>
                        <span className={styles.headerTitle}>{phase ? phase.name : 'Sem nome da fase'}</span>                        
                    </header>
                    <div className={styles.modalBody}>{rightBodyContent || null}</div>                    
                </div>
                <footer className={styles.modalFooter}><div>{buttonText || 'Próximo'}</div></footer>
            </div>
        </Modal>
    )
}

export default CardModalStructure