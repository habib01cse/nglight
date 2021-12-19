/* angular stuff */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    imports: [
        FormsModule,  
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        NgSelectModule,
        NgxSpinnerModule,      
        ToastrModule.forRoot({
            timeOut: 4000,
            extendedTimeOut: 4000,
            positionClass: 'toast-bottom-right',
            closeButton: true,
        })        
    ],
    exports: [      
        BsDatepickerModule,
        ModalModule,
        NgSelectModule,
        NgxSpinnerModule,
        ToastrModule
    ],
    declarations: [
    ],
    providers: [
       
    ],

})
export class VendorModule {

}