import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Sector, Cell, LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useDispatch, useSelector } from 'dva';
import { ConnectState } from '@/models/connect';
import Select from 'react-select';
import { Button, Icon } from 'antd';


const ButtonGroup = Button.Group;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const CompaniesCostsChart = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'companies/index',
        })
        
    },[])

    const getCompanyReport = (company = {value: 0},actual = 1) => {
        dispatch({
            type: 'reports/company',  
            payload: {
                body: {
                    company_id: company.value,
                    actual: actual
                }
            }      
        })
        dispatch({
            type: 'reports/companyHistory',
            payload: {
                path_id: [company.value]
            }
        })
    }

    const renderCustomizedLabel = (payload) => {
        const {
            cx, cy, midAngle, innerRadius, outerRadius, percent, index, value
        } = payload
        const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`R$${value.toFixed(2).replace('.',',')}`}
            </text>
        );
    };

    const calcTotaisHistorico = (data) => {
        let keys = [];
        let total = [];
        data.map(info => {
            if(keys.indexOf(info.mes) >= 0){
                total[keys.indexOf(info.mes)].value = total[keys.indexOf(info.mes)].value  + info.cost
            }
            else{
                keys.push(info.mes)
                total.push({value: info.cost, name: info.mes})
            }
        })
        return total
    }
    const companies = useSelector((state:ConnectState) => state.companies.list).map(company => ({value: company.id,label: company.name}))

    const [selectedCompany,setSelectedCompany] = useState(null)
    const [monthsBehind,setMonthsBehind] = useState(1)
    const companiesData = useSelector((state:ConnectState) => state.reports.company).map(company => ({value: company.cost,name: company.name}))
    const historicData = calcTotaisHistorico(useSelector((state:ConnectState) => state.reports.companyHistory));
    
    return (
        <div>
            <div style={{display:'flex',alignItems: 'center'}}>
                <div style={{flexGrow: 1}}>
                    <Select
                        options={companies}
                        defaultOptions
                        placeholder={'Selecione a empresa...'}
                        onChange={(newValue: any) => {
                            setSelectedCompany(newValue)
                            getCompanyReport(newValue)
                        }}
                    />
                </div>                
                <div style={{ flexGrow: 1 }}>
                    <ButtonGroup>
                        <Button style={monthsBehind == 1 ? { backgroundColor: '#5490f2', color: 'white' } : {}} onClick={() => {
                            setMonthsBehind(1)
                            getCompanyReport(selectedCompany, 1)
                        }}>Mês passado</Button>
                        <Button style={monthsBehind == 0 ? { backgroundColor: '#5490f2', color: 'white' } : {}} onClick={() => {
                            setMonthsBehind(0)
                            getCompanyReport(selectedCompany, 0)
                        }}>Esse mês</Button>
                    </ButtonGroup>
                </div>
            </div>

            <div style={{marginTop: 16}}>
                <h4>Custo total mensal da empresa </h4>
                <h1>R${companiesData.reduce((total, num) => total + num.value, 0).toFixed(2).replace('.', ',')}</h1>
            </div>
            
            <div style={{display:'flex'}}>
                <div>
                    <h3>Distribuição dos custos</h3>
                        <PieChart width={400} height={400}>
                        <Pie
                            data={companiesData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {
                                companiesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Legend />
                    </PieChart>
                </div>
                <div>
                    <h3>Tendência dos custos</h3>
                    <LineChart
                        width={600}
                        height={400}
                        data={historicData}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="value" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                    </LineChart>
                </div>
                
            </div>
            
        </div>
    )
}

export default CompaniesCostsChart
