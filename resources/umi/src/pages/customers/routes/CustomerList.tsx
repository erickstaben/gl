import React, { useState, useEffect } from 'react'
import styles from './CustomerList.less';
import { Divider, Popconfirm, Table, Modal, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'dva';
import useForm from 'react-hook-form';

interface Props {

}
const CustomerList = (props:Props) => { 
    const columns = [{
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'CNPJ',
        dataIndex: 'cnpj',
        key: 'cnpj',
    }, {
        title: 'Email para contato',
        dataIndex: 'contact_email',
        key: 'contact_email',
    }, {
        title: 'Ações',
        dataIndex: 'operation',
        render: (text, record) =>
            <span>
                <a onClick={() => openModal(record.id)}>Editar</a>
                <Divider type='vertical' />
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <a>Delete</a>
                </Popconfirm>
            </span>,
    }];
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'companies/index',
            payload: {},
        })
    }, [])

    const [isVisible,setVisible] = useState(false)
    const [loadedInfo, setLoaded] = useState(null)
    const [editingId, setEditingId] = useState(null)

    const handleDelete = (id:number) => {
        dispatch({
            type: 'companies/delete',
            payload: {
                path_id: [id],
            }
        })
    }

    const openModal = (id:number|null= null) => {
        if(id){
            setLoaded(companies.filter(company => company.id == id)[0])
            setVisible(true)
            setEditingId(id)
        }
        else{
            setVisible(true)
            setLoaded({})
            setEditingId(null)
        }
    }
    const closeModal = () => {
        setLoaded(null)
        setVisible(false)
    }
    
    const companies = useSelector((state:any) => state.companies.list)
    const saving = useSelector((state: any) => state.loading.effects['companies/store'])
    const saveChanges = (data) => {
        dispatch({
            type: 'companies/store',
            payload: {
                body: {
                    ...data,
                    id: editingId,
                }
            }
        })
        setVisible(false)
    }
    const { register, handleSubmit, errors, setValue, setError, reset } = useForm();
    return(    
        <div className={styles.mainDiv}>
            <div className={styles.formInput} style={{marginBottom: 8}}>
                <button onClick={() => openModal()}>Adicionar nova empresa</button>
            </div>
            <Table size="middle" dataSource={companies} columns={columns} />
            <Modal title={'Informações da empresa'} footer={null} onCancel={() => closeModal()} visible={isVisible}>
                {loadedInfo && <Spin spinning={saving || false} >
                    <form onSubmit={handleSubmit(saveChanges)}>
                        <Row>
                            <div className={styles.formInput}>
                                <label>Nome da empresa:</label>
                                <input name='name' ref={register} defaultValue={loadedInfo.name}/>
                            </div>
                            <div className={styles.formInput}>
                                <label>CNPJ:</label>
                                <input name='cnpj' ref={register} defaultValue={loadedInfo.cnpj} />
                            </div>
                            <div className={styles.formInput}>
                                <label>Email para contato:</label>
                                <input name='contact_email' ref={register} defaultValue={loadedInfo.contact_email} />
                            </div>
                        </Row>
                        <div className={styles.formInput}>
                            <button type='submit' className={styles.saveButton}>Salvar</button>
                        </div>
                    </form>
                </Spin>}
            </Modal>
        </div>
    )
}
export default CustomerList
