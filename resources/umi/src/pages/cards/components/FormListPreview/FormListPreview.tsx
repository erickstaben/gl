import React, { useState, useEffect } from 'react'
import styles from './FormListPreview.less';
import { Icon, Checkbox, Tag } from 'antd';
import { isFulfilled } from 'q';
import { Row, Col } from 'antd';
import moment from 'moment';

interface Props {
    setValue: (fieldName: string, content: Object) => void
    setError: any;
    initialState: Array<object>;
}

const FormListPreview = (props:Props) => {
    const [fields, setFields] = useState(props.initialState || [])    
    const [label, setLabel] = useState()
    const [field_type, setFieldType] = useState()
    const [field_options, setFieldOptions] = useState()
    const [field_due_date, setFieldDueDate] = useState()
    const [field_postpone, setFieldPostpone] = useState(false)
    const deleteField = (index: number): void => {
        const fieldsClone = fields
        fieldsClone.splice(index, 1)
        setFields([...fieldsClone])
    } 
    useEffect(() => {
        props.setValue('phaseFields', props.initialState)
        props.initialState ? setFields(props.initialState) : null
    },[props.initialState])
    const addField = (e:any) => {
        e.preventDefault();
        const newFields = [
            ...fields,
            { 
                field_type,
                due_date: moment([(new Date()).getFullYear(), (new Date()).getMonth(), field_due_date]).format(),
                field_postpone,
                label,
                field_options: field_options ? field_options.split(',') : null
            }
        ]
        setFields(newFields)
        props.setValue('phaseFields',newFields)
    }
    console.log(fields,props.initialState)
    return (
        <div>
            <label className={styles.defaultLabel}>Campos dessa fase:</label>
            <Row gutter={16} className={styles.formListContainer}>
                <label style={{marginLeft: -8}}>Preview</label>
                {fields.map((field,index) => {
                    switch (field.field_type) {
                        case 'input':
                            return <div className={styles.previewContainer}>
                                <div className={styles.formInput}>
                                    <label>{field.label}</label>
                                    <input disabled />
                                </div>
                                <Icon type='delete' onClick={() => deleteField(index)}/>
                            </div>
                        case 'select':
                            return <div className={styles.previewContainer}>
                                <div className={styles.formInput}>
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
                        case 'checkbox':
                            return <div className={styles.previewContainer}>
                                    <Checkbox disabled={true}>{field.label}
                                        {field.due_date &&
                                        <Tag style={{ marginLeft: 8 }} color='blue'>{moment(field.due_date).format('D MMM')} - {moment(field.due_date).fromNow()}</Tag>
                                        }
                                    </Checkbox>
                                    <Icon type='delete' onClick={() => deleteField(index)} />
                            </div>
                        default:
                            return
                    }
                })}
            </Row>
            <Row gutter={16} className={styles.formContainer}>
                <Col xs={24} lg={12} className={styles.formInput}>
                    <label>Nome do campo:</label>
                    <input value={label} onChange={(e) => setLabel(e.target.value)}/> 
                </Col>
                <Col xs={24} lg={12}  className={styles.formInput}>
                    <label>Tipo de campo:</label>   
                    <select id="lang" defaultValue='input' value={field_type} onChange={(e) => setFieldType(e.target.value)}>
                        <option value='select'>
                            Lista de seleção
                        </option>
                        <option value='input'>
                            Campo de digitação pequeno
                        </option>
                        <option value='checkbox'>
                            Checkbox
                        </option>
                    </select>
                </Col>
                <Col xs={24} lg={24}  className={styles.formInput}>
                    <label>Opções: (separadas por virgula)</label>
                    <input value={field_options} onChange={(e) => setFieldOptions(e.target.value)}/>
                </Col>
                <Col xs={24} lg={24} className={styles.formInput}>
                    <label>Dia do mês limite para realização:</label>
                    <input value={field_due_date} onChange={(e) => setFieldDueDate(e.target.value)} />
                </Col>
                <Col xs={24} lg={24} className={styles.formInput}>
                    <Checkbox onChange={(e) => setFieldPostpone(e.target.checked)}>Prorroga?</Checkbox>
                </Col>
                <Col xs={24} lg={24}  className={styles.formInput}>
                    <button onClick={addField}>Adicionar campo</button>
                </Col>  
            </Row>
                      
        </div>
    )
}

export default FormListPreview