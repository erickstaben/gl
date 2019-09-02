
import { Effect } from 'dva';
import { fPipeFavorite, fPipeCreate, fPipeDelete, fPipesOverview, fPipeConfig, fPipeShow, fCardMove } from '@/services/pipes';

import { PipeInterface, ID, CardInterface } from './database';
import { Action, Reducer, PayloadInterface } from './connect';

interface PipesOverviewInterface {
  name: string;
  totalCards: number;
  id: ID;
  is_favorite ?: boolean;
}
interface InnerPhase {
  index: number;
  id: ID;
}
interface CardMovePayload{
  card: CardInterface;
  oldPhase: InnerPhase;
  newPhase: InnerPhase;
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
    cardMove: Effect;
  };
  reducers: {
    rPipeCreate: Reducer<PipesModelState, Action<any>>;
    rPipeDelete: Reducer<PipesModelState, Action<any>>;
    rPipeFavorite: Reducer<PipesModelState, Action<PayloadInterface>>;
    rPipeConfig: Reducer<PipesModelState, Action<PayloadInterface>>;
    rPipesOverview: Reducer<PipesModelState, Action<PipesOverviewInterface>>;
    rPipeShow: Reducer<PipesModelState, Action<PipeInterface>>;
    rCardMove: Reducer<PipesModelState, Action<CardMovePayload>>;
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
    *cardMove({ payload }, { call, put }){
      yield put({
        type: 'rCardMove',
        payload: payload,
      });
      const response = yield call(fCardMove, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rCardMove',
          payload: payload,
        });
      }      
    }
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
    rCardMove(state: any, { payload }: Action<CardMovePayload>) {
      const { card, oldPhase, newPhase } = payload
      console.log(card, oldPhase, newPhase)
      const newPhases = state.loaded.phases;
      newPhases[oldPhase.index].cards = newPhases[oldPhase.index].cards.filter((c: CardInterface) => c.id !== card.id)
      newPhases[newPhase.index].cards.push(card)
      console.log(newPhases,'oioi')
      return {
        ...state,
        loaded: {
          ...state.loaded,
          phases: newPhases,
        }
      };
    },
    
  },
};

export default Model;
