import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const arrsWon= [
  AppHeaderComponent, 
  AppFooterComponent,     
  SidebarComponent
]

const arrsNg = [
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [    
    ...arrsWon
  ],
  imports: [
    CommonModule,
    RouterModule,  
    ...arrsNg

  ],
  exports: [  
    ...arrsNg,
    ...arrsWon
  ]
})
export class SharedModule { }
