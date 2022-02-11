import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Login } from '../../state/auth/auth.actions';
import * as fromAuthState from '../../state/auth/auth.selectors'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<any>, private router:Router) { }

  ngOnInit(): void {
    this.store.select(fromAuthState.getLoginState).subscribe(  
      data => {
        if(data === true){       
          console.log("here")
        }
      }
    )
  }

  loginAction(){
    this.store.dispatch(new Login());
    this.router.navigate(['/home'])
  }

}
