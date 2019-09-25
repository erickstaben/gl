import React from 'react';
import { useSelector } from 'dva';
import { ConnectState } from '@/models/connect';
import pipesStyles from '@/pages/cards/routes/PipeCenter.less';
import styles from './Home.less';
import { MdExtension} from 'react-icons/md'
import Developing from '@/components/Developing';

interface Props {

}

const Home = (props:Props) => { 
  const user = useSelector((state:ConnectState) => state.auth.user)
  return (
    <div className={styles.homeLayout}>
      <header className={styles.title}>
        Olá {user.name},
      </header>
      <div className={styles.workContainer}>
        <h2 className={styles.yourWork}>Suas tarefas para a semana:</h2>
        <Developing/>
      </div>      
      <div className={styles.lateWorkContainer}>
        <h2 className={styles.yourWork}>Tarefas em atraso:</h2>
        <Developing/>
      </div>      
    </div>
  )
}
export default Home
