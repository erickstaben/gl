import { stringify } from 'qs';
import request from '@/utils/request';
import { DefaultResponseInterface } from '@/models/database';

interface Payload {
    path_id: Array<number>;
    params: object;
    body: object;
}

export async function fShow(payload: Payload): Promise<DefaultResponseInterface> {
    return request(`/cards/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, payload ? {
        body: JSON.stringify(payload.body),
        method: 'GET',
    } : {});
} 

export async function fUpdateFieldValue(payload: Payload): Promise<DefaultResponseInterface> {
    return request(`/cards/${payload.path_id[0]}/fields/${payload.path_id[1]}?${payload ? stringify(payload.params) : ''}`, payload ? {
        body: JSON.stringify(payload.body),
        method: 'PATCH',
    } : {});
}
