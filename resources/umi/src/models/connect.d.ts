import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { Pipe } from 'stream';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { AuthModelState } from './auth';
import { ID, PhaseInterface, ReportInterface } from './database';
import { PhasesModelState } from './phases';
import { PipesModelState } from './pipes';
import { CompaniesModelState } from './companies';
import { ProcessModelState } from './processes';
import { EventsModelState } from './events';
import { ReportsModelState } from './reports';

export { GlobalModelState, SettingModelState, UserModelState };
export interface RequestPayload {
  params ?: Record<string, any>,
  path_id ?: number[],
  body ?: Record<string, any> | string,
}

export interface Action<T> {
  payload : T,
  type ?: string,
}
export type Reducer<S, A> = (state:S, action:A) => S;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
  };
}
export interface PayloadInterface {
  params ?: Record<string, any>,
  path_id ?: ID[],
  body ?: Record<string, any>,
  headers ?: Record<string, any>,
}

export interface ConnectState {
  processes: ProcessModelState;
  reports: ReportsModelState;
  events: EventsModelState;
  global: GlobalModelState;
  loading: Loading;
  companies: CompaniesModelState;
  settings: SettingModelState;
  user: UserModelState;
  auth: AuthModelState;
  phases: PhasesModelState;
  pipes: PipesModelState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch;
}
