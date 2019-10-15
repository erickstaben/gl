import { parse, stringify } from 'qs';

import { Effect } from 'dva';
import { routerRedux } from 'dva/router';
import { fAuthUser, fLogin } from '@/services/auth';
import { UserInterface } from './database';
import { Action, Reducer } from './connect';
import { setAuthority } from '@/utils/authority';
import { updateAccessToken } from '@/utils/request';
export function getPageQuery(): {
  [key: string]: string;
} {
  return parse(window.location.href.split('?')[1]);
}

export interface AuthModelState {
  user: UserInterface,
  isLogged: boolean;
}
interface Response {
  ok: boolean;
  data: any;
  message: string;
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
    loginError: Reducer<AuthModelState,Action<any>>;
    rLogout: Reducer<AuthModelState,Action<any>>;
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
      if (window.location.pathname !== '/auth/login' && !redirect) {
        yield put({
          type: 'rLogout',
        })
        yield put(
          routerRedux.replace({
            pathname: '/auth/login',
            /*search: stringify({
              redirect: window.location.href,
            }),*/
          }),
        );
      }
    },
    *login({payload}, { put, call }) {
      const response:Response = yield call(fLogin, payload);
      if(response.data){
        localStorage.setItem('access-token', response.data.access_token)
        if(response.ok && response.data.access_token){
          setAuthority(response.data.authority || 'super')
          yield put({
            type: 'authUser',
            payload: response.data,
          });
        }
      }  
      else{
        yield put({
          type: 'loginError',
          payload: response.message,
        });
      }    
    },
    *authUser({payload}, { call, put }) {
      console.log('1')
      const response = yield call(fAuthUser, { access_token: payload.access_token});
      if (response.ok){
        yield put({
          type: 'updateUserModel',
          payload: response.data,
        });
        if(window.location.pathname == '/auth/login'){
          updateAccessToken()
          window.location.href = window.location.origin
        }
      }
      else{        
        updateAccessToken()
        yield put(
          routerRedux.replace({
            pathname: '/auth/login',
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
    loginError(state, { payload }:Action<any>) {
      return {
        ...state,
        error : payload,
      };
    },
    rLogout(state, { payload }:Action<any>) {
      return {
        user: <UserInterface>{},
        isLogged: false,
      };
    },
  },
};

export default Model;
