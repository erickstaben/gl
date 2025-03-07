import { ProcessInterface, ActivityInterface, TaskInterface} from "@/models/database"
import React from 'react'
import { MdSettings, MdDelete, MdCheck, MdTimer } from 'react-icons/md';
import { router } from 'umi';
import styles from './ProcessComponent.less'
import { Collapse, Checkbox } from 'antd';
import moment from 'moment';
import TimerButton from "@/components/TimerButton";
import { find } from 'lodash';
import { useSelector } from "dva";
import { ConnectState } from "@/models/connect";
import ProcessesBoard from "../../routes/ProcessConfig";

const Panel = Collapse.Panel


interface Props {
    key ?: number;
    onlyRead: boolean;
    process: ProcessInterface;
    deleteProcess ?: (id:number) => void
    updateTask ?: (string: string, newValue: boolean, task_id: number) => void
}

const ProcessComponent = (props:Props) => {
    const checkActivityFinished = (activity) => {
        if (activity.completed_tasks == activity.total_tasks && activity.total_tasks !== 0) {
            return true
        }
        return false
    }
    const checkProcessFinished = (process) => {
        if (process.completed_activities == process.total_activities && process.total_activities !== 0 ){
            return true
        }
        return false
    }
    const { key, process, deleteProcess, updateTask, onlyRead = false } = props
    return (
        <Collapse>
            <Panel
                key={key}
                style={checkProcessFinished(process) ? {
                    backgroundColor: '#dfffdf'
                } : {}}
                header={<div style={{display: 'inline-flex'}}>
                    <div className={styles.headerStyle}>
                        {checkProcessFinished(process) && <i><MdCheck /></i>}
                        <div>{process.name}</div>
                    </div>
                </div>}
                extra={!onlyRead && <div style={{ display: 'inline-flex' }}>
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
                                        <span style={{ flexGrow: 1 }}>{activity.name}</span>
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
                                                    onChange={(e) => updateTask('is_complete', e.target.checked, task.id)}
                                                >
                                                    {task.name}
                                                </Checkbox>
                                            </div>
                                            {task.is_complete == 0 && <div className={styles.activeTask}>
                                                <TimerButton title={`Timer do(a) ${task.name}`} type={'TaskEvent'} company_id={process.company_id} reference_id={task.id} reference_model={'task'}/>
                                            </div>}
                                            <div className={styles.nextTask}>
                                                {task.is_complete == 0 ? <>
                                                    <i><MdTimer /></i>
                                                    <span>{moment([(new Date()).getFullYear(), (new Date()).getMonth(), task.due_day]).format('D MMM')}</span>
                                                </> : <>
                                                        <i><MdCheck /></i>
                                                        <span>{moment(task.updated_at).format('D MMM')}</span>
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
}

export default ProcessComponent