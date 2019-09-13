import { parse, stringify } from 'qs';

import { Effect } from 'dva';
import { routerRedux } from 'dva/router';
import { fAuthUser } from '@/services/auth';
import { UserInterface } from './database';
import { Action, Reducer } from './connect';

export function getPageQuery(): {
  [key: string]: string;
} {
  return parse(window.location.href.split('?')[1]);
}

export interface AuthModelState {
  user: UserInterface,
}


export interface ModelType {
  namespace: string;
  state: AuthModelState;
  effects: {
    logout: Effect;
    authUser: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<AuthModelState, Action<any>>;
    updateUserModel: Reducer<AuthModelState, Action<UserInterface>>;
  };
}

const Model: ModelType = {
  namespace: 'auth',

  state: {
    user: <UserInterface>{},
  },

  effects: {
    *logout(_, { put }) {
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
    *authUser(_, { call, put }) {
      const response: UserInterface = yield call(fAuthUser);
      if (response.ok){
        yield put({
          type: 'updateUserModel',
          payload: response,
        });
      }
      else{
        yield put(
          routerRedux.replace({
            pathname: '/auth/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    updateUserModel(state, { payload }:Action<UserInterface>) {
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    },
  },
};

export default Model;
