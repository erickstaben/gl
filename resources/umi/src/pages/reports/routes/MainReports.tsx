import React, { useEffect, useState } from 'react'
import styles from './MainReports.less';
import { useDispatch, useSelector } from 'dva';
import UserPerformanceChart from '../components/UserPerformanceChart/UserPerfomanceChart';
import CompaniesCostsChart from '../components/CompaniesCostsChart/CompaniesCostsChart';
import { ConnectState } from '@/models/connect';
import Select from 'react-select';
import { setupMaster } from 'cluster';
import { Tabs } from 'antd';

interface Props {

}



const MainReports = (props:Props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'reports/overview',        
        })
    },[])
    const users = useSelector((state:ConnectState) => state.users.list)
    const [user,setUser] = useState(null)
    return (
        <div className={styles.mainDiv}>
            <div className={styles.responsiveContainer}>
                <div className={styles.infoCard}>
                    <div className={styles.headerContainer}>
                        <h3>Informações do usuário</h3>
                        <div className={styles.selectContainer}>
                            <Select onChange={({ value }) => setUser(value)} options={users.map((user) => ({ label: user.name, value: user.id }))} />
                        </div>
                    </div>
                    <div>
                        
                        <div>
                            <Tabs defaultActiveKey={'1'}>
                                <Tabs.TabPane tab='Eventos' key={'1'}>
                                    <UserPerformanceChart />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Eventos' key={'2'}>
                                    <CompaniesCostsChart />
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className={styles.infoCard}>
                    <h3>Informações do usuário</h3>
                    <div>
                        <UserPerformanceChart />
                    </div>
                </div>
            </div>
            
            Em desenvolvimento
            A fazer:
                - Relátorio de tempo em fase por empresa.
                - Relátorio de tempo em fase por pipe.
                

            <div>
                
            </div>
        </div>
        
    )
}
export default MainReports

