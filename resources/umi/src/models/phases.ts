
import { message } from 'antd';
import { Effect } from 'dva';
import { DefaultResponseInterface, PhaseInterface } from './database';
import { Action, Reducer } from './connect';
import { fMovePhase, fCreate, fUpdate, fPhaseConfig } from '@/services/phases';

export interface PhasesModelState {
  loaded:{
    config: PhaseInterface;
  },
  list: PhaseInterface[];
}


export interface ModelType {
  namespace: string;
  state: PhasesModelState;
  effects: {
    movePhase: Effect;
    create: Effect;
    update: Effect;
    phaseConfig: Effect;
  };
  reducers: {
    rUpdate: Reducer<PhasesModelState, Action<any>>;
    rPhaseConfig: Reducer<PhasesModelState, Action<any>>;
  };
}

const Model: ModelType = {
  namespace: 'phases',

  state: {
    loaded: {
      config: <PhaseInterface>{},
    },
    list: [],
  },

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
    *update({ payload }, { call, put }) {
      const response = yield call(fUpdate, payload);
      if (response.ok) {       
        yield put({
          type: 'phases/rUpdate',
          payload: response.data,
        });
        message.success('Fase atualizada!')
      } else {
        message.info('Erro ao tentar salvar')
      }
    },
    *phaseConfig({ payload }, { call, put }) {
      const response = yield call(fPhaseConfig, payload);
      if (response.ok) {       
        yield put({
          type: 'phases/rPhaseConfig',
          payload: response.data,
        });
      } else {
        message.info('Erro ao tentar recuperar fase. Atualize a tela.')
      }
    },
  },
  reducers: {
    rUpdate(state, { payload }:Action<any>) {
      return {
        ...state,
        loaded: {
          ...state.loaded,
          config: payload,
        }
      };
    },
    rPhaseConfig(state, { payload }:Action<any>) {
      return {
        ...state,
        loaded: {
          ...state.loaded,
          config: payload,
        }
      };
    },
  },
};

export default Model;
