
import { message } from 'antd';
import { Effect } from 'dva';
import { DefaultResponseInterface, ReportInterface, ProcessInterface } from './database';
import { Action, Reducer } from './connect';
import { fProcess, fUser, fCompany } from '@/services/reports';
import { findIndex } from 'lodash';

export interface ReportsModelState {
  process: ProcessInterface[];
  user: any[];
  company: any[];
}


export interface ModelType {
  namespace: string;
  state: ReportsModelState;
  effects: {
    process: Effect;
    user: Effect;
    company: Effect;
  };
  reducers: {
    rProcess: Reducer<ReportsModelState, Action<any>>;
    rUser: Reducer<ReportsModelState, Action<any>>;
    rCompany: Reducer<ReportsModelState, Action<any>>;
  };
}

const Model: ModelType = {
  namespace: 'reports',

  state: {
    process: [],
    user: [],
    company: [],
  },

  effects: {
    *process({ payload }, { call, put }) {
      const response = yield call(fProcess, payload);
      if (response.ok) {       
        yield put({
          type: 'rProcess',
          payload: response.data,
        });
      } else {
        message.info('Erro ao tentar salvar')
      }
    },  
    *user({ payload }, { call, put }) {
      const response = yield call(fUser, payload);
      if (response.ok) {       
        yield put({
          type: 'rUser',
          payload: response.data,
        });
      } else {
        message.info('Erro ao tentar salvar')
      }
    }, 
    *company({ payload }, { call, put }) {
      const response = yield call(fCompany, payload);
      if (response.ok) {       
        yield put({
          type: 'rCompany',
          payload: response.data,
        });
      } else {
        message.info('Erro ao tentar salvar')
      }
    },
  },
  reducers: {
    rProcess(state: ReportsModelState, { payload }: Action<any>) {      
      return {
        ...state,
        process: payload,
      };
    },
    rUser(state: ReportsModelState, { payload }: Action<any>) {      
      return {
        ...state,
        user: payload,
      };
    },
    rCompany(state: ReportsModelState, { payload }: Action<any>) {
      return {
        ...state,
        company: payload,
      };
    },
  },
};

export default Model;
