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
