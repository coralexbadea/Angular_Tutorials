import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyeEmptyStateComponent } from './mye-empty-state/mye-empty-state.component';

import { IconModule, UIShellModule, 
	BreadcrumbModule, TableModule, PaginationModule,
	SelectModule,  ButtonModule,  SearchModule,} from 'carbon-components-angular';
import {NotificationModule, SwitcherModule, UserAvatarModule} from '@carbon/icons-angular'
import { ChevronRightModule } from '@carbon/icons-angular';
import { MyeTableComponent } from './mye-table';

@NgModule({
  declarations: [
    MyeEmptyStateComponent,
    MyeTableComponent
  ],
  exports: [
    MyeEmptyStateComponent,
    MyeTableComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    TableModule,
    SearchModule,
    ChevronRightModule,
    IconModule,
    ButtonModule,
    NotificationModule,
    SwitcherModule,
    UserAvatarModule,
    BreadcrumbModule,
    UIShellModule, 
    SelectModule,
    

  ],

})
export class SharedModule { }
