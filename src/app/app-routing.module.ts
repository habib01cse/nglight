import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageResolver } from './core/services/language-resolver';


import { AirlineComponent } from './features/airline/airline.component';
import { UsersComponent } from './features/users/users.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'airline', pathMatch: 'full' },
  { path: 'airline', resolve: {Items:LanguageResolver}, component: AirlineComponent },
  { path: 'users', resolve: {Items:LanguageResolver}, component: UsersComponent }
  //{ path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
