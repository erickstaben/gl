import React from 'react'
import { Modal, Button } from 'antd';
import useForm from 'react-hook-form';


type Props = {
    setVisibility: (b:boolean) => void;    
    withModal: boolean;
}

const PhaseLaneModal = (props:Props) => {
    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const onSubmit = (data:any) => {
        console.log(data,'oioio');
    };
    const {setVisibility} = props
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          title="Adicionar nova fase"
          visible={true}
          onOk={() => setVisibility(false)}
          onCancel={() => setVisibility(false)}
          footer={[
            <Button key="back" onClick={() => setVisibility(false)}>
                Cancelar
            </Button>,
            <button key="back" type="submit">
                Salvar
            </button>
          ]}
        >
           
                <input name="firstname" ref={register} /> {/* register an input */}
                
                <input name="lastname" ref={register({ required: true })} />
                {errors.lastname && 'Last name is required.'}
                
                <input name="age" ref={register({ pattern: /\d+/ })} />
                {errors.age && 'Please enter number for age.'}                
                
        </Modal>        
        </form>
    )
}
PhaseLaneModal.defaultProps = {
    withModal: true
}

export default PhaseLaneModal