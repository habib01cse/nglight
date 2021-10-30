import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from 'src/app/core/services/base-data.service';
const baseUrl = 'https://nmflightapi.azurewebsites.net/api/flight';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private apiService: BaseDataService) { }
  create(data):any{
    return this.apiService.save(baseUrl, data);
  }

}
