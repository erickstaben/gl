import React,{ ReactElement, useEffect } from "react"
import styles from './ConfigLayout.less'
import PhaseConfig from "@/pages/phases/routes/PhaseConfig"
import { Link } from "umi"
import { useSelector, useDispatch } from "dva"
import { find } from 'lodash';

interface Props{
    children: ReactElement[];
    history: any,
    match: {
        params: {
            id: number;
        }
    }
}

const ConfigLayout = (props:Props) => {
    const { children, history, location } = props
    const { id } = props.match.params
    const dispatch = useDispatch();
    const config = useSelector((state:any) => state.phases.loaded.config)
    const pipe_id = config.pipe ? config.pipe.id : null
    useEffect(() => {
        dispatch({
            type: 'phases/list',
            payload: {
                path_id: [pipe_id]
            }
        })
    },[id]) 
    console.log(location,'location')
    const checkLocation = (location:string) => {
        if(location.split('/')[1] == 'phases' && location.split('/')[3] == 'config'){
            return true
        }
        return false
    }
    const getLocationName = () => {
        const pieces = location.pathname.split('/')
        if(pieces[1] == 'pipes' && !(pieces[3] == 'phases')){
            return 'Configurações do Pipe';
        }
        if(pieces[1] == 'pipes'){
            return 'Configurações da Fase';
        }
        if(pieces[1] == 'customers'){
            return 'Empresas cadastradas';
        }
    }
    return (
        <div className={styles.configContent}>
            <div  className={styles.configHeader}>
            <h2>{getLocationName()}</h2>
            {checkLocation(location.pathname) && <a style={{marginRight: 8}} onClick={() => history.push(`/pipes/${pipe_id}/phases`)}><button>Todas as fases</button></a>}
            <a onClick={() => history.goBack()}><button>Voltar</button></a>
            </div>
            {children}
        </div>
    )
}

export default ConfigLayout