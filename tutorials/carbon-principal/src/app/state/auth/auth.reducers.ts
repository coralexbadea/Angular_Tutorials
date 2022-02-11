import { ActionReducerMap, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { AuthActionTypes, AuthActions } from './auth.actions';

export interface AuthState{
    isLoggedin: boolean;
}

export const initialState: AuthState = {
    isLoggedin: false,
};

export function authReducer(state:AuthState = initialState, action: AuthActions):AuthState{
    switch(action.type){
        case AuthActionTypes.LOGIN:{
            return {
                ...state,
                isLoggedin: false,
            };
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggedin: true,
            };
        }
        case AuthActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                isLoggedin: false
            }
        }

        case AuthActionTypes.LOGGED_OUT:{
            return {
                ...state,
                isLoggedin:false
            }
        }
        default: 
            return state;
        
    }
}