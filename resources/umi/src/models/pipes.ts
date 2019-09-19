
import { Effect } from 'dva';
import { fPipeFavorite, fPipeCreate, fPipeDelete, fPipesOverview, fPipeConfig, fPipeShow, fCardMove, fSaveRecurrentCard, fSavePipeUser } from '@/services/pipes';
import { message } from 'antd';
import { PipeInterface, ID } from './database';
import { Action, Reducer, PayloadInterface } from './connect';
import { fPhaseNameUpdate } from '@/services/phases';
import { findIndex } from 'lodash';

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
  loadingCardId ?: number;
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
    phaseNameUpdate: Effect;
    saveRecurrentCard: Effect;
    savePipeUser: Effect;
  };
  reducers: {
    rUpdatePipeList: Reducer<PipesModelState, Action<any>>;
    rPipeCreate: Reducer<PipesModelState, Action<any>>;
    rPipeDelete: Reducer<PipesModelState, Action<any>>;
    rPipeFavorite: Reducer<PipesModelState, Action<PayloadInterface>>;
    rPipeConfig: Reducer<PipesModelState, Action<PayloadInterface>>;
    rPipesOverview: Reducer<PipesModelState, Action<PipesOverviewInterface>>;
    rPipeShow: Reducer<PipesModelState, Action<PipeInterface>>;
    rMovePhase: Reducer<PipesModelState, Action<any>>;
    rPhaseNameUpdate: Reducer<PipesModelState, Action<any>>;
    rPhaseCreate: Reducer<PipesModelState, Action<any>>;
    rCardMove: Reducer<PipesModelState, Action<any>>;
    rSaveRecurrentCard: Reducer<PipesModelState, Action<any>>;
    rSavePipeUser: Reducer<PipesModelState, Action<any>>;
  };
}

const Model: ModelType = {
  namespace: 'pipes',

  state: {
    loaded: <PipeInterface>{},
    overview: [],
    loadingCardId: undefined,
  },

  effects: {
    *saveRecurrentCard({ payload }, { call, put }) {
      const response = yield call(fSaveRecurrentCard, payload);
      if (response.ok && response.data) {
        message.success(response.message)
        yield put({
          type: 'rSaveRecurrentCard',
          payload: response.data,
        });
      }
    },
    *savePipeUser({ payload }, { call, put }) {
      const response = yield call(fSavePipeUser, payload);
      if (response.ok && response.data) {
        message.success(response.message)
        yield put({
          type: 'rSavePipeUser',
          payload: response.data,
        });
      }
    },
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
          type: 'rPipeShow',
          payload: response.data,
        });
        message.success('Card movido com sucesso')
      }      
    },
    *phaseNameUpdate({ payload }, { call, put }){      
      const response = yield call(fPhaseNameUpdate, payload);
      if (response.ok && response.data) {
        yield put({
          type: 'rPhaseNameUpdate',
          payload: response.data,
        });
      }      
    }
  },
  reducers: {
    rUpdatePipeList(state, { payload }: Action<any>) {
      const index = findIndex(state.loaded.phases, { id: payload.phase.id })
      let newPhases = state.loaded.phases
      if(index >= 0){
        const newCards = newPhases[index].cards.filter(card => card.id !== payload.id)
        console.log('tamanho', newCards.length, newPhases[index].cards.length)
        newPhases[index].cards = [...newCards, payload]
      }
      return {
        ...state,
        loaded: {
          ...state.loaded,
          phases: newPhases,
        }
      };
    },
    rSaveRecurrentCard(state, { payload }:Action<any>) {
      return {
        ...state,
        loaded: {
          ...state.loaded,
          recurrent_cards: payload.recurrent_cards
        }
      };
    },
    rSavePipeUser(state, { payload }:Action<any>) {
      return {
        ...state,
        loaded: {
          ...state.loaded,
          users: payload.users
        }
      };
    },
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
    rCardMove(state: any, { payload }: Action<any>) {
      const { oldPhase,newPhase,card  }= payload
      
      let phases = state.loaded.phases

      const oldPhaseIndex = findIndex(phases, { id: oldPhase.droppableId || oldPhase.id })
      const newPhaseIndex = findIndex(phases, { id: newPhase.droppableId || newPhase.id })

      phases[oldPhaseIndex].cards = phases[oldPhaseIndex].cards.filter(card => card.id !== payload.path_id[0])
      phases[newPhaseIndex].cards.push(card)
     
      return {
        ...state,
        loaded: {
          ...state.loaded,
          phases: phases
        },
        loadingCardId: card.id 
      };
    },
    rPipeShow(state:any, { payload }:Action<PipeInterface>) {
      return {
        ...state,
        loaded: payload,
        loadingCardId: undefined,
      };
    }, 
    rMovePhase(state: any, { payload }: Action<PayloadInterface>) {
      const newPhases = state.loaded.phases
      const phaseToBeMoved = findIndex(newPhases,{ id: payload.path_id[0] })
      const phaseMoved = findIndex(newPhases, { id: payload.path_id[1] })
      let temp = newPhases[phaseToBeMoved].order 
      newPhases[phaseToBeMoved].order = newPhases[phaseMoved].order
      newPhases[phaseMoved].order = temp
      return {
        ...state,
        loaded: {
          ...state.loaded,
          phases: newPhases
        },
      };
    },
    rPhaseNameUpdate(state:any, { payload }:Action<PipeInterface>) {
      const newPhases = state.loaded.phases
      newPhases[findIndex(state.loaded.phases,{id: payload.id})] = {
        ...newPhases[findIndex(state.loaded.phases,{id: payload.id})],
        ...payload,
      }
      return {
        ...state,
        loaded: {
          ...state.loaded,
          phases: newPhases
        },
      };
    },
    rPhaseCreate(state: any, { payload }: Action<any>) {   
      const oldPhases = state.loaded.phases.map(phase => ({...phase,order: phase.order >= payload.order ? phase.order+1 : phase.order }))   
      return {
        ...state,
        loaded: {
          ...state.loaded,
          phases: [
            ...oldPhases,
            {...payload}
          ]
        },
      };
    },
  },
};

export default Model;
