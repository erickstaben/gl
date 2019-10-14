import React, { useEffect, useState } from 'react';
import { Collapse, Spin, Input, Checkbox, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'dva';
import useForm from 'react-hook-form';
import FormField from '../components/FormField/FormField';
import styles from './ProcessConfig.less';
import { ConnectState } from '@/models/connect';
import { ProcessComponent } from '../components';
import { ActivityInterface } from '@/models/database';
import Select from 'react-select';
import EmptyDiv from '../components/EmptyDiv/EmptyDiv';
import { router } from 'umi';

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

    const optionFilter = ({data},string) => {
        let result
        try {
            const optionString = data.label.props.children[0].props.children
            result = optionString.toLowerCase().indexOf(string.toLowerCase()) >= 0

        } catch (error) {
            console.log(error)
        }
        return result
    }

    const onSubmit = data => {
        if(!id || id == 'new'){
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
        dispatch({
            type: 'companies/index',
        })
        dispatch({
            type: 'users/index',
            payload: {},
        })
        register({name: 'activities'})
        register({name: 'company_id'})
        register({name: 'user_id'})
        setValue('activities',process.activities)
    }, [])
    const values = getValues()
    const process = useSelector((state: ConnectState) => state.processes.loaded)    
    const users = useSelector((state:ConnectState) => state.users.list)
    console.log(users,'oi')
    const companies = useSelector((state: ConnectState) => state.companies.list)
    return (
        <div className={styles.processBoardContainer}>
            <div className={styles.configHeader} style={{marginBottom: 16}}>
                <h2>Configurações do processo</h2>
                <div>
                    <Button onClick={() => router.goBack()}>Voltar</Button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                    <label>Nome do processo</label>
                    <input name='name' ref={register} defaultValue={process.name} />
                </FormField>
                <FormField>
                    <label>Selecione a empresa</label>
                    <Select onChange={({value}:any) => setValue('company_id',value)} filterOption={optionFilter}  noOptionsMessage={() => 'Nenhuma opção'} options={companies.map((company:CompanyInterface) => ({
                        value: company.id,
                        label: <div style={{display:'flex',flexDirection: 'column'}}><b>{company.name}</b><span>{company.cnpj}</span></div>,
                    }))}/>
                </FormField>
                <FormField>
                    <label>Selecione um usuário</label>
                    <Select onChange={({value}:any) => setValue('user_id',value)}   noOptionsMessage={() => 'Nenhuma opção'} options={users.map((user:UserInterface) => ({
                        value: user.id,
                        label: user.name,
                    }))}/>
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
    const handleTaskChange = (task,index,taskIndex) => {
        let newActivities = activities
        newActivities[index].tasks[taskIndex] = task
        setActivities(newActivities)
        onChange(newActivities)
    }

    const addActivityTask = (index) => {
        let newActivities = activities
        newActivities[index].tasks.push({name: '',description: '',is_complete: false})
        setActivities(newActivities)
        onChange(newActivities)
    }
    
    return (
        <div style={{marginTop: 16}}>
        <Collapse>
                {activities.map((activity:ActivityInterface,index:number) => {
                    console.log(activity,'activity')
                    return <Panel
                        key={index} 
                        header={
                            <Input 
                                value={activity.name} 
                                onChange={(e) => changeActivityName(e.target.value,index)}
                            />
                        }> 
                        {activity.tasks.length > 0 ? activity.tasks.map((task,taskIndex) => {
                            return (
                                <Task task={task} onChange={(task) => handleTaskChange(task,index,taskIndex)}/>
                            )
                        }): <EmptyDiv text={'Nenhuma tarefa nessa atividade'}/>}
                        <Button type='primary' onClick={() => addActivityTask(index)}>Adicionar tarefa</Button>
                    </Panel>
                })}                
        </Collapse>
        <Button type='primary' onClick={() => setActivities([...activities,{name: '',tasks: []}])}>Adicionar atividade</Button>
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
        <div className={styles.formTask}>
            <FormField>
                <label>Nome da tarefa</label>
                <Input value={task.name} onChange={({target}) => handleChange('name',target.value)} />
            </FormField>
            <FormField>
                <label>Descrição (opcional)</label>
                <Input value={task.description} onChange={({target}) => handleChange('description',target.value)} />
            </FormField>
            <FormField>
                <label>Dia de vencimento</label>
                <Input value={task.due_day} onChange={({target}) => handleChange('due_day',target.value)} />
            </FormField>
            
            
        </div>
    )
}