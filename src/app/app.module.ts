import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { GameLayoutComponent } from './layouts/game-layout/game-layout.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserEffects} from "./store/user/user.effects";
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppSidebarModule, AppHeaderModule } from '@coreui/angular'
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BoardComponent } from './components/board/board/board.component';
import {BoardEffects} from './store/board/board.effects';
import {AuthInterceptor} from './interceptors/auth.interceptor';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    GameLayoutComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EffectsModule.forRoot([
      UserEffects,
      BoardEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    IconModule,
    IconSetModule.forRoot(),
    AppSidebarModule,
    AppHeaderModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    IconSetService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
