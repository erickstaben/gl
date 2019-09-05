import React, { useEffect } from 'react'
import { Drawer } from 'antd';
import useForm from 'react-hook-form';
import { ID } from '@/models/database';
import { useDispatch, useSelector } from 'dva';
import { PhaseInterface } from '@/models/database'
import { FormListPreview, ReorderComponent } from '../../components'
type Props = {
    setVisibility: (b:boolean) => void;    
    withModal: boolean;
    pipe_id: ID;
    isVisible: boolean;
    ref: HTMLDivElement | undefined;
}

const PhaseLaneModal = (props:Props) => {
    
    const { register, handleSubmit, errors, setValue, setError } = useForm(); // initialise the hook
    const dispatch = useDispatch();
    const phases = useSelector((state:any) => state.pipes.loaded.phases) || []
    const { setVisibility, pipe_id, isVisible, ref} = props
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
    },[])
    return (    
        <Drawer
            title="Adicionar nova fase"
            placement="right"
            closable={false}
            width={360}
            onClose={() => setVisibility(false)}
            visible={isVisible}
            getContainer={ref}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Nome da nova fase</label>
                    <input name="name" placeholder="..." ref={register} />
                </div>
                <div>
                    <ReorderComponent 
                        undraggables={phases.map((phase:PhaseInterface) => ({id: phase.id,content: phase.name}))} 
                        draggables={[{content: 'Nova fase'}]} 
                        setValue={setValue}
                    />
                </div>
                <div>
                    <FormListPreview setValue={setValue} setError={setError}/>
                </div>
                <div>
                    <label htmlFor="description">Descrição</label>
                    <input name="description" placeholder="..." ref={register} />
                </div>

                <div>
                    <label htmlFor="client_status">Status para o cliente</label>
                    <input name="client_status" placeholder="..." ref={register} />
                </div>


                <div>
                    <label htmlFor="is_final">Fase final</label>
                    <input type="checkbox" name="is_final" ref={register({ required: true })} />
                </div>

                <div style={{ color: "red" }}>
                    {Object.keys(errors).length > 0 &&
                        "There are errors, check your console."}
                </div>
                <input type="submit" value='Salvar'/>
            </form>
        </Drawer> 
        
    )
}
PhaseLaneModal.defaultProps = {
    withModal: true
}

export default PhaseLaneModal