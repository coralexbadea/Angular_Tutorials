import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnotherTableComponent } from './another-table/another-table.component';
import { DocsComponent } from './docs/docs.component';

const routes: Routes = [
  {
    path:'',
    component: DocsComponent
  },
  {
    path:'table',
    component: AnotherTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
