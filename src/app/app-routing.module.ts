import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlineComponent } from './features/airline/airline.component';
import { UsersComponent } from './features/users/users.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'airline', pathMatch: 'full' },
  { path: 'airline', component: AirlineComponent },
  { path: 'users', component: UsersComponent }
  //{ path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
