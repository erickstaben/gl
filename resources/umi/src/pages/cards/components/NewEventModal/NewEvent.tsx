import React, { useEffect } from 'react';
import { Modal, DatePicker } from 'antd';
import useForm from 'react-hook-form';
import { CardInterface, CompanyInterface, PhaseInterface } from '@/models/database';
import { useSelector, useDispatch } from 'dva';
import { ConnectState } from '@/models/connect';
import FormField from '../FormField/FormField';
import EmptyDiv from '../EmptyDiv/EmptyDiv';
import Select from 'react-select';
import { MdPlusOne } from 'react-icons/md';

interface Props {
    isVisible: boolean;
    toggleModal: (a:boolean) => void
}

const NewEventModal = (props:Props) => {
    
    const { isVisible, toggleModal} = props;
    const companies = useSelector((state: ConnectState) => state.companies.list)
    const phases = useSelector((state:ConnectState) => state.pipes.loaded.phases) || []
    const { register, handleSubmit, errors, setValue, setError, reset } = useForm();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'companies/index',
        })
        register({ name: "action" })
        register({ name: "company_id" })
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

    return (
        <div>
            <Modal footer={null} onCancel={() => toggleModal(false)} title={'Adicionar um novo card ao pipe'} visible={isVisible}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    
                    <FormField> 
                        <label>Tipo de evento</label>
                        <Select 
                        onChange={({value}:any) => setValue('action',value)} 
                        filterOption={optionFilter}  
                        noOptionsMessage={() => 'Nenhuma opção'} 
                        options={[{value: 'atendimento',label: 'Atendimento'},{value: 'pesquisa',label: 'Pesquisa'}]}/>
                    </FormField>
                    <FormField>    
                        <label>Duração do evento (mins)</label>                
                        <input name='duration' ref={register}/>
                    </FormField>
                    <FormField> 
                        <label>Evento referente a qual empresa?</label>
                        <Select onChange={({value}:any) => setValue('company_id',value)} filterOption={optionFilter}  noOptionsMessage={() => 'Nenhuma opção'} options={companies.map((company:CompanyInterface) => ({
                            value: company.id,
                            label: <div style={{display:'flex',flexDirection: 'column'}}><b>{company.name}</b><span>{company.cnpj}</span></div>,
                        }))}/>
                    </FormField>
                    <FormField> 
                        <button type='submit'>Salvar</button>                                      
                    </FormField>
                </form>
            </Modal>
        </div>
    )
}

export default NewEventModal 
