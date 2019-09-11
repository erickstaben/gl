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

export async function fCreate(payload:Payload): Promise<DefaultResponseInterface> {
  return request(`/phases?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'POST',
  } : {});
} 

export async function fPhaseNameUpdate(payload: Payload): Promise<DefaultResponseInterface> {
  return request(`/phases/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'PATCH',
  } : {});
} 

export async function fUpdate(payload: Payload): Promise<DefaultResponseInterface> {
  return request(`/phases/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'PATCH',
  } : {});
} 

export async function fPhaseConfig(payload: Payload): Promise<DefaultResponseInterface> {
  return request(`/phases/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, {
    method: 'GET',
  });
} 

