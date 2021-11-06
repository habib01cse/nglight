import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VendorModule } from '../shared/vendor/vendor.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VendorModule
  ],
  exports: [     
  ],
  providers: [
      //{ provide: ErrorHandler, useClass: CoreExceptionHandler },
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    
}

}
