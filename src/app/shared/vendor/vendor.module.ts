/* angular stuff */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        FormsModule,        
        ToastrModule.forRoot({
            timeOut: 4000,
            extendedTimeOut: 4000,
            positionClass: 'toast-bottom-right',
            closeButton: true,
        })        
    ],
    exports: [      
        ToastrModule
    ],
    declarations: [
    ],
    providers: [
       
    ],

})
export class VendorModule {

}