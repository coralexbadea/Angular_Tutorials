import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthState } from './auth/auth.reducers';
import { authReducer } from './auth/auth.reducers';

export interface State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
    auth: authReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: [{auth: ['isLoggedin'] }], rehydrate: true})(reducer);
  }
  
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
