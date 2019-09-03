import { stringify } from 'qs';
import request from '@/utils/request';
import { DefaultResponseInterface } from '@/models/database';

interface Payload { 
  path_id: Array<number>;
  params: object;
  body: object;
}
export async function fMovePhase(payload:Payload): Promise<DefaultResponseInterface> {
  return request(`/phases/${payload.path_id[0]}/move/${payload.path_id[1]}?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'PATCH',
  } : {});
}

export async function fPhaseNameUpdate(payload:Payload): Promise<DefaultResponseInterface> {
  return request(`/phases/${payload && payload.path_id ? payload.path_id[0] : '0'}?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'PATCH',
  } : {});
}