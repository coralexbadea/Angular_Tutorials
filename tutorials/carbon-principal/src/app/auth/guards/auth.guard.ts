import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as fromAuthState from '../../state/auth/auth.selectors'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<any>){}
  canActivate(){
    return this.store.select(fromAuthState.getLoginState)
      .pipe(tap(result => {
        if(!result) {
          this.router.navigate(['/login'])
        }
      }))
  }
  
}
