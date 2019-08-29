import React from 'react'
import { Progress } from 'antd';
import { sumBy } from 'lodash';
import { PhaseFieldInterface } from '@/models/database';

interface Props {
    fields ?: PhaseFieldInterface[]
    className : string
}

const ProgressBar = (props:Props) => (
    <Progress strokeWidth={16} {...props} percent={percent(props.fields)} showInfo={false} />
)

export default ProgressBar

export const percent = (fields:PhaseFieldInterface[]|undefined):number => {
    if (fields) {
        const size = fields ? fields.length : 0
        const soma = sumBy(fields, o => (o.pivot.value ? 1 : 0))
        return ((soma / size) * 100)
    }
    return 0
}
export const uncompleted = (fields:PhaseFieldInterface[]|undefined):string => {
    if (fields) {
        const size = fields ? fields.length : 0
        const soma = sumBy(fields, o => (o.pivot.value ? 1 : 0))
        return `${soma}/${size}`
    }
    return '0/0'
}
