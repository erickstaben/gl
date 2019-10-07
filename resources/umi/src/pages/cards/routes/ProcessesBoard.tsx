import React, { useEffect, useState } from 'react';
import { Collapse, Spin, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector} from 'dva';
import { router } from 'umi';

import { ConnectState } from '@/models/connect';
import { ActivityInterface, ProcessInterface, TaskInterface } from '@/models/database';
import styles from './ProcessesBoard.less';
import EmptyDiv from '../components/EmptyDiv/EmptyDiv';
import { MdTimer, MdCheck, MdSettings, MdDelete } from 'react-icons/md';

const { Panel } = Collapse;

interface Props {
    match: {
        params: {
            id: number;
        }
    }
}

const ProcessesBoard = (props:Props) => {
    const { id } = props.match.params
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'processes/index',
            payload: {}
        })
    },[])


    const processes = useSelector((state: ConnectState) => state.processes.list)
    const [filterValue,setFilterValue] = useState('')
    const filterProcess = (processes:ProcessInterface[]) => {
        if(filterValue.length > 0){
            console.log(filterValue)
            return processes.filter((proc: ProcessInterface) => proc.name.indexOf(filterValue) >= 0)
        }
        return processes
    }

    const updateTask = (string:string, newValue:string,task_id: number) => {
        dispatch({
            type: 'tasks/update',
            payload: {
                body: {
                    [string]: newValue,
                },
                path_id: [task_id],
            }
        })
    }
    const filteredProcesses = filterProcess(processes)

    const deleteProcess = (id: number) => {
        dispatch({
            type: 'process/delete',
            payload: {
                path_id: [id],
            }
        })
    }
    const checkActivityFinished = (activity) => {
        if (activity.completed_tasks == activity.total_tasks && activity.total_tasks !== 0){
            return true
        }
        return false
    }
    console.log(filteredProcesses)
    return (
        <div className={styles.processBoardContainer}>
            
            <div>
                <b><h3>Meus processos</h3></b>                
            </div>
            <div>
                <Button icon={'plus'} type={'primary'} style={{ margin: '8px 4px' }} onClick={() => router.push(`/processes/new/config`)}>Adicionar novo processo</Button>
                <Input.Search placeholder='Digite para pesquisar...' style={{ width: 200, float: 'right'}} onSearch={(e) => setFilterValue(e)} />
            </div>
            
            <div>
                {filteredProcesses.length > 0 ? filteredProcesses.map((process: ProcessInterface, processIndex: number) => {
                    return (
                        <Collapse>
                            <Panel 
                                key={processIndex} 
                                header={process.name} 
                                extra={ <div style={{display:'inline-flex'}}>
                                    <div className={styles.iconStyle} >
                                        <i onClick={() => router.push(`/processes/${process.id}/config`)}>
                                            <MdSettings />
                                        </i>
                                    </div>
                                    <div className={styles.iconStyle} >
                                        <i onClick={() => deleteProcess(process.id)}>
                                            <MdDelete />
                                        </i>
                                    </div>
                                </div>}
                            >
                                {process.activities && <Collapse>
                                    {process.activities.map((activity: ActivityInterface, taskIndex: number) => {
                                        return (
                                            <Panel 
                                            key={taskIndex} 
                                                style={checkActivityFinished(activity) ? {
                                                    backgroundColor: '#dfffdf'
                                                } : {}}
                                            header={
                                                <div className={styles.headerStyle}>
                                                    {checkActivityFinished(activity) && <i><MdCheck /></i>}
                                                    <span style={{flexGrow: 1}}>{activity.name}</span>
                                                    <label>Status:</label><span>{activity.status}</span>
                                                    <span>{activity.completed_tasks}/{activity.total_tasks}</span>
                                                </div>
                                            }
                                            >
                                                {activity.tasks ? activity.tasks.map((task: TaskInterface) => {
                                                    return (
                                                        <div className={styles.taskContainer}>
                                                            <div className={styles.activeTask}>
                                                                <Checkbox 
                                                                    checked={task.is_complete} 
                                                                    onChange={(e) => updateTask('is_complete',e.target.checked,task.id)}
                                                                >
                                                                    {task.name}
                                                                </Checkbox>
                                                            </div>
                                                            <div className={styles.nextTask}>
                                                                {task.is_complete == 0 ? <>
                                                                    <i><MdTimer /></i>
                                                                    <span>{task.due_day}</span>
                                                                </> : <>
                                                                    <i><MdCheck/></i>
                                                                    <span>{task.updated_at}</span>
                                                                </>}
                                                            </div>
                                                        </div>
                                                    )
                                                }) : null}
                                            </Panel>
                                        )
                                    })}
                                </Collapse>}
                            </Panel>
                        </Collapse>
                    )
                }) : <EmptyDiv text={'Nenhum processo encontrado'}/>}
            </div>    
        </div>
    )
}

export default ProcessesBoard 