import { parse, stringify } from 'qs';

import { Effect } from 'dva';
import { routerRedux } from 'dva/router';
import { fAuthUser, fLogin } from '@/services/auth';
import { UserInterface } from './database';
import { Action, Reducer } from './connect';
import { setAuthority } from '@/utils/authority';

export function getPageQuery(): {
  [key: string]: string;
} {
  return parse(window.location.href.split('?')[1]);
}

export interface AuthModelState {
  user: UserInterface,
  isLogged: boolean;
}


export interface ModelType {
  namespace: string;
  state: AuthModelState;
  effects: {
    logout: Effect;
    authUser: Effect;
    login: Effect;
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
    isLogged: false,
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
    *login({payload}, { put, call }) {
      const response = yield call(fLogin, payload);
      localStorage.setItem('access-token', response.data.access_token)
      if(response.ok){
        setAuthority(response.data.authority || 'admin')
        yield put({
          type: 'authUser',
          payload: response.data,
        });
      }
    },
    *authUser({payload}, { call, put }) {
      const response = yield call(fAuthUser, { access_token: payload.access_token});
      if (response.ok){
        yield put({
          type: 'updateUserModel',
          payload: response.data,
        });
        console.log(getPageQuery(), 'oi', window.location.pathname)
        if(window.location.pathname == '/auth/login'){
          yield put(routerRedux.replace({
            pathname: getPageQuery().redirect || '/',
          }))
        }
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
      };
    },
    updateUserModel(state, { payload }:Action<UserInterface>) {
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
        isLogged: true,
      };
    },
  },
};

export default Model;
