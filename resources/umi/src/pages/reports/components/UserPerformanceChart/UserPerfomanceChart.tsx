import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'dva';
import {
    PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar,
} from 'recharts';

import { ConnectState } from '@/models/connect';
import Select from 'react-select';
import EmptyDiv from '@/pages/cards/components/EmptyDiv/EmptyDiv';
const monthNames = ["Janeiro", "Feveireiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const RADIAN = Math.PI / 180;
const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57']

const UserPerformanceChart = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'users/index',
        })

    }, [])

    const users = useSelector((state: ConnectState) => state.users.list).map(user => ({ value: user.id, label: user.name }))
    const data = useSelector((state: ConnectState) => state.reports.user)

    const [selectedUser,setSelectedUser] = useState(null)
    const [offset,setOffset] = useState(0)

    const getUserReport = (id:number,offset = 0) => {
        dispatch({
            type: 'reports/user',
            payload: {
                path_id: [id],
                params: {
                    offset: offset,
                }
            }
        })
    }

    const renderCustomizedLabel = (payload) => {
        const {
            cx, cy, midAngle, innerRadius, outerRadius, percent, index, value
        } = payload
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const dataWithFill =  data.percentual ? data.percentual.map(
        (info, index) => ({ ...info, fill: colors[index] })
    ) : []
    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{ flexGrow: 1 }}>
                    <label>Usuário</label>
                <Select
                    placeholder={'Selecione um usuário'}
                    options={users}
                    defaultOptions
                    onChange={(newValue: any) => {
                        getUserReport(newValue.value)
                        setSelectedUser(newValue.value)
                    }}
                />
                </div>
                <div style={{flexGrow: 1}}>
                    <label>Mês</label>
                    <Select
                        placeholder={'Selecione um mês'}
                        options={monthNames.map((month, index) => ({ value: index - new Date().getMonth(), label: month }))}
                        defaultOptions
                        onChange={({ value }) => {
                            getUserReport(selectedUser, value)
                        }}
                    />
                </div>
                
            </div>
            
            {selectedUser ?
                <div style={{display: 'flex'}}>                   
                    
                    <div style={{ flexGrow: 1, marginTop: 16 }}>
                        <h3>Coeficiente de preechimento</h3>
                        <p>Determina o percentual do tempo de trabalho que o sistema tem registro</p>
                        <RadialBarChart
                            width={400}
                            height={400}
                            data={[{ name: 'Meta', value: 1, fill: '#bababa' }, ...dataWithFill]}
                            startAngle={180}
                            endAngle={0}
                        >
                            <RadialBar minAngle={15} label={{ fill: '#83a6ed', position: 'insideStart' }} background clockWise={true} dataKey='value' />
                            <Legend formatter={(value, entry, index) => {
                                return value == 'Meta' ? 'Valor alvo' : monthNames[value]
                            }} iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="bottom" />
                            <Tooltip />
                        </RadialBarChart>
                    </div>
                    <div style={{ flexGrow: 1, marginTop: 16  }}>
                        <h3>Distribuição do tempo</h3>
                        <p>Exibe a distribuição do tempo gasto em um mês pelos tipos de tarefa</p>
                        {data.distribuicao.length > 0 ? <PieChart width={400} height={400}>
                        <Pie
                            data={data.distribuicao}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {
                                data.distribuicao.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)
                            }
                        </Pie>
                        <Legend />
                        </PieChart>: <EmptyDiv text={'Nenhum dado'}/>}
                    </div>
                </div>
             : <div style={{display: 'flex',alignItems: 'center',textAlign: 'center', height: 250}}>
                    <b>Nenhum dado carregado</b>
            </div>}
        </div>
    )
}

export default UserPerformanceChart