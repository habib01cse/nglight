import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HeaderProviderService } from './header-provider.service';

@Injectable({
  providedIn: 'root'
})

export class BaseDataService {
  private httpOptions: any;

  // constructor
  constructor(private http: HttpClient, private headerProvd: HeaderProviderService) {
    this.httpOptions = headerProvd.getHeader('application/x-www-form-urlencoded');
  }

  // formatErrors
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  // save
  public save<T>(path: string, entity: any): Observable<any> {
    // const _params = this.headerProvd.getHttpParamsByData(entity);
    return this.http.post<T>(
      `${path}`,
      JSON.stringify(entity),
      this.headerProvd.getHeader('application/json')
    ).pipe(catchError(this.formatErrors));
  }

  // get data from file
  public getFileData(filePath: any): Observable<any> {
    return this.http.get(filePath);
  }



}
