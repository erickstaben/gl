
import { message } from 'antd';
import { Effect } from 'dva';
import { DefaultResponseInterface, PhaseInterface, TimerInterface } from './database';
import { fNewEvent } from '@/services/events';
import { Action, Reducer, ConnectState } from './connect';
import { uuidv4 } from '@/utils/utils';
import { findIndex } from 'lodash';

export interface EventsModelState {
  timers: TimerInterface[];
}


export interface ModelType {
  namespace: string;
  state: EventsModelState
  effects: {
    newEvent: Effect;
    newTimer: Effect;
    endTimer: Effect;
    pauseTimer: Effect;
  };
  reducers: {
    rNewTimer: Reducer<EventsModelState, Action<any>>;
    rEndTimer: Reducer<EventsModelState, Action<any>>;
    rPauseTimer: Reducer<EventsModelState, Action<any>>;
  };
}

const Model: ModelType = {
  namespace: 'events',

  state: {
    timers: []
  },
  effects: {
    *newEvent({ payload }, { call, put }) {      
      const response: DefaultResponseInterface = yield call(fNewEvent, payload);
      if (response.ok) {
        message.info('Evento registrado com sucesso')
      } else {
        message.error('Erro ao tentar salvar')
      }
    },
    *newTimer({ payload }, { call, put }) {
      yield put({
        type: 'rNewTimer',
        payload: payload.params,
      });
    },
    *endTimer({ payload }, { call, put, select }) {
      const timers = yield select((state:ConnectState) => state.events.timers)
      let timer = timers.filter((timer: TimerInterface) => timer.id == payload.path_id[0])[0]
      console.log('oioio', timer)
      timer.duration = Date.now() - timer.last_paused_at
      timer.last_paused_at = Date.now()
      const response: DefaultResponseInterface = yield call(fNewEvent, {body: {
        company_id: timer.company_id,
        duration: Math.round(timer.duration/1000).toString(),
        type: timer.type,
      }});
      if (response.ok) {
        yield put({
          type: 'events/rEndTimer',
          payload: payload,
        });
        message.info('Evento registrado com sucesso')
      } else {
        message.error('Erro ao tentar salvar')
      }
      
    },
    *pauseTimer({ payload }, { call, put }) {
      yield put({
        type: 'events/rPauseTimer',
        payload: payload,
      });
    },
    
  },
  reducers: {    
    rNewTimer(state, { payload }: Action<any>) {
      const newTimer: TimerInterface = {
        last_paused_at: Date.now(),
        id: uuidv4(),
        duration: 0,
        paused: false,
        company_id: payload.company_id,
        type: payload.type,
      }
      return {
        ...state,
        timers: [
          ...state.timers,
          newTimer
        ]
      };
    },
    rPauseTimer(state, { payload }: Action<any>) {
      let timer = state.timers[findIndex(state.timers,{id: payload.path_id[0]})]
      if(timer.paused){
        timer.last_paused_at = Date.now()
        timer.paused = false
        return {
          ...state,
          timers: [
            ...state.timers.filter(timer => timer.id !== payload.path_id[0]),
            timer
          ]
        };
      }
      else{
        timer.duration += Date.now() - timer.last_paused_at
        timer.last_paused_at = Date.now()
        timer.paused = true
        return {
          ...state,
          timers: [
            ...state.timers.filter(timer => timer.id !== payload.path_id[0]),
            timer
          ]
        };
      }
     
    },
    rEndTimer(state, { payload }: Action<any>) {
      const newTimers = state.timers.filter(timer => timer.id !== payload.path_id[0])
      return {
        ...state,
        timers: newTimers,
      };
    },
  },
};

export default Model;
