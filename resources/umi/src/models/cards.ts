
import { message } from 'antd';
import { Effect } from 'dva';
import { findIndex } from 'lodash';
import { now } from 'umi-plugin-locale';
import { DefaultResponseInterface, CardInterface } from './database';
import { Action, Reducer } from './connect';
import { fCardNameUpdate } from '@/services/cards';

export interface CardsModelState {
}


export interface ModelType {
  namespace: string;
  state: CardsModelState;
  effects: {
    cardNameUpdate: Effect;
  };
  reducers: {
    rCardNameUpdate: Reducer<CardsModelState, Action<DefaultResponseInterface>>;
  };
}

const Model: ModelType = {
  namespace: 'cards',

  state: {},

  effects: {
    *cardNameUpdate({ payload }, { call, put }) {
      const response: DefaultResponseInterface = yield call(fCardNameUpdate, payload);
      if (response.ok) {
        yield put({
          type: 'rCardNameUpdate',
          payload,
        });
      } else {
        message.info('Erro ao tentar salvar')
      }
    },
    *cardMove({ payload }, { call, put }) {
      const response: DefaultResponseInterface = yield call(fCardMove, payload);
      if (response.ok) {
        yield put({
          type: 'rCardMove',
          payload,
        });
      } else {
        message.info('Erro ao tentar movimentar o card')
      }
    },
  },

  reducers: {
    rCardNameUpdate(state, { payload }:Action<any>) {
      const index = findIndex(state.list, { id: payload.path_id[0] || payload.path_id })
      const newList = state.list
      newList[index] = {
        ...newList[index],
        [payload.params.name]: payload.params.value,
      }
      return {
          ...state,
          list: newList,
      }
    },
    rCardMove(state, { payload }:Action<any>) {
      return {
          ...state,
          list: newList,
      }
    },
  },
};

export default Model;
