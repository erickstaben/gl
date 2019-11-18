
import { message } from 'antd';
import { Effect } from 'dva';
import { DefaultResponseInterface, CardInterface } from './database';
import { Action, Reducer } from './connect';
import { fShow, fUpdateFieldValue } from '@/services/cards';
import { findIndex } from 'lodash';

export interface CardsModelState {
  loaded: CardInterface;
}


export interface ModelType {
  namespace: string;
  state: CardsModelState;
  effects: {
    show: Effect;
    updateFieldValue: Effect;
  };
  reducers: {
    rUpdateFieldValue: Reducer<CardsModelState, Action<any>>;
  };
}

const Model: ModelType = {
  namespace: 'cards',

  state: {
    loaded: <CardInterface>{},
  },

  effects: {
    *show({ payload }, { call, put }) {
      const response = yield call(fShow, payload);
      if (response.ok) {       
        yield put({
          type: 'rShow',
          payload: response.data,
        });
      } else {
        message.info('Erro ao tentar salvar')
      }
    },
    *updateFieldValue({ payload }, { call, put }) {
      const response = yield call(fUpdateFieldValue, payload);
      if (response.ok) {
        yield put({
          type: 'rUpdateFieldValue',
          payload: response.data,
        });
        yield put({
          type: 'pipes/rUpdatePipeList',
          payload: response.data,
        });
      } else {
        message.info('Erro ao tentar salvar')
      }
    },
  },
  
  reducers: {
    rShow(state: CardsModelState, { payload }: Action<any>) {      
      return {
        ...state,
        loaded: payload,
      };
    },
    rUpdateFieldValue(state: CardsModelState, { payload }: Action<any>) {
      return {
        ...state,
        loaded: payload,
      };
    },
  },
};

export default Model;
