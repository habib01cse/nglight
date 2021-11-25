import { Injectable } from '@angular/core';
import { WebStorageService } from 'src/app/core/services/web-storage.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  servicesKey = "SERVICES";
  services = [
    {id: 1, name: 'Services1', cat: 'Services cat1', charge: 500},
    {id: 2, name: 'Services2', cat: 'Services cat2', charge: 400},
    {id: 3, name: 'Services3', cat: 'Services cat3', charge: 300},
    {id: 4, name: 'Services4', cat: 'Services cat4', charge: 200}
  ]

  constructor( 
    private storageService: WebStorageService
    ) {}
  setAll(){
    this.storageService.setItem(this.servicesKey, this.services);
  }
  getAll():any {
    return this.storageService.getItem(this.servicesKey);
  }
  create(data){
    console.log('data...', data);
    this.storageService.getItem(this.servicesKey)
  }


}
