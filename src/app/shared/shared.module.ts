import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const arrs= [
  AppHeaderComponent, 
  AppFooterComponent,     
  SidebarComponent
]

@NgModule({
  declarations: [   
    arrs 
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [   
    arrs
  ]
})
export class SharedModule { }
