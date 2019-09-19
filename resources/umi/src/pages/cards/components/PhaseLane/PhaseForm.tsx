import React, { useEffect} from 'react'
import { useDispatch, useSelector} from 'dva';
import useForm from 'react-hook-form';
import styles from './PhaseLane.less';
import { PhaseInterface } from '@/models/database';
import { Checkbox, Switch } from 'antd';
import { FormListPreview, ReorderComponent } from '../../components';


interface Props {
    pipe_id : number | string;
    values: {
        phase_fields: Array<object>;
        description: string;
        name: string;
        client_status: string;
        is_final: boolean;
        due_date: Date;
        postpone: boolean;
    };
    submit: Function;
    editing: boolean;
}

const PhaseForm = (props: Props) => {
    const { register, handleSubmit, errors, setValue, setError } = useForm(); // initialise the hook
    const dispatch = useDispatch();
    const phases = useSelector((state: any) => state.pipes.loaded.phases) || []
    const { pipe_id, values, editing, submit } = props
    const onSubmit = (data: any) => {
        const newData = {
            ...data,
            pipe_id
        }
        submit(newData)
    };

    useEffect(() => {
        register({ name: "order" });
        register({ name: "phaseFields" })
        register({ name: "is_final" })
        register({ name: "postpone" })
        setValue('is_final', false);
        setValue('order',phases.length + 1)
    }, [])
    console.log('phaseform',values)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formInput}>
                <label htmlFor="name">Nome da nova fase</label>
                <input defaultValue={values.name} name="name" ref={register} />
            </div>
            {editing && <div className={styles.formInput}>
                <label>Ordem</label>
                <ReorderComponent
                    undraggables={phases.map((phase: PhaseInterface) => ({ id: phase.id, content: phase.name }))}
                    draggables={[{ content: 'Nova fase' }]}
                    setValue={setValue}
                />
            </div>}
            <div className={styles.formInput}>
                <FormListPreview initialState={values.phase_fields} setValue={setValue} setError={setError} />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="description">Descrição</label>
                <input defaultValue={values.description} name="description" ref={register} />
            </div>

            <div className={styles.formInput}>
                <label htmlFor="client_status">Status para o cliente</label>
                <input defaultValue={values.client_status} name="client_status" ref={register} />
            </div>
            <div className={styles.formInput}>
                <label>Dia do mês limite para execução:</label>
                <input defaultValue={values.due_date} name='due_date' ref={register} />
            </div>
            <div className={styles.formInput}>
                <Checkbox defaultChecked={values.postpone} onChange={(e) => setValue('postpone', e.target.checked)}>Prorroga?</Checkbox>
            </div>
            <div className={styles.formInput}>
                <Checkbox defaultChecked={values.is_final} onChange={(e) => setValue('is_final', e.target.checked)} >Fase final?</Checkbox>
            </div>

            <div className={styles.formInput} style={{ color: "red" }}>
                {Object.keys(errors).length > 0 &&
                    "Foram encontrado erros."}
            </div>
            <div className={styles.formInput}>
                <button type="submit">Salvar</button>
            </div>
        </form>
    )
}
PhaseForm.defaultProps = {
    values: {
        is_final: false,
    }
}
export default PhaseForm