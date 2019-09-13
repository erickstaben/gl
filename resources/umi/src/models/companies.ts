
import { Effect } from 'dva';
import { fIndex } from '@/services/companies';
import { Action, Reducer} from './connect';


export interface CompaniesModelState {
  list: Array<object>;
}


export interface ModelType {
  namespace: string;
  state: CompaniesModelState;
  effects: {
    index: Effect;
  };
  reducers: {
    rIndex: Reducer<CompaniesModelState, Action<any>>;
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
    
  },
  reducers: {
    rIndex(state, { payload }:Action<any>) {
      return {
        ...state,
        list: payload,
      };
    },    
  },
};

export default Model;
