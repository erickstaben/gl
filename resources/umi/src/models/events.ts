
import { message } from 'antd';
import { Effect } from 'dva';
import { DefaultResponseInterface, PhaseInterface } from './database';
import { fNewEvent } from '@/services/events';

export interface PhasesModelState {
  loaded:{
    config: PhaseInterface;
  },
  list: PhaseInterface[];
}


export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    newEvent: Effect;
  };
  reducers: {

  };
}

const Model: ModelType = {
  namespace: 'events',

  state: {},

  effects: {
    *newEvent({ payload }, { call, put }) {
      const response: DefaultResponseInterface = yield call(fNewEvent, payload);
      if (response.ok) {
        message.info('Evento registrado com sucesso')
      } else {
        message.error('Erro ao tentar salvar')
      }
    },
    
  },
  reducers: {    
  },
};

export default Model;
