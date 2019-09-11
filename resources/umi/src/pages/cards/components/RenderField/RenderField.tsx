

import styles from './RenderField.less';
import React, { useState, ReactElement } from 'react';
import { PhaseFieldInterface, ID } from '@/models/database';
import { useDispatch, useSelector } from 'dva';
import { Spin } from 'antd';

type FieldValues = string | undefined;
interface Props {
    field: PhaseFieldInterface,
    fieldValue: FieldValues,
    card_id: ID
}
const RenderFields = (props:Props):void|ReactElement => {
    const dispatch = useDispatch()

    const {field,fieldValue,card_id} = props

    const [value,setValue] = useState()

    const handleOnChange = (e:any) =>{
        setValue(e.target.value)
    }

    const onSave = (value: string) => {
        dispatch({
            type: 'cards/updateFieldValue',
            payload: {
                path_id: [card_id, field.id],
                body: { value },
            }
        })
    }

    const updatingField = useSelector((state:any) => state.loading.effects['cards/updateFieldValue'])

    let inputRef: null | HTMLInputElement

    const [isEditing,toggleEditing] = useState(false)

    const handleEditStart = (e:any,b:boolean) => {
        e.stopPropagation();
        !isEditing && inputRef ? inputRef.focus() : null
        toggleEditing(b)
        console.log(b,'oi')
    }
    

    const switchType = () => {
        switch (field.field_type) {
            case 'input':
                return <div onClick={(e) => handleEditStart(e,true)} className={styles.inputContainer}>
                    <label className={styles.label}>{field.label}:</label>
                    <input
                        value={value}
                        onChange={handleOnChange}
                        ref={(ip) => inputRef = ip}
                        className={styles.input}
                        defaultValue={fieldValue}
                    />
                    {isEditing && <div className={styles.actionContainer}>
                        <div onClick={(e) => handleEditStart(e,false)} className={styles.actionButton}>
                            <span>Cancelar</span>
                        </div>
                        <div onClick={(e) => onSave(value)} className={styles.actionButton}>
                            <span>{updatingField && <Spin style={{color: 'white'}} />}Salvar</span>
                        </div>
                    </div>}
                </div>
            default:
                return <div>Tipo de campo não encontrado. Entrar em contato com suporte</div>
        }
    }
    
    return switchType()
}
export default RenderFields