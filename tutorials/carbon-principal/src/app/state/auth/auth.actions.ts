import {Action} from '@ngrx/store';


export enum AuthActionTypes {
    LOGIN = '[Auth] - Login',
    LOGIN_SUCCESS = '[Auth] Login success',
    LOGIN_FAILED = '[Auth] Login failed',
    LOGGED_OUT = '[Auth] LOGGED_OUT'
};

export class Login implements Action{
    readonly type = AuthActionTypes.LOGIN;
    payload: any;
    constructor(){};
};

export class LoginSuccess implements Action{
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(){}
};

export class LoginFailed implements Action{
    readonly type = AuthActionTypes.LOGIN_FAILED;
    constructor() {}
};

export class Logout implements Action{
    readonly type = AuthActionTypes.LOGGED_OUT;
    constructor(){}
}

export type AuthActions = Login | LoginSuccess | LoginFailed | Logout;