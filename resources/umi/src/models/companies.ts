
import { Effect } from 'dva';
import { fIndex, fStore, fDelete } from '@/services/companies';
import { Action, Reducer} from './connect';
import { findIndex } from 'lodash';


export interface CompaniesModelState {
  list: Array<object>;
}


export interface ModelType {
  namespace: string;
  state: CompaniesModelState;
  effects: {
    index: Effect;
    store: Effect;
    delete: Effect;
  };
  reducers: {
    rIndex: Reducer<CompaniesModelState, Action<any>>;
    rStore: Reducer<CompaniesModelState, Action<any>>;
    rDelete: Reducer<CompaniesModelState, Action<any>>;
  };
}

const Model: ModelType = {
  namespace: 'companies',

  state: {
    list: [],
  },

  effects: {
    *index({ payload }, { call, put }) {
      const response = yield call(fIndex, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rIndex',
          payload: response.data,
        });
      }
    },
    *store({ payload }, { call, put }) {
      const response = yield call(fStore, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rStore',
          payload: payload,
        });
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(fDelete, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rDelete',
          payload: payload.path_id[0],
        });
      }
    },
    
  },
  reducers: {
    rIndex(state, { payload }:Action<any>) {
      return {
        ...state,
        list: payload,
      };
    }, 
    rStore(state, { payload }: Action<any>) {
      if(payload.body.id){
        const newList = state.list
        newList[findIndex(newList,{id: payload.body.id})] = payload.body
        return {
          ...state,
          list: newList,
        };
      }
      return {
        ...state,
        list: [...state.list,payload.body],
      };
    },
    rDelete(state, { payload }: Action<any>) {
      return {
        ...state,
        list: state.list.filter(item => item.id !== payload.id),
      };
    },   
  },
};

export default Model;
