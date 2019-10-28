import React, { useEffect } from 'react';
import { Modal, DatePicker, Form } from 'antd';
import useForm from 'react-hook-form';
import { CardInterface, CompanyInterface, PhaseInterface } from '@/models/database';
import { useSelector, useDispatch } from 'dva';
import { ConnectState } from '@/models/connect';
import FormField, { FormFieldContainer } from '../FormField/FormField';
import EmptyDiv from '../EmptyDiv/EmptyDiv';
import Select from 'react-select';
import { MdPlusOne, MdTimer } from 'react-icons/md';
import { isEmptyStatement } from '@babel/types';

interface Props {
    isVisible: boolean;
    toggleModal: (a:boolean) => void
}

const NewEventModal = (props:Props) => {
    
    const { isVisible, toggleModal} = props;
    const companies = useSelector((state: ConnectState) => state.companies.list)
    const phases = useSelector((state:ConnectState) => state.pipes.loaded.phases) || []
    const { register, handleSubmit, errors, setValue, setError, triggerValidation, reset, getValues } = useForm();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'companies/index',
        })
        //register({ name: "type" }, { required: 'Esse campo é necessário'})
        register({ name: "company_id" },{ required: 'Esse campo é necessário', min: 0})
    },[])


    const onSubmit = (data: any) => {
        dispatch({
            type: 'events/newEvent',
            payload: {
                body: data
            }
        })
        toggleModal(false)
    };

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

    const startTimer = (e) => {
        e.preventDefault();
        const data = getValues()
        triggerValidation().then(res => {
            if(res){
                dispatch({
                    type: 'events/newTimer',
                    payload: {
                        params: {
                            company_id: data.company_id,
                            type: data.type,
                            title: 'Contador de tempo de ' + data.type
                        }
                    }
                })
                toggleModal(false) 
            }
        })

              
    }
    console.log(errors)
    return (
        <div>
            <Modal footer={null} onCancel={() => toggleModal(false)} title={'Novo registro de evento'} visible={isVisible}>
                <form onSubmit={handleSubmit(onSubmit)}>                  
                    
                    {/*<FormField> 
                        <label>Tipo de evento</label>
                        <Select 
                        onChange={({value}:any) => setValue('type',value)} 
                        noOptionsMessage={() => 'Nenhuma opção'} 
                        options={[{value: 'atendimento',label: 'Atendimento'},{value: 'pesquisa',label: 'Pesquisa'}]}/>
                        <div error>{errors.type ? errors.type.message : null}</div>
                    </FormField>*/}
                    <FormField hasError={errors.type || false}>
                        <label>Tipo de evento</label>
                        <input autoFocus name='type' ref={register({
                            required: 'Esse campo é necessário'
                        })}/>
                        <span>{errors.type ? errors.type.message : null}</span>
                    </FormField>
                    <FormField hasError={errors.company_id || false}> 
                        <label>Evento referente a qual empresa?</label>
                        <Select onChange={({value}:any) => setValue('company_id',value)} filterOption={optionFilter}  noOptionsMessage={() => 'Nenhuma opção'} options={companies.map((company:CompanyInterface) => ({
                            value: company.id,
                            label: <div style={{display:'flex',flexDirection: 'column'}}><b>{company.name}</b><span>{company.cnpj}</span></div>,
                        }))} />
                        <span>{errors.company_id ? errors.company_id.message : null}</span>
                    </FormField>
                    <FormField>
                        <label>Duração do evento (mins)</label>
                        <input name='duration' ref={register} />
                    </FormField>
                    <FormField>
                        <FormFieldContainer>
                            <button type='submit'>Salvar</button>
                            <button onClick={(e) => startTimer(e)}><i><MdTimer /></i>Iniciar timer</button>
                        </FormFieldContainer>                                                              
                    </FormField>
                </form>
            </Modal>
        </div>
    )
}

export default NewEventModal 
