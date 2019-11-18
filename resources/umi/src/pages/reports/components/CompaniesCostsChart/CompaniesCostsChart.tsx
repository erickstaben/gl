import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Sector, Cell, Legend
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

    const getCompanyReport = (id = null,actual = 1) => {
        dispatch({
            type: 'reports/company',  
            payload: {
                body: {
                    company_id: id,
                    actual: actual
                }
            }      
        })
    }

    const renderCustomizedLabel = (payload) => {
        console.log('ASDASD',payload)
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
    const companies = useSelector((state:ConnectState) => state.companies.list).map(company => ({value: company.id,label: company.name}))

    const [selectedCompany,setSelectedCompany] = useState(null)
    const [monthsBehind,setMonthsBehind] = useState(1)
    const companiesData = useSelector((state:ConnectState) => state.reports.company).map(company => ({value: company.cost,name: company.name}))
    
    return (
        <div>
            <Select
                options={companies}
                defaultOptions
                onChange={(newValue:any) => {
                    setSelectedCompany(newValue)
                    getCompanyReport(newValue)
                }}
            />
            <div style={{marginTop: 16}}>
                <h4>Custo total mensal da empresa </h4>
                <ButtonGroup>
                    <Button style={monthsBehind == 1 ? {backgroundColor: '#5490f2',color: 'white'} : {}} onClick={() => {
                        setMonthsBehind(1)
                        getCompanyReport(selectedCompany,1)
                    }}>Mês passado</Button>
                    <Button style={monthsBehind == 0 ? {backgroundColor: '#5490f2',color: 'white'} : {}} onClick={() => {
                        setMonthsBehind(0)
                        getCompanyReport(selectedCompany,0)
                    }}>Esse mês</Button>
                </ButtonGroup>
                <h1>R${companiesData.reduce((total,num) => total + num.value,0).toFixed(2).replace('.',',')}</h1>
            </div>
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
    )
}

export default CompaniesCostsChart
