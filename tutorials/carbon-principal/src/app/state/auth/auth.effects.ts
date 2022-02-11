import { Injectable } from "@angular/core";
import { Actions, createEffect} from '@ngrx/effects';
import { EMPTY, of } from "rxjs";

import { mapTo, catchError } from 'rxjs/operators';
import { ofType } from "@ngrx/effects";
import { AuthActionTypes, LoginSuccess, LoginFailed } from "./auth.actions";
@Injectable()
export class AuthEffects{
    constructor(
        private actions: Actions,
    ){}
    Login$ = createEffect(() => this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        mapTo(new LoginSuccess()),
        catchError(()=>{return of(new LoginFailed())})
    ))
}