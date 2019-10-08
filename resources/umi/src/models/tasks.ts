
import { message } from 'antd';
import { Effect } from 'dva';
import { DefaultResponseInterface, TaskInterface } from './database';
import { Action, Reducer } from './connect';
import { fIndex, fShow, fUpdate, fDestroy, fStore } from '@/services/tasks';
import { findIndex } from 'lodash';

export interface TaskModelState {
    loaded: TaskInterface,
    list: TaskInterface[];
}


export interface ModelType {
    namespace: string;
    state: TaskModelState;
    effects: {
        index: Effect;
        show: Effect;
        update: Effect;
        destroy: Effect;
        store: Effect;
    };
    reducers: {
        rIndex: Reducer<TaskModelState, Action<any>>;
        rShow: Reducer<TaskModelState, Action<any>>;
        rUpdate: Reducer<TaskModelState, Action<any>>;
        rDestroy: Reducer<TaskModelState, Action<any>>;
        rStore: Reducer<TaskModelState, Action<any>>;
    };
}

const Model: ModelType = {
    namespace: 'tasks',

    state: {
        loaded: <TaskInterface>{},
        list: [],
    },

    effects: {
        *index({ payload }, { call, put }) {
            const response = yield call(fIndex, payload);
            if (response.ok) {
                yield put({
                    type: 'rIndex',
                    payload: response.data,
                });
            } else {
                message.error('Não foi possivel carregar!')
            }
        },
        *show({ payload }, { call, put }) {
            const response = yield call(fShow, payload);
            if (response.ok) {
                yield put({
                    type: 'rShow',
                    payload: response.data,
                });
            } else {
                message.error('Não foi possivel carregar!')
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(fUpdate, payload);
            if (response.ok) {
                yield put({type:'processes/index'})
                message.success('Fase atualizada!')
            } else {
                message.error('Não foi possivel atualizar!')
            }
        },
        *destroy({ payload }, { call, put }) {
            const response = yield call(fDestroy, payload);
            if (response.ok) {
                yield put({
                    type: 'rDestroy',
                    payload: response.data,
                });
            } else {
                message.error('Não foi possivel deletar o item!')
            }
        },
        *store({ payload }, { call, put }) {
            const response = yield call(fStore, payload);
            if (response.ok) {
                yield put({
                    type: 'rStore',
                    payload: response.data,
                });
            } else {
                message.error('Não foi possivel salvar!')
            }
        },
    },
    reducers: {
        rIndex(state, { payload }: Action<any>) {
            return {
                ...state,
                list: payload,
            };
        },
        rShow(state, { payload }: Action<any>) {
            return {
                ...state,
                loaded: payload
            };
        },
        rUpdate(state, { payload }: Action<any>) {x
            return {
                ...state,
            };
        },
        rDestroy(state, { payload }: Action<any>) {
            let newList = state.list

            return {
                ...state,
                list: newList
            };
        },
        rStore(state, { payload }: Action<any>) {
            let newList = state.list
            return {
                ...state,
                list: newList
            };
        },
    },
};

export default Model;
