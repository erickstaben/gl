
import { message } from 'antd';
import { Effect } from 'dva';
import { findIndex } from 'lodash';
import { now } from 'umi-plugin-locale';
import { DefaultResponseInterface, PhaseInterface } from './database';
import { Action, Reducer } from './connect';
import { fPhaseNameUpdate } from '@/services/phases';

export interface PhasesModelState {
  list: PhaseInterface[],
}


export interface ModelType {
  namespace: string;
  state: PhasesModelState;
  effects: {
    phaseNameUpdate: Effect;
  };
  reducers: {
    rPhaseNameUpdate: Reducer<PhasesModelState, Action<DefaultResponseInterface>>;
  };
}

const Model: ModelType = {
  namespace: 'phases',

  state: {
    list: [
      {
        id: 1,
        name: 'Phase 1',
        is_final: false,
        order: 1,
        description: 'Descrição',
        client_status: 'Em andamento',
        cards: [
          {
            id: 1,
            due_date: now(),
            company: {
              name: 'Algum nome',
              cnpj: '00090322/10002',
            },
            fields: [
                {
                    id: 1,
                    field_type: 'input',
                    label: 'Campo 1',
                    created_at: null,
                    updated_at: null,
                    pivot: {
                        card_id: 1,
                        phase_field_id: 1,
                        value: 'Campo 3',
                    },
                },
            ],
            assigned_users: [
              {
                id: 1,
                name: 'Erick Staben',
                email: 'christina95@example.net',
                phone: '1-391-771-3790 x25152',
                about: 'Eum in hic consectetur qui ad repellendus architecto porro ad officia.',
                is_admin: false,
                created_at: '2019-08-20 21:15:30',
                updated_at: '2019-08-20 21:15:30',
              },
            ],
            title: 'Titulo',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 2,
            due_date: new Date(),
            company: {
              name: 'Algum nome 2',
              cnpj: '23123122/10002',
            },
            fields: [
                {
                    id: 1,
                    field_type: 'input',
                    label: 'Campo 1',
                    created_at: null,
                    updated_at: null,
                    pivot: {
                        card_id: 1,
                        phase_field_id: 1,
                        value: 'Campo 3',
                    },
                },
            ],
            assigned_users: [
              {
                id: 1,
                name: 'Erick Staben',
                email: 'christina95@example.net',
                phone: '1-391-771-3790 x25152',
                about: 'Eum in hic consectetur qui ad repellendus architecto porro ad officia.',
                is_admin: false,
                created_at: '2019-08-20 21:15:30',
                updated_at: '2019-08-20 21:15:30',
              }, {
                id: 1,
                name: 'Erick Staben 2',
                email: 'christina95@example.net',
                phone: '1-391-771-3790 x25152',
                about: 'Eum in hic consectetur qui ad repellendus architecto porro ad officia.',
                is_admin: false,
                created_at: '2019-08-20 21:15:30',
                updated_at: '2019-08-20 21:15:30',
              },
            ],
            title: 'Titulo',
            created_at: new Date(),
            updated_at: new Date(),
          },

        ],
      },
    ],
  },

  effects: {
    *phaseNameUpdate({ payload }, { call, put }) {
      const response: DefaultResponseInterface = yield call(fPhaseNameUpdate, payload);
      if (response.ok) {
        yield put({
          type: 'rPhaseNameUpdate',
          payload,
        });
      } else {
        message.info('Erro ao tentar salvar')
      }
    },
  },

  reducers: {
    rPhaseNameUpdate(state, { payload }:Action<any>) {
      const index = findIndex(state.list, { id: payload.path_id[0] || payload.path_id })
      const newList = state.list
      newList[index] = {
        ...newList[index],
        [payload.params.name]: payload.params.value,
      }
      return {
          ...state,
          list: newList,
      }
    },
  },
};

export default Model;
