import React, { useEffect, useState } from 'react';
import {
    LineChart,ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useDispatch, useSelector } from 'dva';
import { ConnectState } from '@/models/connect';
import Select from 'react-select';


const ProcessPerformanceChart = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        getProcessReport()
        getProcesses()
    },[])

    const getProcessReport = (id = null) => {
        dispatch({
            type: 'reports/process',  
            payload: {
                body: {
                    id: id,
                    type: 'ProcessEvent',
                }
            }      
        })
    }
    const getProcesses = async () => {
        dispatch({
            type: 'processes/search'
        })
    }

    const processes = useSelector((state:ConnectState) => state.processes.search).map(process => ({value: process.id,label: process.name}))

    const [selectedProcess,setSelectedProcess] = useState(null)
    const processData = useSelector((state:ConnectState) => state.reports.process).map(process => ({value: process.id,name: process.name}))
    return (
        <div style={{minWidth: 400}}>
            <Select
                options={processes}
                defaultOptions
                onChange={(newValue:any) => {
                    setSelectedProcess(newValue)
                    getProcessReport(newValue)
                }}
            />
            <LineChart
                height={300}
                width={500}
                data={processData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid />
                <XAxis label="Mês"   dataKey="name" />
                <YAxis width={90} label="Tempo" />
                <Tooltip />
                <Legend formatter={(value,entry) => <span>Tempo total do processo</span>}/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    )
}

export default ProcessPerformanceChart
