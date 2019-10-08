
import { message } from 'antd';
import { Effect } from 'dva';
import { DefaultResponseInterface, ProcessInterface } from './database';
import { Action, Reducer } from './connect';
import { fIndex, fShow, fUpdate, fDestroy, fStore } from '@/services/processes';
import { findIndex } from 'lodash';

export interface ProcessModelState {
    loaded: ProcessInterface,
    list: ProcessInterface[];
}


export interface ModelType {
    namespace: string;
    state: ProcessModelState;
    effects: {
        index: Effect;
        show: Effect;
        update: Effect;
        destroy: Effect;
        store: Effect;
    };
    reducers: {
        updateTask: Reducer<ProcessModelState, Action<any>>;
        rIndex: Reducer<ProcessModelState, Action<any>>;
        rShow: Reducer<ProcessModelState, Action<any>>;
        rUpdate: Reducer<ProcessModelState, Action<any>>;
        rDestroy: Reducer<ProcessModelState, Action<any>>;
        rStore: Reducer<ProcessModelState, Action<any>>;
    };
}

const Model: ModelType = {
    namespace: 'processes',

    state: {
        loaded: <ProcessInterface>{},
        list: [],
    },

    effects: {
        *index({ payload }, { call, put }) {
            const response = yield call(fIndex, payload);
            if (response.ok) {
                yield put({
                    type: 'processes/rIndex',
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
                    type: 'processes/rShow',
                    payload: response.data,
                });
            } else {
                message.error('Não foi possivel carregar!')
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(fUpdate, payload);
            if (response.ok) {
                yield put({
                    type: 'processes/rUpdate',
                    payload: response.data,
                });
                message.success('Fase atualizada!')
            } else {
                message.error('Não foi possivel atualizar!')
            }
        },
        *destroy({ payload }, { call, put }) {
            const response = yield call(fDestroy, payload);
            if (response.ok) {
                yield put({
                    type: 'processes/rDestroy',
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
                    type: 'processes/rStore',
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
        rUpdate(state, { payload }: Action<any>) {
            let newLoaded = state.loaded
            // fazer algo
            return {
                ...state,
                loaded: newLoaded
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
