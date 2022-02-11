import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { HomeComponent } from './home/home.component';
import { Link1Component } from './link1/link1.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path:'docs',
        loadChildren: () => import('../docs/docs.module').then(m => m.DocsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-customer',
        component: AddCustomerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'link1',
        component: Link1Component,
        canActivate: [AuthGuard]
      }
    ]
  }, 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
