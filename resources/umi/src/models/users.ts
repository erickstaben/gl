
import { Effect } from 'dva';
import { fIndex } from '@/services/users';
import { Action, Reducer} from './connect';


export interface UsersModelState {
  list: Array<object>;
}


export interface ModelType {
  namespace: string;
  state: UsersModelState;
  effects: {
    index: Effect;
  };
  reducers: {
    rIndex: Reducer<UsersModelState, Action<any>>;
  };
}

const Model: ModelType = {
  namespace: 'users',

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
