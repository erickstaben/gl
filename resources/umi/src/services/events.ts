import { stringify } from 'qs';
import request from '@/utils/request';
import { UserInterface } from '@/models/database';
import { RequestPayload } from '@/models/connect';

export async function fNewEvent(payload ?: RequestPayload): Promise<UserInterface> {
  return request(`/events?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'POST',
  } : {});
}
