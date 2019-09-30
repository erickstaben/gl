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

const NewCardModal = (props:Props) => {
    
    const { isVisible, toggleModal} = props;
    const companies = useSelector((state: ConnectState) => state.companies.list)
    const phases = useSelector((state:ConnectState) => state.pipes.loaded.phases) || []
    const { register, handleSubmit, errors, setValue, setError, reset } = useForm();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'companies/index',
        })
        register({ name: "due_date" })
        register({ name: "company_id" })
        register({ name: "phase_id" })
    },[])


    const onSubmit = (data: any) => {
        dispatch({
            type: 'pipes/newCard',
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
                        <label>Título do card</label>                
                        <input name='title' ref={register}/>
                    </FormField>
                    <FormField>
                        <label>Data de vencimento do card</label>
                        <DatePicker onChange={(value) => setValue('due_date', value.format())} name='due_date' ref={register}/>
                    </FormField>

                    <FormField> 
                        <label>Tarefa referente a qual empresa?</label>
                        <Select onChange={({value}:any) => setValue('company_id',value)} filterOption={optionFilter}  noOptionsMessage={() => 'Nenhuma opção'} options={companies.map((company:CompanyInterface) => ({
                            value: company.id,
                            label: <div style={{display:'flex',flexDirection: 'column'}}><b>{company.name}</b><span>{company.cnpj}</span></div>,
                        }))}/>
                    </FormField>
                    
                    <FormField> 
                        <label>Em qual fase o card deve iniciar?</label>
                        <Select onChange={({value}:any) => setValue('phase_id',value)} ref={register} name='phase_id' noOptionsMessage={() => 'Nenhuma opção'} options={phases.map((phase:PhaseInterface) => ({
                            value: phase.id,
                            label: phase.name,
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

export default NewCardModal 
