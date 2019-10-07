import { stringify } from 'qs';
import request from '@/utils/request';
import { UserInterface, ID } from '@/models/database';

interface Requests {
    path_id: ID[],
    params: object,
    body: object,
}

export async function fIndex(payload: Requests): Promise<UserInterface> {
    return request(`/tasks/?${payload ? stringify(payload.params) : ''}`, payload ? {
        method: 'GET',
    } : {});
}

export async function fShow(payload: Requests): Promise<UserInterface> {
    return request(`/tasks/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, payload ? {
        method: 'GET',
    } : {});
}

export async function fUpdate(payload: Requests): Promise<UserInterface> {
    return request(`/tasks/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, payload ? {
        body: JSON.stringify(payload.body),
        method: 'PATCH',
    } : {});
}

export async function fDestroy(payload: Requests): Promise<UserInterface> {
    return request(`/tasks/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, payload ? {
        method: 'DELETE',
    } : {});
}

export async function fStore(payload: Requests): Promise<UserInterface> {
    return request(`/tasks?${payload ? stringify(payload.params) : ''}`, payload ? {
        body: JSON.stringify(payload.body),
        method: 'POST',
    } : {});
}
