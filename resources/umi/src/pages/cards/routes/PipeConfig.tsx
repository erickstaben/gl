import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'dva';
import { Row, Col, Table,Tabs, Popconfirm ,Divider,Modal, Spin } from 'antd';
import styles from './PipeConfig.less'
import useForm from 'react-hook-form';

const {TabPane} = Tabs
const PipeConfig = (props:any) => {
    
      
    const cardsColumns = [{
        title: 'Pipe',
        dataIndex: 'pipe.name',
        key: 'pipe.id',
    },{
        title: 'Empresa',
        dataIndex: 'company.name',
        key: 'company.id',
    },{
        title: 'Responsável',
        dataIndex: 'user.name',
        key: 'user.id',
    },{
        title: 'Dia de vencimento',
        dataIndex: 'due_date',
        key: 'due_date',
    },{
        title: 'Ações',
        dataIndex: 'operation',
        render: (text, record) =>
        <span>
            <a onClick={() => openCardModal(record.id)}>Editar</a>
            <Divider type='vertical'/>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteCard(record.id)}>
                <a>Delete</a>
            </Popconfirm>
        </span>,
    }];

    const usersColumns = [{
        title: 'Usuário',
        dataIndex: 'name',
        key: 'id',
    },{
        title: 'Favorito',
        dataIndex: 'pivot.is_favorite',
        key: 'pivot.is_favorite',
    },{
        title: 'Ações',
        dataIndex: 'operation',
        render: (text, record) =>
        <span>
            <a onClick={() => openUserModal(record.id)}>Editar</a>
            <Divider type='vertical'/>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteUser(record.id)}>
                <a>Delete</a>
            </Popconfirm>
        </span>,
    }];


    const { id } = props.match.params
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'pipes/pipeShow',
            payload: {
                path_id: [id],
                params: {
                    load: ['recurrentCards','users'],
                }
            },
        })
    }, [id])

    const handleDeleteUser = (key:number) => {
        dispatch({
            type: 'pipes/deleteUser',
            payload: {
                path_id: [id,key],
            },
        })
        dispatch({
            type: 'pipes/pipeShow',
            payload: {
                path_id: [id],
                params: {
                    load: ['recurrentCards','users'],
                }
            },
        })
    }

    const handleDeleteCard = (key:number) => {
        dispatch({
            type: 'pipes/deleteRecurrentCard',
            payload: {
                path_id: [id,key],
            },
        })
        dispatch({
            type: 'pipes/pipeShow',
            payload: {
                path_id: [id],
                params: {
                    load: ['recurrentCards','users'],
                }
            },
        })
    }

    const openCardModal = (key) => {
        dispatch({
            type: 'users/index',
            payload: {},
        })
        dispatch({
            type: 'companies/index',
            payload: {},
        })
        const recurrentCard = recurrentCards.filter(card => card.id == key)[0]
        setCardModalVisible(true)
        setRecurrentCard(recurrentCard)
    }
    const openUserModal = (key) => {
        dispatch({
            type: 'users/index',
            payload: {},
        })
        const user = users.filter(user => user.id == key)[0]
        setUserModalVisible(true)
        setUser(user)
    }


    const allUsers = useSelector((state:any) => state.users.list)
    const allCompanies = useSelector((state:any) => state.companies.list)


    const recurrentCards = useSelector((state:any) => state.pipes.loaded.recurrent_cards)
    const users = useSelector((state:any) => state.pipes.loaded.users)
    const { register, handleSubmit, errors, setValue, setError, reset } = useForm();
    const [recurrentCard,setRecurrentCard] = useState({})
    const [user,setUser] = useState({})
    const [userModalVisible,setUserModalVisible] = useState(false)    
    const [cardModalVisible,setCardModalVisible] = useState(false)
    useEffect(() => {
        register({ name: "phaseFields" })
        register({ name: "is_final" })
    },[])
    const saving = useSelector(state => state.loading.effects['pipes/saveRecurrentCard'])

    const handleRecurrentCardSubmit  = (data) => {
        const newData = {
            ...data,
            id: recurrentCard.id || null
        }
        dispatch({
            type: 'pipes/saveRecurrentCard',
            payload: {
                path_id: [id],
                body: newData,
            }
        })
        setCardModalVisible(false)
    }
    const handlePipeUserSubmit  = (data) => {
        const newData = {
            ...data,
            id: user.id || null
        }
        dispatch({
            type: 'pipes/savePipeUser',
            payload: {
                path_id: [id],
                body: newData,
            }
        })
        setUserModalVisible(false)
    }
    console.log(saving,recurrentCard)
    return (
        <Row>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Cards recorrentes" key="1">
                    <Table dataSource={recurrentCards} columns={cardsColumns} />
                </TabPane>
                <TabPane tab="Usuários" key="2">
                    <Table dataSource={users} columns={usersColumns} />
                </TabPane>
            </Tabs>
            {cardModalVisible && <Modal onCancel={() => setCardModalVisible(false)} footer={null} visible={cardModalVisible}>
                <Spin spinning={!recurrentCard || saving || false}>
                    {recurrentCard.company && <form onSubmit={handleSubmit(handleRecurrentCardSubmit)}>
                        <Row>
                            <div className={styles.formInput}>
                                <label>Selecione uma empresa:</label>
                                <select defaultValue={recurrentCard.company.id} name='company_id' ref={register}>
                                    {allCompanies ? allCompanies.map(company => <option key={company.id} value={company.id}>{company.name}</option>): 'Carregando...'}
                                </select>
                            </div>
                        </Row>
                        <Row>
                            <div className={styles.formInput}>
                                <label>Selecione um usuário:</label>
                                <select defaultValue={recurrentCard.user.id} name='user_id' ref={register}>
                                    {allUsers ? allUsers.map(user => <option key={user.id} value={user.id}>{user.name}</option>): 'Carregando...'}
                                </select>
                            </div>
                        </Row>
                        <Row>
                            <div className={styles.formInput}>
                                <label>Dia limite do mês:</label>
                                <input defaultValue={recurrentCard.due_date} name='due_date' ref={register}/>
                            </div>
                        </Row>
                        <Row>
                            <button type='submit' className={styles.saveButton}>Salvar</button>
                        </Row>
                    </form>}
                </Spin>
            </Modal>}
            {userModalVisible && <Modal onCancel={() => setUserModalVisible(false)} footer={null} visible={userModalVisible}>
                <Spin spinning={!user || saving || false}>
                    {user.id && <form onSubmit={handleSubmit(handlePipeUserSubmit)}>                        
                        <Row>
                            <div className={styles.formInput}>
                                <label>Selecione um usuário:</label>
                                <select defaultValue={user.id} name='user_id' ref={register}>
                                    {allUsers ? allUsers.map(user => <option key={user.id} value={user.id}>{user.name}</option>): 'Carregando...'}
                                </select>
                            </div>
                        </Row>
                        <Row>
                            <button type='submit' className={styles.saveButton}>Salvar</button>
                        </Row>
                    </form>}
                </Spin>
            </Modal>}
        </Row>
    )
}
        

export default PipeConfig
