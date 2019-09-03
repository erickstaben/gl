
import { message } from 'antd';
import { Effect } from 'dva';
import { findIndex } from 'lodash';
import { now } from 'umi-plugin-locale';
import { DefaultResponseInterface, PhaseInterface } from './database';
import { Action, Reducer } from './connect';
import { fMovePhase } from '@/services/phases';

export interface PhasesModelState {
}


export interface ModelType {
  namespace: string;
  state: PhasesModelState;
  effects: {
    movePhase: Effect;
  };
  reducers: {};
}

const Model: ModelType = {
  namespace: 'phases',

  state: {},

  effects: {
    *movePhase({ payload }, { call, put }) {
      const response: DefaultResponseInterface = yield call(fMovePhase, payload);
      if (response.ok) {
        yield put({
          type: 'pipes/rMovePhase',
          payload,
        });
      } else {
        message.info('Erro ao tentar salvar')
      }
    },
  },
  reducers: {},
};

export default Model;
