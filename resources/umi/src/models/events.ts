
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
    *newTimer({ payload }, { call, put, select, all }) {


      const timers = yield select((state: ConnectState) => state.events.timers)
      //Pausa se houver um timer ativo
      const active_timers = timers.filter((timer: TimerInterface) => timer.paused == false)
      console.log(active_timers)
      if (active_timers.length > 0) {
        yield put({
          type: 'events/rPauseTimer',
          payload: {
            path_id: [active_timers[0].id]
          }
        })
        yield put({
          type: 'rNewTimer',
          payload: {
            ...payload.params,
            on_finish_unpause: active_timers[0].id
          },
        });
      }
      else {
        yield put({
          type: 'rNewTimer',
          payload: payload.params,
        });
      }
    },
    *endTimer({ payload }, { call, put, select }) {

      const timers = yield select((state: ConnectState) => state.events.timers)
      let timer = timers.filter((timer: TimerInterface) => timer.id == payload.path_id[0])[0]

      if (timer.reference_id && timer.reference_model) {
        yield put({
          type: 'tasks/update',
          payload: {
            body: {
              is_complete: true,
            },
            path_id: [timer.reference_id],
            params: {
              shouldLog: 0,
            }
          }
        })
      } 

      //Despausa o timer que ficou pendente se houver
      if(timer.on_finish_unpause){
        yield put({
          type: 'rPauseTimer',
          payload: {
            path_id: timer.on_finish_unpause
          }
        })
      }      

      timer.duration = Date.now() - timer.last_paused_at
      timer.last_paused_at = Date.now()
      const response: DefaultResponseInterface = yield call(fNewEvent, {body: {
        company_id: timer.company_id,
        duration: Math.round(timer.duration/1000).toString(),
        type: timer.type,
        reference_id: timer.reference_id,
        reference_model: timer.reference_model,
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
        title: payload.title,
        reference_id: payload.reference_id || null,
        reference_model: payload.reference_model || null,
        on_finish_unpause: payload.on_finish_unpause || null,
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
