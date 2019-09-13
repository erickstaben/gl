import { stringify } from 'qs';
import request from '@/utils/request';
import { DefaultResponseInterface } from '@/models/database';

interface Payload { 
  path_id: Array<number>;
  params: object;
  body: object;
}
export async function fIndex(payload:Payload): Promise<DefaultResponseInterface> {
  return request(`/users?${payload ? stringify(payload.params) : ''}`, {
    method: 'GET',
  });
}

