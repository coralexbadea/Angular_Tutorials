import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	BreadcrumbModule, TableModule, PaginationModule } from 'carbon-components-angular';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs/docs.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GetMailboxesEffects } from './state/mailbox.effects';
import { mailboxReducer } from './state/mailbox.reducer';
import { AnotherTableComponent } from './another-table/another-table.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DocsComponent, AnotherTableComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    BreadcrumbModule,
    TableModule,
    PaginationModule,
    SharedModule,
    StoreModule.forFeature('mailbox', mailboxReducer),
		EffectsModule.forFeature([GetMailboxesEffects]),
  ]
})
export class DocsModule { }
