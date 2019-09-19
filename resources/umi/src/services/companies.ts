import { stringify } from 'qs';
import request from '@/utils/request';
import { DefaultResponseInterface } from '@/models/database';

interface Payload { 
  path_id: Array<number>;
  params: object;
  body: object;
}
export async function fIndex(payload:Payload): Promise<DefaultResponseInterface> {
  return request(`/companies?${payload ? stringify(payload.params) : ''}`, {
    method: 'GET',
  });
}

export async function fStore(payload: Payload): Promise<DefaultResponseInterface> {
  return request(`/companies${payload.body.id  ? '/' + payload.body.id : ''}?${payload ? stringify(payload.params) : ''}`, {
    method: payload.body.id ? 'PATCH' : 'POST',
    body: JSON.stringify(payload.body),
  });
}

export async function fDelete(payload: Payload): Promise<DefaultResponseInterface> {
  return request(`/companies?${payload ? stringify(payload.params) : ''}`, {
    method: 'DELETE',
  });
}

