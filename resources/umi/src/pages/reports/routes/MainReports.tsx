import React, { useEffect, useState } from 'react'
import styles from './MainReports.less';
import { useDispatch, useSelector } from 'dva';
import UserPerformanceChart from '../components/UserPerformanceChart/UserPerfomanceChart';
import CompaniesCostsChart from '../components/CompaniesCostsChart/CompaniesCostsChart';
import ProcessPerformanceChart from '../components/ProcessPerformanceChart/ProcessPerformanceChart';
import { ConnectState } from '@/models/connect';
import Select from 'react-select';
import { setupMaster } from 'cluster';
import { Tabs } from 'antd';

interface Props {

}



const MainReports = (props:Props) => {
    const users = useSelector((state:ConnectState) => state.users.list)
    const [user,setUser] = useState(null)
    return (
        <div className={styles.mainDiv}>
            <div className={styles.responsiveContainer}>
                <div className={styles.infoCard}>
                    <div className={styles.headerContainer}>
                        <h3>Estatísticas por empresa</h3>                        
                    </div>
                    <div>
                        <CompaniesCostsChart />
                    </div>
                </div>
                <div className={styles.infoCard}>
                    <h3>Informações do usuário</h3>
                    <div>
                        <UserPerformanceChart />
                    </div>
                </div>
                <div className={styles.infoCard}>
                    <h3>Informações do processo</h3>
                    <div>
                        <ProcessPerformanceChart />
                    </div>
                </div>
            </div>
            
        </div>        
    )
}
export default MainReports

