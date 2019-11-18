import { stringify } from 'qs';
import request from '@/utils/request';
import { DefaultResponseInterface } from '@/models/database';

interface Payload {
    path_id: Array<number>;
    params: object;
    body: object;
}

export async function fProcess(payload: Payload): Promise<DefaultResponseInterface> {
    return request(`/reports/process?${payload ? stringify(payload.params) : ''}`, payload ? {
        body: JSON.stringify(payload.body),
        method: 'POST',
    } : {});
} 

export async function fUser(payload: Payload): Promise<DefaultResponseInterface> {
    return request(`/reports/user?${payload ? stringify(payload.params) : ''}`, payload ? {
        body: JSON.stringify(payload.body),
        method: 'POST',
    } : {});
}

export async function fCompany(payload: Payload): Promise<DefaultResponseInterface> {
    return request(`/reports/company?${payload ? stringify(payload.params) : ''}`, payload ? {
        body: JSON.stringify(payload.body),
        method: 'POST',
    } : {});
} 

