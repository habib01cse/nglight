import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { I18nService } from './i18n.service';
import { globalVariables } from '../constants/globalVariables';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LangService } from './lang.service';

@Injectable()
export class LanguageResolver implements Resolve<any> {
  constructor(private i18nService: I18nService, public langService: LangService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    if ( globalVariables.currentModule===route.routeConfig.path && Object.keys(globalVariables.currentLanguageData).length > 0) {
      return null;
    }
    globalVariables.currentModule = route.routeConfig.path;
    console.log('route.routeConfig.path', route.routeConfig.path);
    console.log('globalVariables.currentLanguage', globalVariables.currentLanguage);
    
    return this.i18nService.getLanguageData(`${route.routeConfig.path}/${globalVariables.currentLanguage}`).pipe(
      map((dataFromApi) => {

        console.log('dataFromApi', dataFromApi);
        globalVariables.currentLanguageData = dataFromApi;
        this.langService.changeLang();
        return dataFromApi;
      }),
      catchError((err) => Observable.throw(err.json().error))
    );
  }
}