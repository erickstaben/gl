import React, { useEffect, useState } from 'react';
import { Collapse, Spin, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector} from 'dva';
import { router } from 'umi';

import { ConnectState } from '@/models/connect';
import { ActivityInterface, ProcessInterface, TaskInterface } from '@/models/database';
import styles from './ProcessesBoard.less';
import EmptyDiv from '../components/EmptyDiv/EmptyDiv';
import { MdTimer, MdCheck, MdSettings, MdDelete } from 'react-icons/md';
import { ProcessComponent } from '../components';
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

    const updateTask = (string:string, newValue:string|boolean,task_id: number) => {
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
    return (
        <div className={styles.processBoardContainer}>
            
            <div>
                <b><h3>Meus processos</h3></b>                
            </div>
            <div>
                <Button icon={'plus'} type={'primary'} style={{ margin: '8px 4px' }} onClick={() => router.push(`/processes/new/config`)}>Adicionar novo processo</Button>
                <Input.Search placeholder='Digite para pesquisar...' style={{ width: 200, float: 'right'}} onSearch={(e) => setFilterValue(e)} />
            </div>
            
            <div className={styles.processContainer}>
                {filteredProcesses.length > 0 ? filteredProcesses.map((process: ProcessInterface, processIndex: number) => {
                    return (
                        <ProcessComponent
                            key={processIndex}  
                            process={process} 
                            updateTask={updateTask} 
                            deleteProcess={deleteProcess}
                        />
                    )
                }) : <EmptyDiv text={'Nenhum processo encontrado'}/>}
            </div>    
        </div>
    )
}

export default ProcessesBoard 

