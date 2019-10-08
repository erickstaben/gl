import React, { useEffect, useState } from 'react';
import { Collapse, Spin, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import useForm from 'react-hook-form';
import FormField from '../components/FormField/FormField';
import styles from './ProcessConfig.less';
import { ConnectState } from '@/models/connect';
import { ProcessComponent } from '../components';
import { ActivityInterface } from '@/models/database';
const Panel = Collapse.Panel

interface Props {
    match: {
        params: {
            id: number | string;
        }
    }
}

const ProcessesBoard = (props: Props) => {
    const { id } = props.match.params
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, errors, getValues, setValue } = useForm()
    const onSubmit = data => {
        if(!id){
            dispatch({
                type: 'processes/store',
                payload:{
                    body: data
                }
            })
        }
        else{
            dispatch({
                type: 'processes/update',
                payload:{
                    body: data,
                    path_id: [id]
                }
            })
        }
    }
    useEffect(() => {
        if(id !== 'new'){
            dispatch({
                type: 'processes/show',
                payload: {
                    path_id: [id],
                }
            })
        }
        register(
            {name: 'activities'}
        )
        setValue('activities',process.activities)
    }, [])
    const values = getValues()
    const process = useSelector((state: ConnectState) => state.processes.loaded)
    return (
        <div className={styles.processBoardContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                    <input name='name' ref={register} defaultValue={process.name} />
                </FormField>
                <FormField>
                    <ProcessCreator defaultValue={process.activities} onChange={(activities) => setValue('activities',activities)}/>
                </FormField>
                <FormField>
                    <label>Preview</label> 
                    <ProcessComponent onlyRead process={values} />
                </FormField>
                <FormField>
                    <button type='submit'>Salvar mudanças</button>
                </FormField>
            </form>            
        </div>
    )
}

export default ProcessesBoard 

const ProcessCreator = (props) => {
    const { onChange, defaultValue } = props
    const [activities, setActivities] = useState(defaultValue || [])
    const changeActivityName = (value,index) => {
        let newActivities = activities
        newActivities[index].name = value
        setActivities(newActivities)
        onChange(newActivities)
    }

    const addActivityTask = () => {
        setActivities([])
    }
    
    return (
        <div>
        <Collapse>
                {activities.map((activity:ActivityInterface,index:number) => {
                    return <Panel
                        key={index} 
                        header={
                            <Input 
                                value={activity.name} 
                                onChange={(e) => changeActivityName(e.target.value,index)}
                            />
                        }> 
                        {activity.tasks.map((task,taskIndex) => {
                            return (
                                <Task task={task} onChange={handleTaskChange}/>
                            )
                        })}
                        <Button onClick={() => addActivityTask()}>Adicionar tarefa</Button>
                    </Panel>
                })}
                <Button onClick={() => setActivities([...activities,{name: '',tasks: []}])}>Adicionar atividade</Button>
        </Collapse>
        </div>
    )
}
const Activity = (props) => {
    const { activity, onChange} = props

    const handleTaskChange = (index:number,task:TaskInterface) => {
        let newActivity = activity
        newActivity.tasks[index] = task
        onChange(newActivity)
    }
    return (
        <div>
        {activity.tasks.map((task,taskIndex) => {
            return (
                <Task task={task} onChange={(task) => handleTaskChange(taskIndex,task)}/>
            )
        })}
        <Button onClick={() => addActivityTask()}>Adicionar tarefa</Button>
        </div>
    )
}
const Task = (props) => {
    const {task,onChange} = props
    const handleChange = (field,value) => {
        let newTask = task
        newTask[field] = value
        onChange(newTask)
    }
    return (
        <div>
            <Input value={task.name} onChange={({target}) => handleChange('name',target.value)} />
            <Input value={task.description} onChange={({target}) => handleChange('description',target.value)} />
            <Input value={task.due_day} onChange={({target}) => handleChange('due_day',target.value)} />
        </div>
    )
}