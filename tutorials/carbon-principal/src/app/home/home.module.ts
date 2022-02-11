import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { IconModule, UIShellModule, 
	BreadcrumbModule, NFormsModule,
	SelectModule} from 'carbon-components-angular';
import { AppSwitcherModule } from '@carbon/icons-angular';
import { HelpModule } from '@carbon/icons-angular';
import { UserAvatarModule } from '@carbon/icons-angular';

import { DocsModule } from '../docs/docs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core'
import { TranslateHttpLoader} from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http';
import { Link1Component } from './link1/link1.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    HomeComponent,
    SidenavComponent,
    HeaderComponent,
    AddCustomerComponent,
    Link1Component
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IconModule, 
    UIShellModule, 
    BreadcrumbModule, 
    ReactiveFormsModule,
    NFormsModule,
    SelectModule,
    UserAvatarModule, AppSwitcherModule, HelpModule,
    DocsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
})
export class HomeModule { 
}
