import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { LanguageResolver } from './core/services/language-resolver';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { VendorModule } from './shared/vendor/vendor.module';
import { SharedModule } from './shared/shared.module';


import { AirlineComponent } from './features/airline/airline.component';
import { UsersComponent } from './features/users/users.component';
import { Customers } from './features/customers/customers';


@NgModule({
  declarations: [
    AppComponent,   
    AirlineComponent,
    UsersComponent,
    Customers 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    CoreModule,
    VendorModule,
    SharedModule
  ],
  providers: [LanguageResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
