
import { Effect } from 'dva';
import { fPipeFavorite, fPipeCreate, fPipeDelete, fPipesOverview, fPipeConfig, fPipeShow } from '@/services/pipes';

import { PipeInterface, ID } from './database';
import { Action, Reducer, PayloadInterface } from './connect';

interface PipesOverviewInterface {
  name: string;
  totalCards: number;
  id: ID;
  is_favorite ?: boolean;
}

export interface PipeConfigInterface {
  notifications: boolean
}

export interface PipesModelState {
  loaded: PipeInterface & {
    config ?: PipeConfigInterface
  }
  overview: PipesOverviewInterface[];
}


export interface ModelType {
  namespace: string;
  state: PipesModelState;
  effects: {
    pipeCreate: Effect;
    pipeDelete: Effect;
    pipeFavorite: Effect;
    pipeConfig: Effect;
    pipesOverview: Effect;
    pipeShow: Effect;
  };
  reducers: {
    rPipeCreate: Reducer<PipesModelState, Action<any>>;
    rPipeDelete: Reducer<PipesModelState, Action<any>>;
    rPipeFavorite: Reducer<PipesModelState, Action<PayloadInterface>>;
    rPipeConfig: Reducer<PipesModelState, Action<PayloadInterface>>;
    rPipesOverview: Reducer<PipesModelState, Action<PipesOverviewInterface>>;
    rPipeShow: Reducer<PipesModelState, Action<PipeInterface>>;
  };
}

const Model: ModelType = {
  namespace: 'pipes',

  state: {
    loaded: <PipeInterface>{},
    overview: [],
  },

  effects: {
    *pipeCreate({ payload }, { call, put }) {
      const response = yield call(fPipeCreate, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rPipeCreate',
          payload: response.data,
        });
      }
    },
    *pipeDelete({ payload }, { call, put }) {
      const response = yield call(fPipeDelete, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rPipeDelete',
          payload: response.data,
        });
      }
    },
    *pipeFavorite({ payload }, { call, put }) {
      yield put({
        type: 'rPipeFavorite',
        payload,
      });
      call(fPipeFavorite, payload);
    },
    *pipeConfig({ payload }, { call, put }) {
      const response = call(fPipeConfig, payload);
      yield put({
        type: 'rPipeConfig',
        payload: response.data,
      });
    },
    *pipesOverview({ payload }, { call, put }) {
      const response = yield call(fPipesOverview, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rPipesOverview',
          payload: response.data,
        });
      }
    },
    *pipeShow({ payload }, { call, put }) {
      const response = yield call(fPipeShow, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rPipeShow',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    rPipeCreate(state, { payload }:Action<PipesOverviewInterface>) {
      return {
        ...state,
        overview: [
          ...state.overview,
          {
            name: payload.name,
            totalCards: payload.totalCards || 0,
            id: payload.id,
          },
        ],
      };
    },
    rPipeDelete(state, { payload }:Action<PipesOverviewInterface>) {
      const newOverview = state.overview.filter((o:PipesOverviewInterface) => o.id !== payload.id)
      return {
        ...state,
        overview: newOverview,
      };
    },
    rPipeFavorite(state, { payload }:Action<PayloadInterface>) {
      const newOverview = state.overview.map((o:PipesOverviewInterface) => (o.id === payload.path_id[0] ? {
        ...o,
        is_favorite: !o.is_favorite,
      } : o))
      return {
        ...state,
        overview: newOverview,
      };
    },
    rPipesOverview(state:any, { payload }:Action<PipesOverviewInterface>) {
      return {
        ...state,
        overview: payload,
      };
    },
    rPipeConfig(state:any, { payload }:Action<PayloadInterface>) {
      const newOverview = state.overview.map((o:PipesOverviewInterface) => (o.id === payload.path_id[0] ? o.is_favorite = true : o))
      return {
        ...state,
        overview: newOverview,
      };
    },
    rPipeShow(state:any, { payload }:Action<PipeInterface>) {
      return {
        ...state,
        loaded: payload,
      };
    },
  },
};

export default Model;
