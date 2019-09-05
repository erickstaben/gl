import React, { useState } from 'react'
import styles from './FormListPreview.less';
import { Icon } from 'antd';
import { isFulfilled } from 'q';

interface Props {
    setValue: (fieldName: string, index: number) => void
    setError: (fieldName: string, index: number) => void
}

const FormListPreview = (props:Props) => {
    const [fields, setFields] = useState([{ field_type: 'select', label: 'Campo número 1', field_options: ['a','b'] }, { field_type: 'input', label: 'Campo número 2' }])    
    const [label, setLabel] = useState()
    const [field_type, setFieldType] = useState()
    const [field_options, setFieldOptions] = useState()
    const deleteField = (index: number): void => {
        const fieldsClone = fields
        fieldsClone.splice(index, 1)
        setFields([...fieldsClone])
    } 
    const addField = (e) => {
        e.preventDefault();
        setFields([...fields, { field_type, label,field_options: field_options ? field_options.split(',') : null}])
    }
    console.log(fields)
    return (
        <div>
            <label>Campos dessa fase:</label>
            <div className={styles.formListContainer}>
                {fields.map((field,index) => {
                    switch (field.field_type) {
                        case 'input':
                            return <div className={styles.previewContainer}>
                                <div className={styles.inputContainer}>
                                    <label>{field.label}</label>
                                    <div><input disabled /></div>
                                </div>
                                <Icon type='delete' onClick={() => deleteField(index)}/>
                            </div>
                        case 'select':
                            return <div className={styles.previewContainer}>
                                <div className={styles.inputContainer}>
                                    <label>{field.label}</label>
                                    <div>
                                        <select value={field_type} onSelect={(e) => setFieldType(e)}>
                                        {field.field_options && field.field_options.map(option => <option value={option}>
                                            {option}
                                        </option>)}
                                        </select>
                                    </div>
                                </div>
                                <Icon type='delete' onClick={() => deleteField(index)} />
                            </div>
                        default:
                            return
                    }
                })}
            </div>
            <div>
                <label>Nome do campo:</label>
                <input value={label} onChange={(e) => setLabel(e.target.value)}/> 
                <label>Tipo de campo:</label>   
                <select id="lang" defaultValue='input' value={field_type} onChange={(e) => setFieldType(e.target.value)}>
                    <option value='select'>
                        Lista de seleção
                    </option>
                    <option value='input'>
                        Campo de digitação pequeno
                    </option>
                </select>
                <label>Opções: (separadas por virgula)</label>
                <input value={field_options} onChange={(e) => setFieldOptions(e.target.value)}/>
                <button onClick={addField}>Adicionar campo</button>
            </div>            
        </div>
    )
}

export default FormListPreview