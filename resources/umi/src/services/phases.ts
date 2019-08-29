import { stringify } from 'qs';
import request from '@/utils/request';
import { DefaultResponseInterface } from '@/models/database';
import { RequestPayload } from '@/models/connect';

export async function fPhaseNameUpdate(payload ?: RequestPayload): Promise<DefaultResponseInterface> {
  return request(`/phases/${payload && payload.path_id ? payload.path_id[0] : '0'}?${payload ? stringify(payload.params) : ''}`, payload ? {
    body: JSON.stringify(payload.body),
    method: 'PATCH',
  } : {});
}
