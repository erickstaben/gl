import { stringify } from 'qs';
import request from '@/utils/request';
import { UserInterface, ID } from '@/models/database';

interface PipeRequests {
  path_id: ID
  params: object,
  body: object,
}

export async function fPipeFavorite(payload: PipeRequests): Promise<UserInterface> {
  return request(`/pipes/${payload.path_id[0]}/favorite?${payload ? stringify(payload.params) : ''}`, payload ? {
    method: 'PATCH',
  } : {});
}

export async function fPipeCreate(payload : PipeRequests): Promise<UserInterface> {
  return request(`/pipes?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'POST',
  } : {});
}

export async function fPipeDelete(payload : PipeRequests): Promise<UserInterface> {
  return request(`/pipes/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, payload ? {
    method: 'DELETE',
  } : {});
}

export async function fPipesOverview(payload : PipeRequests): Promise<UserInterface> {
  return request(`/pipes/overview?${payload ? stringify(payload.params) : ''}`, payload ? {
    method: 'GET',
  } : {});
}

export async function fPipeConfig(payload : PipeRequests): Promise<UserInterface> {
  return request(`/pipes/${payload.path_id[0]}/config?${payload ? stringify(payload.params) : ''}`, payload ? {
    method: 'GET',
  } : {});
}

export async function fPipeShow(payload : PipeRequests): Promise<UserInterface> {
  return request(`/pipes/${payload.path_id[0]}?${payload ? stringify(payload.params) : ''}`, payload ? {
    method: 'GET',
  } : {});
}

export async function fCardMove(payload : PipeRequests): Promise<UserInterface> {
  return request(`/cards/${payload.path_id[0]}/move/${payload.path_id[1]}?${payload ? stringify(payload.params) : ''}`, payload ? {
    method: 'GET',
  } : {});
}

export async function fPhaseNameUpdate(payload : PipeRequests): Promise<UserInterface> {
  return request(`/phases/${payload && payload.path_id ? payload.path_id[0] : '0'}?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'PATCH',
  } : {});
}

export async function fSaveRecurrentCard(payload:any){
  return request(`/pipes/${payload.path_id[0]}/recurrentCards?${payload ? stringify(payload.params) : ''}`, {
    body: JSON.stringify(payload.body),
    method: 'POST',
  });
}

export async function fSavePipeUser(payload:any){
  return request(`/pipes/${payload.path_id[0]}/users?${payload ? stringify(payload.params) : ''}`, {
    body: JSON.stringify(payload.body),
    method: 'POST',
  });
}
