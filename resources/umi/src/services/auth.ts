import { stringify } from 'qs';
import request from '@/utils/request';
import { UserInterface } from '@/models/database';
import { RequestPayload } from '@/models/connect';

export async function fAuthUser(payload ?: RequestPayload): Promise<UserInterface> {
  return request(`/auth/user?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    headers: {
      'Authorization' : 'Bearer '+ payload.access_token
    }
  } : {});
}

export async function fLogin(payload?: RequestPayload): Promise<UserInterface> {
  return request(`/auth/login?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'POST',
  } : {});
}
