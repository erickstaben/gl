
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import styles from './PipeCenter.less';
import { ConnectState } from '@/models/connect';
import { ID } from '@/models/database';


const PipeCenter = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'pipes/pipesOverview',
            payload: {},
        })
    }, [])
    const pipes = useSelector((state:ConnectState) => state.pipes.overview)
    const setPipeFavorite = (pipe_id:ID) => {
        dispatch({
            type: 'pipes/pipeFavorite',
            payload: {
                path_id: [pipe_id],
            },
        })
    }
    return (<div className={styles.pipeCenterLayout}>
        <div style={{textAlign:'center'}}>
            <h2>Central de pipes</h2>
        </div>
        <h3>Meus pipes</h3>
        <Row>
            {pipes ? pipes.map(pipe => <Col xs={6}>
                <div className={styles.pipeCard}>
                    <span className={styles.pipeFavoriteIcon} onClick={() => setPipeFavorite(pipe.id)}>
                        <Icon className={styles.favoriteIcon} theme={pipe.is_favorite ? 'filled' : 'outlined'} type="heart"/>
                    </span>
                    <Link className={styles.pipeLink} to={`./pipes/${pipe.id}`}>
                        <span className={styles.pipeCount}>
                            <div style={{ display: 'grid' }}>
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
            </Col>) : null}
            <Col xs={6}>
                <div className={styles.pipeCard}>
                    <Link className={styles.pipeLink} to={`./pipes/new`}>
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
                    </Link>
                </div>
            </Col>
        </Row>
        </div>
    );
}

export default PipeCenter
