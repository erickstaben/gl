
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector, routerRedux } from 'dva';
import styles from './PipeCenter.less';
import { ConnectState } from '@/models/connect';
import { ID } from '@/models/database';
import { Modal, Spin, Row, Col,  Icon, Switch, Popconfirm } from 'antd';
import { router } from 'umi';


const PipeCenter = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'pipes/pipesOverview',
            payload: {},
        })
        dispatch({
            type: 'processes/index',
            payload: {},
        })
    }, [])
    const pipes = useSelector((state:ConnectState) => state.pipes.overview)
    const processes = useSelector((state:ConnectState) => state.processes.list)
    const setPipeFavorite = (pipe_id:ID) => {
        dispatch({
            type: 'pipes/pipeFavorite',
            payload: {
                path_id: [pipe_id],
            },
        })
    }
    const deletePipe = (id) => {
        dispatch({
            type: 'pipes/pipeDelete',
            payload: {
                path_id: [id]
            }
        })
        dispatch({
            type: 'pipes/pipesOverview',
            payload: {},
        })
    }
    const handleSubmit = () => {
        const data = {
            name: newPipeName,
        }
        dispatch({
            type: 'pipes/pipeCreate',
            payload: {
                body: data,
            }
        })
        dispatch({
            type: 'pipes/pipesOverview',
            payload: {},
        })
        setVisible(false)

    }
    const saving = useSelector((state:any) => state.loading.effects['pipes/pipeCreate'])
    const loading = useSelector((state:any) => state.loading.effects['pipes/pipeDelete'])
    const [newPipeName,setPipeName] = useState('')
    const [modalVisible,setVisible] = useState(false)
    return (<div className={styles.pipeCenterLayout}>
        <div style={{textAlign:'center'}}>
            <h2>Central de atividades</h2>
        </div>
        <h3>Meus pipes</h3>
        <div className={styles.containerDisplay}>
            {pipes ? pipes.map(pipe => 
                <div className={styles.pipeCard}>
                    <span className={styles.pipeFavoriteIcon} onClick={() => setPipeFavorite(pipe.id)}>
                        <Icon className={styles.favoriteIcon} theme={pipe.is_favorite ? 'filled' : 'outlined'} type="heart"/>
                    </span>
                    <Popconfirm onConfirm={() => deletePipe(pipe.id)} title={'Você tem certeza que deseja deletar esse pipe?'}>
                        <span className={styles.pipeDeleteIcon}>
                            <Icon className={styles.favoriteIcon} theme={'outlined'} type="delete"/>
                        </span>
                    </Popconfirm>
                    <Link className={styles.pipeLink} to={`./pipes/${pipe.id}`}>
                        <span className={styles.pipeCount}>
                            <div style={{ display: 'grid', textAlign: 'center' }}>
                            <span>
                                <b style={{ fontSize: 36 }}>{pipe.totalCards}</b><span className={styles.pipeCountLabel}>atividades</span>
                            </span>
                            <span className={styles.pipeName}>
                                {pipe.name}
                            </span>
                            </div>
                        </span>
                    </Link>
                </div>
            ) : null}
            <div className={styles.pipeCard} onClick={() => setVisible(true)}>
                <div className={styles.pipeLink}>
                    <span className={styles.pipeCount}>
                        <div style={{ display: 'grid' }}>
                            <span style={{textAlign: 'center'}}>
                                <Icon type={'plus'} style={{fontSize: 64}}/>
                            </span>
                            <span className={styles.pipeName}>
                                Adicionar novo pipe
                            </span>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <Modal
          title="Adicionar novo pipe"
          visible={modalVisible}
          onOk={handleSubmit}
          onCancel={() => setVisible(false)}
        >
            <Spin spinning={saving || loading || false} className={styles.configContainer}>
                <Row>
                    <div className={styles.formInput}>
                        <label>Nome do pipe:</label>
                        <input defaultValue={newPipeName} onChange={(e) => setPipeName(e.target.value)}/>
                    </div>
                </Row>
                <div>
                    <span>
                        O pipe será criado somente com uma fase vazia.
                    </span>
                </div>
            </Spin>
        </Modal>
        <h3>Meus processos</h3>
        <div className={styles.containerDisplay}>
            {processes ? processes.map(process => 
                <div className={styles.pipeCard}>
                    <Link className={styles.pipeLink} to={`./processes`}>
                        <span className={styles.pipeCount}>
                            <div style={{ display: 'grid', textAlign: 'center' }}>
                                <span>
                                    <b style={{ fontSize: 36 }}>{process.total_tasks}</b><span className={styles.pipeCountLabel}>tarefas</span>
                                </span>
                                <span>
                                    {process.total_tasks - process.completed_tasks} pendentes
                                </span>
                                <span className={styles.pipeName}>
                                    {process.name}
                                </span>
                            </div>
                        </span>
                    </Link>
                </div>
            ) : null}  
            <div className={styles.pipeCard} onClick={() => router.push('/processes/new/config')}>
                <div className={styles.pipeLink}>
                    <span className={styles.pipeCount}>
                        <div style={{ display: 'grid' }}>
                            <span style={{textAlign: 'center'}}>
                                <Icon type={'plus'} style={{fontSize: 64}}/>
                            </span>
                            <span className={styles.pipeName}>
                                Adicionar novo processo
                            </span>
                        </div>
                    </span>
                </div>
            </div>          
        </div>
        </div >
    );
}

export default PipeCenter
