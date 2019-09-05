
import { message } from 'antd';
import { Effect } from 'dva';
import { DefaultResponseInterface, PhaseInterface } from './database';
import { Action, Reducer } from './connect';
import { fMovePhase, fCreate } from '@/services/phases';

export interface PhasesModelState {
}


export interface ModelType {
  namespace: string;
  state: PhasesModelState;
  effects: {
    movePhase: Effect;
    create: Effect;
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
    *create({ payload }, { call, put }) {
      const response = yield call(fCreate, payload);
      if (response.ok) {       
        yield put({
          type: 'pipes/rPhaseCreate',
          payload: response.data,
        });
        message.success('Fase criada com sucesso')
      } else {
        message.info('Erro ao tentar salvar')
      }
    },
  },
  reducers: {},
};

export default Model;
