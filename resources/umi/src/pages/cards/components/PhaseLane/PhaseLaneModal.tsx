import React, { useEffect } from 'react'
import { Drawer, Checkbox } from 'antd';
import useForm from 'react-hook-form';
import { ID } from '@/models/database';
import { useDispatch, useSelector } from 'dva';
import { PhaseInterface } from '@/models/database'
import { FormListPreview, ReorderComponent } from '../../components'
import styles from './PhaseLane.less';

type Props = {
    setVisibility: (b:boolean) => void;    
    withModal: boolean;
    pipe_id: ID;
    isVisible: boolean;
}

const PhaseLaneModal = (props:Props) => {
    
    const { register, handleSubmit, errors, setValue, setError } = useForm(); // initialise the hook
    const dispatch = useDispatch();
    const phases = useSelector((state:any) => state.pipes.loaded.phases) || []
    const { setVisibility, pipe_id, isVisible} = props
    const onSubmit = (data: any) => {
        const newData = {
            ...data,
            pipe_id
        }
        dispatch({
            type: 'phases/create',
            payload: {
                body: newData,
                params: {}
            }
        })
    };

    useEffect(() => {
        register({ name: "order" });
        register({ name: "phaseFields" })
        register({ name: "is_final"})
    },[])
    console.log('error',errors)
    return (    
        <Drawer
            title={'Adicionar nova fase'}
            placement="right"
            closable={false}
            width={600}
            height={600}
            onClose={() => setVisibility(false)}
            visible={isVisible}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formInput}>
                    <label htmlFor="name">Nome da nova fase</label>
                    <input name="name" ref={register} />
                </div>
                <div className={styles.formInput}>
                    <label>Ordem</label>
                    <ReorderComponent 
                        undraggables={phases.map((phase:PhaseInterface) => ({id: phase.id,content: phase.name}))} 
                        draggables={[{content: 'Nova fase'}]} 
                        setValue={setValue}
                    />
                </div>
                <div className={styles.formInput}>
                    <FormListPreview setValue={setValue} setError={setError}/>
                </div>
                <div className={styles.formInput}>
                    <label htmlFor="description">Descrição</label>
                    <input name="description" ref={register} />
                </div>

                <div className={styles.formInput}>
                    <label htmlFor="client_status">Status para o cliente</label>
                    <input name="client_status" ref={register} />
                </div>


                <div className={styles.formInput}>
                    <Checkbox onChange={(value) => setValue('is_final',value)} >Fase final?</Checkbox>
                </div>

                <div className={styles.formInput} style={{ color: "red" }}>
                    {Object.keys(errors).length > 0 &&
                        "Foram encontrado erros."}
                </div>
                <div className={styles.formInput}>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </Drawer> 
        
    )
}
PhaseLaneModal.defaultProps = {
    withModal: true
}

export default PhaseLaneModal