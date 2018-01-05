import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { FormsModule } from '@angular/forms';

import {RouterModule} from "@angular/router";
import {AuthService} from './authservice.service';
import { HttpModule } from '@angular/http';
import {NotificationsModule, NotificationsService} from 'angular4-notify';

import { ModalModule } from 'ngx-bootstrap/modal';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    RouterModule,
    HttpModule,
    NotificationsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    TimeAgoPipe
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, AuthService, NotificationsService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
