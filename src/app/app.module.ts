import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';



import { LanguageResolver } from './core/services/language-resolver';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


import { AirlineComponent } from './features/airline/airline.component';
import { UsersComponent } from './features/users/users.component';


@NgModule({
  declarations: [
    AppComponent,   
    AirlineComponent,
    UsersComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [LanguageResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
